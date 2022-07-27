import {
  ERROR_CATEGORY_TREE,
  RECEIVE_CATEGORY_TREE,
  REQUEST_CATEGORY_TREE,
} from '../constants';

/**
 * @return {{type: string}}
 */
export const requestCategoryTree = () => ({
  type: REQUEST_CATEGORY_TREE,
});

/**
 * @param {Array} categoryTree categoryTree
 * @return {{categoryTree: *, type: string}}
 */
export const receiveCategoryTree = categoryTree => ({
  type: RECEIVE_CATEGORY_TREE,
  categoryTree,
});

/**
 * @return {{type: string}}
 */
export const errorCategoryTree = () => ({
  type: ERROR_CATEGORY_TREE,
});

