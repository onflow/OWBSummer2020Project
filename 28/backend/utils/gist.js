const fcl = require('@onflow/fcl')
const t = require('@onflow/types')
const EC = require('elliptic').ec
const ec = new EC('p256')
const rlp = require('rlp')
const { SHA3 } = require('sha3')

const invariant = (fact, msg, ...rest) => {
  if (!fact) {
    const error = new Error(`INVARIANT ${msg}`)
    error.stack = error.stack
      .split('\n')
      .filter(d => !/at invariant/.test(d))
      .join('\n')
    console.error('\n\n---\n\n', error, '\n\n', ...rest, '\n\n---\n\n')
    throw error
  }
}

const get = (scope, path, fallback) => {
  if (typeof path === 'string') return get(scope, path.split('/'), fallback)
  if (!path.length) return scope
  try {
    const [head, ...rest] = path
    return get(scope[head], rest, fallback)
  } catch (_error) {
    return fallback
  }
}

const CONTRACT = `
  access(all) contract Noop {}
`

const PK = '55bdf531ce04af41caa0adc77b4274a4a024e6e0cb92c6c24e69c53c5df5ac47'

const SERVICE_ADDR = 'f8d6e0586b0a20c7'

// current cadded AuthAccount constructor (what you use to create an account on flow)
// requires a public key to be in a certain format. That format is an rlp encoded value
// that encodes the key itself, what curve it uses, how the signed values are hashed
// and the keys weight.
const encodePublicKeyForFlow = publicKey =>
  rlp
    .encode([
      Buffer.from(publicKey, 'hex'), // publicKey hex to binary
      2, // P256 per https://github.com/onflow/flow/blob/master/docs/accounts-and-keys.md#supported-signature--hash-algorithms
      3, // SHA3-256 per https://github.com/onflow/flow/blob/master/docs/accounts-and-keys.md#supported-signature--hash-algorithms
      1000, // give key full weight
    ])
    .toString('hex')

const signWithKey = (privateKey, msgHex) => {
  const key = ec.keyFromPrivate(Buffer.from(privateKey, 'hex'))
  const sig = key.sign(hashMsgHex(msgHex))
  const n = 32 // half of signature length?
  const r = sig.r.toArrayLike(Buffer, 'be', n)
  const s = sig.s.toArrayLike(Buffer, 'be', n)
  return Buffer.concat([r, s]).toString('hex')
}

const hashMsgHex = msgHex => {
  const sha = new SHA3(256)
  sha.update(Buffer.from(msgHex, 'hex'))
  return sha.digest()
}

const genKeys = () => {
  const keys = ec.genKeyPair()
  const privateKey = keys.getPrivate('hex')
  const publicKey = keys.getPublic('hex').replace(/^04/, '')
  return {
    publicKey,
    privateKey,
    flowKey: encodePublicKeyForFlow(publicKey),
  }
}

// Will be handled by fcl.user(addr).info()
const getAccount = async addr => {
  const { account } = await fcl.send([fcl.getAccount(addr)])
  return account
}

const authorization = async (account = {}) => {
  const user = await getAccount(SERVICE_ADDR)
  const key = user.keys[0]

  let sequenceNum
  if (account.role.proposer) sequenceNum = key.sequenceNumber

  const signingFunction = async data => {
    return {
      addr: user.address,
      keyId: key.index,
      signature: signWithKey(PK, data.message),
    }
  }

  return {
    ...account,
    addr: user.address,
    keyId: key.index,
    sequenceNum,
    signature: account.signature || null,
    signingFunction,
    resolve: null,
    roles: account.roles,
  }
}

const createFlowAccount = async (contract = CONTRACT) => {
  const keys = await genKeys()

  const response = await fcl.send([
    fcl.transaction`
      transaction {
        let payer: AuthAccount
        prepare(payer: AuthAccount) {
          self.payer = payer
        }
        execute {
          let account = AuthAccount(payer: self.payer)
          account.addPublicKey("${p => p.publicKey}".decodeHex())
          account.setCode("${p => p.code}".decodeHex())
        }
      }
    `,
    fcl.proposer(authorization),
    fcl.authorizations([authorization]),
    fcl.payer(authorization),
    fcl.params([
      fcl.param(keys.flowKey, t.Identity, 'publicKey'),
      fcl.param(
        Buffer.from(contract, 'utf8').toString('hex'),
        t.Identity,
        'code',
      ),
    ]),
  ])

  const { events } = await fcl.tx(response).onceSealed()
  const accountCreatedEvent = events.find(d => d.type === 'flow.AccountCreated')
  invariant(accountCreatedEvent, 'No flow.AccountCreated found', events)
  let addr = accountCreatedEvent.data.address
  // a standardized string format for addresses is coming soon
  // our aim is to make them as small as possible while making them unambiguous
  addr = addr.replace(/^0x/, '')
  invariant(addr, 'an address is required')

  const account = await getAccount(addr)
  const key = account.keys.find(d => d.publicKey === keys.publicKey)
  invariant(
    key,
    'could not find provided public key in on-chain flow account keys',
  )

  return {
    addr,
    publicKey: keys.publicKey,
    privateKey: keys.privateKey,
    keyId: key.index,
  }
}

const run = async () => {
  const account = await createFlowAccount()
  console.log('account', account)
}

run()
