const fs = require('fs')
const fcl = require('@onflow/fcl')
const sdk = require('@onflow/sdk')

fcl.config().put('accessNode.api', 'https://access-testnet.onflow.org') // connect to Flow testnet

require.extensions['.cdc'] = function(module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8')
}

const { generateCode, createAuthorization } = require('../../../utils')

const { FUNGIBLE_TOKEN_CONTRACT_ACCT } = require('../../../../../flow-accounts')

const MainVaultTx = require('../../../transactions/fungible-token/main-vault.cdc')

const createMainVault = async () => {
  const authorization = await createAuthorization({
    // address: FUNGIBLE_TOKEN_CONTRACT_ACCT.address,
    // address: '4f7d7bb81563b36a',
    address: 'b3f18c83b7599567',
    // privateKey: FUNGIBLE_TOKEN_CONTRACT_ACCT.privateKey,
    privateKey:
      'b2c8cf95d63e02de9e5407f23fbe77125996c11c9a6c981fde33a1ca362c2634',
  })

  // console.log('authorization', authorization.toString())

  const code = await generateCode(MainVaultTx, {
    query: /(0x01|0x02)/g,
    // '0x01': `0x${FUNGIBLE_TOKEN_CONTRACT_ACCT.address}`,
    // '0x01': '0x4f7d7bb81563b36a',
    '0x01': '0xb3f18c83b7599567',
  })

  return fcl.send(
    [
      sdk.transaction`${code}`,
      fcl.proposer(authorization),
      fcl.payer(authorization),
      fcl.authorizations([authorization]),
      fcl.limit(100),
    ],
    // {
    //   // node: 'http://localhost:8080',
    //   node: 'https://access-001.devnet12.nodes.onflow.org:9000',
    // },
  )
  // console.log('response', response)
}

const run = async () => {
  // try {
  //   const response = await createMainVault()
  //   console.log('response', response)
  // } catch (e) {
  //   console.log('e', e)
  // }
  const response = await createMainVault()
  var transaction = await fcl.tx(response).onceSealed()
  console.log(transaction)
}

run()
