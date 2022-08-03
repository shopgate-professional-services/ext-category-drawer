const { STORAGE_KEY } = require('./constants')

module.exports = async function (context, { categories }) {
  let categoryTree = unflatten(categories)

  // if there is only one category on route level, start one level further down in the tree
  if (categoryTree.length === 1) {
    categoryTree = categoryTree[0].children
  }

  await context.storage.extension.set(STORAGE_KEY, {
    categoryTree,
    created: Date.now()
  })

  return { categoryTree }
}

function unflatten (array, parent = { id: null }) {
  const children = array
    .filter((child) => child.parent.id === parent.id)
    .sort((a, b) => parseInt(b.sort) - parseInt(a.sort))

  if (!children.length) {
    return []
  }

  let tree = []

  if (parent.id === null) {
    tree = children
  } else {
    parent['children'] = children
  }

  children.forEach((child) => unflatten(array, child))

  return tree
}
