const errors = require('request-promise-native/errors')
const config = require('../../config.json')

const LIMIT = 100

/**
 * Map a catalog service category to the old product service format to ensure compatibility
 * @param {Object} category
 * @private
 */
const _mapCatalogCategoryToProductCategory = category => ({
  id: category.code,
  name: category.name,
  path: category.path,
  parent: {
    id: category.parentCategoryCode || null,
    name: '' // Not known here
  },
  description: category.description,
  imageUrl: category.image,
  externalUrl: null,
  sort: category.sequenceId,
  productCount: category.productCount,
  childrenSort: 'manual',
  childrenCount: category.categoryCount,
  children: []
})

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
    try {
      if (config.useCatalogService) {
        const { body: catalogResponse } = await this.request(
          'catalog',
          'v1',
          `/merchants/${config.omniCredentials.tenantId}/categories?limit=${LIMIT}&offset=${offset}`,
          'GET'
        )

        const { categories, meta: { totalItemCount } } = catalogResponse
        // Map categories from the catalog service format to the expected legacy product service format
        const mappedCategories = categories.map(_mapCatalogCategoryToProductCategory)
        const newResults = [...results, ...mappedCategories]

        if (newResults.length < totalItemCount) {
          this.recursiveFetchCategories(resolve, reject, context, offset + LIMIT, newResults)
          return
        }

        return resolve(newResults)
      } else {
        const path = `${context.meta.appId.split('_')[1]}/categorySearch?limit=${LIMIT}&offset=${offset}&children=false`
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
      }
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
