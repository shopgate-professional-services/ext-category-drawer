const errors = require('request-promise-native/errors')

const LIMIT = 100

module.exports = class {
  /**
   * @param {ExternalBigAPI} bigapiRequester
   */
  constructor (bigapiRequester) {
    this.bigapiRequester = bigapiRequester
  }

  /**
   * @returns {Promise<void>}
   * @throws Error when requesting the Big API fails.
   */
  async fetchCategories (context) {
    return new Promise((resolve, reject) => {
      this.recursiveFetchCategories(resolve, reject, context)
    })
  }

  async recursiveFetchCategories (resolve, reject, context, offset = 0, results = []) {
    const path = `${context.meta.appId.split('_')[1]}/categorySearch?limit=${LIMIT}&offset=${offset}&children=false`
    try {
      const { body: response } = await this.request(
        'product',
        'v1',
        path,
        'GET'
      ) || {}

      const { collection = [], meta } = response || {}
      const { pagination } = meta || {}
      const { totalItemCount } = pagination || {}

      const newResults = [...results, ...collection]

      if (newResults.length < totalItemCount) {
        this.recursiveFetchCategories(resolve, reject, context, offset + LIMIT, newResults)
        return
      }

      resolve(newResults)
    } catch (err) {
      context.log.error(err)
      reject(err)
    }
  }

  /**
   * @param {string} serviceName
   * @param {string} version
   * @param {string} path
   * @param {string} method
   * @param {Object} body
   * @returns {Promise<Object>}
   * @throws Error when requesting the Big API fails.
   */
  async request (serviceName, version, path, method, body = {}) {
    try {
      return await this.bigapiRequester.request({
        service: serviceName.toLowerCase(),
        version: version.replace(/^\/*/, ''),
        path,
        method,
        body
      })
    } catch (err) {
      if (err instanceof errors.StatusCodeError) {
        throw new Error(`Error in BigAPI requesting service ${serviceName} ${method} ${version + path}. HTTP-Code: ${err.statusCode}`)
      }
      throw err
    }
  }
}
