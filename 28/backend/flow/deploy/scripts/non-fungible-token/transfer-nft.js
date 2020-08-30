const fs = require('fs')
const fcl = require('@onflow/fcl')
const sdk = require('@onflow/sdk')

require.extensions['.cdc'] = function(module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8')
}

const { generateCode, createAuthorization } = require('../../../utils')

const {
  NON_FUNGIBLE_TOKEN_CONTRACT_ACCT,
  ALICE_ACCT,
} = require('../../../../../flow-accounts')

const TransferNFTTx = require('../../../transactions/non-fungible-token/transfer-nft.cdc')

const transferNFT = async () => {
  const authorization = await createAuthorization({
    address: NON_FUNGIBLE_TOKEN_CONTRACT_ACCT.address,
    privateKey: NON_FUNGIBLE_TOKEN_CONTRACT_ACCT.privateKey,
  })

  const code = await generateCode(TransferNFTTx, {
    query: /(0x01|0x02)/g,
    '0x01': `0x${NON_FUNGIBLE_TOKEN_CONTRACT_ACCT.address}`,
    '0x02': `0x${ALICE_ACCT.address}`,
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
  const response = await transferNFT()
  var transaction = await fcl.tx(response).onceSealed()
  console.log(transaction)
}

run()
