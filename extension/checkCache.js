const { STORAGE_KEY, CACHE_TIME } = require('./constants')

module.exports = async function (context) {
  const cache = await context.storage.extension.get(STORAGE_KEY)

  // return cached tree
  if (cache && cache.categoryTree && cache.created && (cache.created + CACHE_TIME) > Date.now()) {
    return {
      categoryTree: cache.categoryTree
    }
  }

  return { categoryTree: null }
}
