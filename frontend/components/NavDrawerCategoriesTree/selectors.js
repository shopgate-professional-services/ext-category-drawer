import { createSelector } from 'reselect';
import { getCategoryChildren } from '@shopgate/engage/category';
import { getCategoryTree } from '../../selectors';
import getConfig from '../../helpers/getConfig';

// To work with @shopgate-project/page-switcher
const REDUX_NAMESPACE_SELECTION = '@shopgate-project/page-switcher/SwitchSelection';

/**
 * Return content for a category
 * @param {Object} category The application state.
 * @returns {Function}
 */
export const hasCategoryContent = (category) => {
  const { categoryContentMap } = getConfig();

  const content = [];

  categoryContentMap.forEach((map) => {
    if (category.id === map.categoryId) {
      content.push(map.content);
    }
  });

  return content;
};

/**
 * Creates a getCategoriesById selector
 * @param {Object} [options={}] The options.
 * @param {string} [options.categoryId] The category id.
 * @param {string} [options.pageSwitcherCategoryId] The page switcher category id.
 * @returns {Function}
 */
export const makeGetSubcategoriesByCategoryId = ({
  categoryId,
  pageSwitcherCategoryId,
} = {}) => {
  // Create an object that can be use as 2nd parameter for selectors to ensure stable references
  const stableProps = { categoryId };

  /**
   * Retrieves categories from the state.
   * If no category id is passed, root-categories will be returned.
   * @param {Object} state The application state.
   * @param {Object} props The component props.
   * @returns {Object[]} The categories collection.
   */
  return createSelector(
    state => getCategoryChildren(state, stableProps),
    getCategoryTree,
    (childCategories, categoryTree) => {
      // Check if we have to handle the root-category
      if (!categoryId && categoryTree) {
        return categoryTree.map(category => ({
          ...category,
          content: hasCategoryContent(category),
        })).filter((category) => {
          // If pageSwitcherCategoryId is set, only return that category
          if (pageSwitcherCategoryId) {
            return category.id === pageSwitcherCategoryId;
          }

          return true;
        });
      }

      // Check if a category has a contentMapping
      if (Array.isArray(childCategories)) {
        return childCategories.map(category => ({
          ...category,
          content: hasCategoryContent(category),
        }));
      }

      return childCategories;
    }
  );
};

/**
 * Get the state of the @shopgate-project/page-switcher extension
 * @param {Object} state Redux state
 * @returns {Function}
 */
export const getPageSwitcherState = state => state?.extensions[REDUX_NAMESPACE_SELECTION];

/**
 * Returns page switcher selection
 * @param {Object} state .
 * @return {Object}
 */
export const getPageSwitcherSelection = createSelector(
  getPageSwitcherState,
  switcherState => switcherState?.selection || {}
);
