// const { LocalAddress, CryptoUtils } = require('loom-js')
const axios = require('axios')

// const createUser = async ({ request: { user }, prisma }) => {
const createUser = async ({ request, prisma }) => {
  const authHeader = request.headers.authorization
  const accessToken = authHeader.split(' ')[1]

  //lyralabs.auth0.com/userinfo

  const response = await axios.get('https://lyralabs.auth0.com/userinfo', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  const userInfo = response.data

  // const bytes = CryptoUtils.generatePrivateKey()
  // const privateKey = Buffer.from(
  //   bytes.buffer,
  //   bytes.byteOffset,
  //   bytes.byteLength,
  // )
  // const privateKeyStr = privateKey.toString('base64')
  // const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)
  // const address = LocalAddress.fromPublicKey(publicKey).toString()

  const newUser = await prisma.user.create({
    data: {
      identity: userInfo.sub.split(`|`)[0],
      auth0id: userInfo.sub,
      name: userInfo.name ? userInfo.name : '',
      name_lower: userInfo.name ? userInfo.name.toLowerCase() : '',
      firstName: userInfo.given_name ? userInfo.given_name : '',
      lastName: userInfo.family_name ? userInfo.family_name : '',
      email: userInfo.email ? userInfo.email : '',
      avatar: userInfo.picture ? userInfo.picture : '',
      privateKey: 'def',
      username: userInfo.nickname ? userInfo.nickname : '',
      username_lower: userInfo.nickname ? userInfo.nickname.toLowerCase() : '',
      address: 'abc',
    },
  })
  return newUser
}

module.exports = { createUser }
