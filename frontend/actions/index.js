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

      // Add the fetched categories to our redux to benefit from it
      categoryTree.forEach((category) => {
        dispatch(receiveCategory(category.id, category, (category.children || [])));

        category.children.forEach((categoryLevel2) => {
          dispatch(receiveCategoryChildren(categoryLevel2.id, categoryLevel2.children));
        });
      });
    })
    .catch((error) => {
      logger.error(error);
      dispatch(errorCategoryTree());
    });
};
