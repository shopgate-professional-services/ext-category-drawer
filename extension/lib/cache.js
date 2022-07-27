const { hasValue } = require('../helpers')
const DATA_KEY = 'data'
const CREATED_KEY = 'createdAt'

/**
 * Check if data is cached and not expired
 * @param {Function} storage Function to store data
 * @param {string} storageKey Key at which to store data
 * @param {number} timeout Number of ms cached data is relevant
 * @return {*}
 */
const getCache = async (storage, storageKey, timeout) => {
  const cache = await storage.get(storageKey)

  if (cache &&
    typeof cache === 'object' &&
    cache.hasOwnProperty(DATA_KEY) &&
    cache.hasOwnProperty(CREATED_KEY) &&
    (cache[CREATED_KEY] + timeout) > Date.now()
  ) {
    return cache[DATA_KEY]
  }

  return null
}

/**
 * Save data to cache
 * @param {Function} storage Function to store data
 * @param {string} storageKey Key at which to store data
 * @param {*} data Data to be cached
 */
const setCache = async (storage, storageKey, data) => {
  if (!hasValue(data)) {
    throw new Error('Invalid value given to setCache. Null, undefined or empty string is not allowed.')
  }
  const cacheValue = {}
  cacheValue[DATA_KEY] = data
  cacheValue[CREATED_KEY] = Date.now()
  await storage.set(storageKey, cacheValue)
}

module.exports = {
  getCache,
  setCache
}
