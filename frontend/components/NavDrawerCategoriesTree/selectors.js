import { createSelector } from 'reselect';
import { getCategoryChildren } from '@shopgate/engage/category';
import { getCategoryTree } from '../../selectors';

/**
 * Creates a getCategoriesById selector
 * @returns {Function}
 */
export const makeGetSubcategoriesByCategoryId = () =>
  /**
   * Retrieves categories from the state.
   * If no category id is passed, root-categories will be returned.
   * @param {Object} state The application state.
   * @param {Object} props The component props.
   * @returns {Object[]} The categories collection.
   */
  createSelector(
    getCategoryChildren,
    getCategoryTree,
    (state, props) => props.categoryId,
    (childCategories, categoryTree, categoryId) => {
      // Check if we have to handle the root-category
      if (!categoryId && categoryTree) {
        return categoryTree;
      }

      return childCategories;
    }
  );
