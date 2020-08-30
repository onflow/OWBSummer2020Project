const fs = require('fs')
const fcl = require('@onflow/fcl')
const sdk = require('@onflow/sdk')
const { Identity } = require('@onflow/types')

require.extensions['.cdc'] = function(module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8')
}

const { generateCode, createAuthorization } = require('../../../utils')

const { FUNGIBLE_TOKEN_CONTRACT_ACCT } = require('../../../../../flow-accounts')

const FungibleTokenContract = require('../../../contracts/FungibleToken.cdc')

const deploy = async () => {
  const authorization = await createAuthorization({
    address: FUNGIBLE_TOKEN_CONTRACT_ACCT.address,
    privateKey: FUNGIBLE_TOKEN_CONTRACT_ACCT.privateKey,
  })

  const code = await generateCode(FungibleTokenContract)

  return fcl.send(
    [
      sdk.transaction`
          transaction {
            prepare(acct: AuthAccount) {
              acct.setCode("${p => p.code}".decodeHex())
            }
          }
        `,
      fcl.params([
        fcl.param(Buffer.from(code, 'utf8').toString('hex'), Identity, 'code'),
      ]),
      fcl.proposer(authorization),
      fcl.payer(authorization),
      fcl.authorizations([authorization]),
      fcl.limit(100),
    ],
    {
      node: 'http://localhost:8080',
    },
  )
}

const run = async () => {
  const response = await deploy()
  console.log('response', response)
}

run()
