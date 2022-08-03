const { ExternalBigAPI, TokenHandler } = require('@shopgate/bigapi-requester')
const BigApiClient = require('./bigAPIClient')
const config = require('../../config.json')

const apiClient = new BigApiClient(
  new ExternalBigAPI(
    new TokenHandler(
      {
        api: `https://{serviceName}.${config.credentials.baseDomain}`,
        clientId: config.credentials.clientId,
        clientSecret: config.credentials.clientSecret,
        grantType: 'refresh_token',
        refreshToken: config.credentials.refreshToken
      }
    )
  )
)

/**
 * @mixes BigApiClient
 */
module.exports = () => apiClient
