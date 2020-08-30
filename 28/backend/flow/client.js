const fs = require('fs')
const fcl = require('@onflow/fcl')
const sdk = require('@onflow/sdk')

require.extensions['.cdc'] = function(module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8')
}

const FLOW_NODE = 'http://localhost:8080'

const { FUNGIBLE_TOKEN_CONTRACT_ACCT } = require('../../flow-accounts')

const MintTokensTx = require('./transactions/fungible-token/mint-tokens.cdc')

const { generateCode, createAuthorization } = require('./utils')

const TOKEN_CONTRACT_ADDRESS = process.env.TESTNET_TOKEN_CONTRACT_ADDRESS
const TOKEN_CONTRACT_PK = process.env.TESTNET_TOKEN_CONTRACT_PK
const ACCESS_NODE_API = process.env.TESTNET_ACCESS_NODE_API

class FlowClient {
  constructor() {}

  mintAndSendTokens = async ({ quantity, address }) => {
    fcl.config().put('accessNode.api', ACCESS_NODE_API) // connect to Flow testnet

    const authorization = await createAuthorization({
      address: TOKEN_CONTRACT_ADDRESS,
      privateKey: TOKEN_CONTRACT_PK,
    })
    const code = await generateCode(MintTokensTx, {
      query: /(0x01|0x02|AMOUNT)/g,
      '0x01': `0x${TOKEN_CONTRACT_ADDRESS}`,
      // recipient of tokens (in this case the Fungible Token Contract as it's the main holder)
      '0x02': `0x${address}`,
      AMOUNT: quantity,
    })
    return fcl.send([
      sdk.transaction`${code}`,
      fcl.proposer(authorization),
      fcl.payer(authorization),
      fcl.authorizations([authorization]),
      fcl.limit(100),
    ])
  }
}

module.exports = new FlowClient()
