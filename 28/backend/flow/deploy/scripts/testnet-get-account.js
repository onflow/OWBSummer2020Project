const fcl = require('@onflow/fcl')

fcl.config().put('accessNode.api', 'https://access-testnet.onflow.org') // connect to Flow testnet

const getAccount = async addr => {
  console.log('calling getAccount', addr)
  const account = await fcl.send([fcl.getAccount(addr)])
  //   const account = await fcl.send([fcl.getAccount(addr)], {
  //     node: 'http://access-001.devnet12.nodes.onflow.org:9000',
  //   })
  //   console.log('response', response)

  return account
}

// const run = async ()

const run = async () => {
  //   const response = await getAccount('469dc587aac209ef')
  //   const response = await getAccount('5cbc07c76a26eb91')b3f18c83b7599567
  //   const response = await getAccount('b3f18c83b7599567')
  //   const response = await getAccount('5796355ea6a395b8')
  //   const response = await getAccount('bd4ea7569d9db9d4')
  const response = await getAccount('8980f2768c09767e')
  //   0x
  console.log('response', response.account.keys)
  //   try {
  //     var response = await fcl.send(
  //       [
  //         fcl.script`
  //             pub fun main(): Int {
  //               return 1 + 2
  //             }
  //           `,
  //       ],
  //       //   {
  //       //     node: 'access-001.devnet12.nodes.onflow.org:9000',
  //       //   },
  //     )
  //     var data = await fcl.decode(response)
  //     console.log(data) // 3
  //   } catch (e) {
  //     console.log('--- e', e)
  //   }
}

run()
