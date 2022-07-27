import { createSelector } from 'reselect';
import {
  getCurrentRouteHelper as getCurrentRoute,
} from '@shopgate/engage/core';

import { searchBarWhitelist } from '../constants';

/**
 * Checks if the search bar is visible for the current route.
 * @return {boolean}
 */
export const isSearchBarVisible = createSelector(
  getCurrentRoute,
  route => !!searchBarWhitelist.find(entry => route.pattern === entry)
);

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
