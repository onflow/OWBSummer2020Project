const { flowConfig } = require('@onflow/fcl-config')
const fcl = require('@onflow/fcl')

// const flowConfig = flowConfig()
const flowConfig = {
  accounts: {
    service: {
      address: 'f8d6e0586b0a20c7',
      privateKey:
        '55bdf531ce04af41caa0adc77b4274a4a024e6e0cb92c6c24e69c53c5df5ac47',
      sigAlgorithm: 'ECDSA_P256',
      hashAlgorithm: 'SHA3_256',
    },
  },
}

const get = (scope, path, fallback) => {
  if (typeof path === 'string') return get(scope, path.split('/'), fallback)
  if (!path.length) return scope
  try {
    const [head, ...rest] = path
    return get(scope[head], rest, fallback)
  } catch (_error) {
    return fallback
  }
}

const PK = String(
  process.env.PK ||
    get(
      flowConfig,
      'accounts/service/privateKey',
      'bf9db4706c2fdb9011ee7e170ccac492f05427b96ab41d8bf2d8c58443704b76',
    ),
)

const SERVICE_ADDR = String(
  process.env.SERVICE_ADDR || get(flowConfig, 'accounts/service/address', '01'),
)

const PORT = Number(process.env.PORT || get(flowConfig, 'devWallet/port', 8701))

const ACCESS_NODE = String(
  process.env.ACCESS_NODE ||
    get(flowConfig, 'devWallet/accessNode/endpoint', 'http://localhost:8080'),
)

const PID = String(process.env.PID || `asdf${PORT}`)

const ICON = String(
  process.env.ICON || `https://avatars.onflow/avatar/${PID}.svg`,
)

const ORIGIN = 'http://localhost'
const HOST = [ORIGIN, PORT].filter(Boolean).join(':')

const AUTHN = `${HOST}/flow/authenticate`
const NAME = `FCL Dev Wallet`

exports.PK = PK
exports.SERVICE_ADDR = SERVICE_ADDR
exports.PORT = PORT
exports.ACCESS_NODE = ACCESS_NODE
exports.PID = PID
exports.ICON = ICON
exports.ORIGIN = ORIGIN
exports.HOST = HOST
exports.AUTHN = AUTHN
exports.NAME = NAME

fcl.config().put('accessNode.api', ACCESS_NODE)
