const getApiClient = require('./lib/Shopgate/bigAPIFactory')

module.exports = async function (context) {
  const bigApiClient = getApiClient()

  try {
    const categories = await bigApiClient.fetchCategories(context)

    return { categories }
  } catch (err) {
    context.log.error(err)

    throw new Error('Could not fetch categories')
  }
}
