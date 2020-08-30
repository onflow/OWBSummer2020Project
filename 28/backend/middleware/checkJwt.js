const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')
const AUTH0_DOMAIN = 'lyralabs.auth0.com'
const AUTH0_ISSUER = 'https://lyralabs.auth0.com/'
const AUTH0_AUDIENCE = 'https://lyralabs.auth0.com/api/v2/'
// const AUTH0_AUDIENCE = 'https://lyralabs.auth0.com/api/v2/'
// const AUTH0_ISSUER = 'https://lyralabs.auth0.com/'
// Authentication middleware. When used, the
// if the access token exists, it be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 1,
    // jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),

  // Validate the audience and the issuer.
  credentialsRequired: false,
  issuer: AUTH0_ISSUER,
  audience: AUTH0_AUDIENCE,
  algorithms: [`RS256`],
})

module.exports = { checkJwt }
