// const data = require('./create-flow-user')

// console.log('A')
// console.log(data())
// // createFlowUser()
// console.log('B')

const { createFlowAccount } = require('./create-flow-account')

// const CONFIG = require('./flow-config')

// const { flowConfig } = require('@onflow/fcl-config')

// console.log(CONFIG)

// console.log('flowConfig', flowConfig())
// console.log('SERVICE_ADDR', SERVICE_ADDR)

const run = async () => {
  const account = await createFlowAccount()
  console.log('account', account)
}

run()
