const fs = require('fs')
const fcl = require('@onflow/fcl')
const sdk = require('@onflow/sdk')

require.extensions['.cdc'] = function(module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8')
}

const { generateCode, createAuthorization } = require('../../../utils')

const { FUNGIBLE_TOKEN_CONTRACT_ACCT } = require('../../../../../flow-accounts')

const MintTokensTx = require('../../../transactions/fungible-token/mint-tokens.cdc')

const amount = 5

const mintTokens = async () => {
  const authorization = await createAuthorization({
    address: FUNGIBLE_TOKEN_CONTRACT_ACCT.address,
    privateKey: FUNGIBLE_TOKEN_CONTRACT_ACCT.privateKey,
  })

  const code = await generateCode(MintTokensTx, {
    query: /(0x01|0x02|AMOUNT)/g,
    '0x01': `0x${FUNGIBLE_TOKEN_CONTRACT_ACCT.address}`,
    // recipient of tokens (in this case the Fungible Token Contract as it's the main holder)
    '0x02': `0x${FUNGIBLE_TOKEN_CONTRACT_ACCT.address}`,
    AMOUNT: amount,
  })

  return fcl.send(
    [
      sdk.transaction`${code}`,
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
  const response = await mintTokens()
  var transaction = await fcl.tx(response).onceSealed()
  console.log(transaction)
}

run()
