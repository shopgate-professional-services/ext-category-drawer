import { createSelector } from 'reselect';

const REDUX_NAMESPACE_CATEGORY_TREE = '@shopgate-project/category-drawer/categoryTree';

/**
 * @param {Object} state state
 * @return {Object}
 */
export const getCategoryTreeState = state => state.extensions[REDUX_NAMESPACE_CATEGORY_TREE];

export const getCategoryTree = createSelector(
  getCategoryTreeState,
  ({ categoryTree }) => categoryTree
);
