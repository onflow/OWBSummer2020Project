const EC = require('elliptic').ec
const ec = new EC('p256')
const secret = 'abc'
const keyPair = ec.keyFromSecret()

console.log('keyPair', keyPair)
