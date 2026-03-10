import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import { shouldFetchData } from '@shopgate/pwa-common/helpers/redux';
import receiveCategory from '@shopgate/pwa-common-commerce/category/action-creators/receiveCategory';
import receiveCategoryChildren from '@shopgate/pwa-common-commerce/category/action-creators/receiveCategoryChildren';
import logger from '../helpers/logger';
import { getCategoryTreeState } from '../selectors';
import {
  errorCategoryTree,
  receiveCategoryTree,
  requestCategoryTree,
} from '../action-creators';

let receiveCategories;

try {
  // Not all PWA versions support the receiveCategories action creator, so we use require here to
  // prevent errors in unsupported versions. Fallback logic is used in case the action creator is
  // not available, which adds the fetched categories to our redux store to benefit from it.
  // eslint-disable-next-line global-require
  receiveCategories = require('@shopgate/pwa-common-commerce/category/action-creators/receiveCategories').default;
} catch (e) {
  receiveCategories = null;
}

/**
 * @param {boolean} [forceFetch=false] forces fetch
 * @return {Function}
 */
export const fetchCategoryTree = (forceFetch = false) => (dispatch, getState) => {
  const state = getState();
  const tree = getCategoryTreeState(state);

  if (!forceFetch && !shouldFetchData(tree, 'categoryTree')) {
    return;
  }

  dispatch(requestCategoryTree());

  new PipelineRequest('shopgate.category-drawer.getCategoryTree')
    .dispatch()
    .then(({ categoryTree }) => {
      dispatch(receiveCategoryTree(categoryTree));

      if (receiveCategories) {
        const categories = [];
        categoryTree.forEach((category) => {
          categories.push(category);
          if (category.children) {
            category.children.forEach((child) => {
              categories.push(child);
            });
          }
        });

        dispatch(receiveCategories(categories));
      } else {
        // Add the fetched categories to our redux to benefit from it
        categoryTree.forEach((category) => {
          dispatch(receiveCategory(category.id, category, (category.children || [])));

          category.children.forEach((categoryLevel2) => {
            dispatch(receiveCategoryChildren(categoryLevel2.id, categoryLevel2.children));
          });
        });
      }
    })
    .catch((error) => {
      logger.error(error);
      dispatch(errorCategoryTree());
    });
};
