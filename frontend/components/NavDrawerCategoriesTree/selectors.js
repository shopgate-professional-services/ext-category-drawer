import { createSelector } from 'reselect';
import { getCategoryChildren } from '@shopgate/engage/category';
import { getCategoryTree } from '../../selectors';
import getConfig from '../../helpers/getConfig';

// To work with @shopgate-project/page-switcher
const REDUX_NAMESPACE_SELECTION = '@shopgate-project/page-switcher/SwitchSelection';

export const hasCategoryContent = (category) => {
  const { categoryContentMap } = getConfig();

  let content = []
  
  categoryContentMap.forEach(map => {
    if (category.id === map.categoryId) {
      content.push(map.content)
    }
  })

  return content;
}

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
        const enriched = categoryTree.map(category => {
          const content = {content: hasCategoryContent(category)}
          return {...category, ...content};
        })
        
        return enriched;
      }

      //has category content???
      if (childCategories) {
        const enriched = childCategories.map(category => {
          const content = {content: hasCategoryContent(category)}
          return {...category, ...content};
        });

        return enriched;
      }
    }
  );

  /**
 * Returns the selection
 * @param {Object} state .
 * @return {Object}
 */
export const getPageSwitcherSelection = (state) => {
  if (!state.extensions[REDUX_NAMESPACE_SELECTION]?.selection) {
    return {};
  }

  return state.extensions[REDUX_NAMESPACE_SELECTION].selection;
};
