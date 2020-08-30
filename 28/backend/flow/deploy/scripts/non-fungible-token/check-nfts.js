const fs = require('fs')
const fcl = require('@onflow/fcl')
const sdk = require('@onflow/sdk')

require.extensions['.cdc'] = function(module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8')
}

const { generateCode, createAuthorization } = require('../../../utils')

const {
  NON_FUNGIBLE_TOKEN_CONTRACT_ACCT,
} = require('../../../../../flow-accounts')

const CheckNFTsScript = require('../../../scripts/non-fungible-token/check-nfts.cdc')

const checkNFTs = async () => {
  const authorization = await createAuthorization({
    address: NON_FUNGIBLE_TOKEN_CONTRACT_ACCT.address,
    privateKey: NON_FUNGIBLE_TOKEN_CONTRACT_ACCT.privateKey,
  })

  const scriptCode = await generateCode(CheckNFTsScript, {
    query: /(0x01)/g,
    '0x01': `0x${NON_FUNGIBLE_TOKEN_CONTRACT_ACCT.address}`,
  })

  const script = sdk.script`${scriptCode}`
  return fcl.send([script])
}

const run = async () => {
  const response = await checkNFTs()
  console.log('response', response)
  const data = await fcl.decode(response)
  console.log('data', data)
}

run()
