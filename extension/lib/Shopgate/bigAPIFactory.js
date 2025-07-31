const { ExternalBigAPI, TokenHandler } = require('@shopgate/bigapi-requester')
const BigApiClient = require('./bigAPIClient')
const config = require('../../config.json')

let tokenHandler

if (config.useCatalogService) {
  tokenHandler = new TokenHandler({
    api: `https://{serviceName}.${config.omniCredentials.baseDomain}`,
    clientId: config.omniCredentials.clientId,
    clientSecret: config.omniCredentials.clientSecret,
    username: config.omniCredentials.username,
    password: config.omniCredentials.password,
    tenantType: 'merchant',
    tenantId: config.omniCredentials.tenantId,
    grantType: 'password'
  })
} else {
    // Use the bigApi product service
  tokenHandler = new TokenHandler(
    {
      api: `https://{serviceName}.${config.credentials.baseDomain}`,
      clientId: config.credentials.clientId,
      clientSecret: config.credentials.clientSecret,
      grantType: 'refresh_token',
      refreshToken: config.credentials.refreshToken
    }
  )
}

const apiClient = new BigApiClient(
  new ExternalBigAPI(tokenHandler)
)

/**
 * @mixes BigApiClient
 */
module.exports = () => apiClient
