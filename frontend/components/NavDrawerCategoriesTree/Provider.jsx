import React, {
  useState, useMemo, useEffect, createContext, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { hex2bin, bin2hex } from '@shopgate/engage/core';
import { NavDrawer } from '@shopgate/pwa-ui-material';
import {
  CATEGORY_PATTERN,
  CATEGORY_PATH,
  CATEGORY_FILTER_PATTERN,
} from '@shopgate/engage/category';
import {
  ITEM_PATTERN,
  ITEM_GALLERY_PATTERN,
  ITEM_REVIEWS_PATTERN,
  ITEM_WRITE_REVIEW_PATTERN,
} from '@shopgate/engage/product';
import connect from './Provider.connector';

export const Context = createContext({});

const categoryPatterns = [
  CATEGORY_PATTERN,
  CATEGORY_FILTER_PATTERN,
];
const itemPatterns = [
  ITEM_PATTERN,
  ITEM_GALLERY_PATTERN,
  ITEM_REVIEWS_PATTERN,
  ITEM_WRITE_REVIEW_PATTERN,
];

/**
 * Retrieves the path through the category tree for the active id
 * @param {Array} categoryTree The category tree
 * @param {string} activeCategoryId The active category
 * @returns {Array}
 */
const buildCategoryIdPath = (categoryTree, activeCategoryId) => {
  if (!categoryTree || !activeCategoryId) {
    return [];
  }

  /**
   * Searches for the activeCategoryId path within category children
   * @param {Array} categoryChildren The children
   * @returns {string}
   */
  const searchCategoryChildren = (categoryChildren) => {
    let result = [];

    categoryChildren.forEach(({ id, children }) => {
      if (id === activeCategoryId) {
        // Id found -> add it to the array
        result.push(id);
      }

      if (children) {
        // Id not found, but category has children -> search within
        const searchResult = searchCategoryChildren(children);
        if (searchResult.length) {
          // Children search was successful. Merge the result with the id of the current branch
          result = [
            id,
            ...searchResult,
          ];
        }
      }
    });

    return result;
  };

  return searchCategoryChildren(categoryTree);
};

/**
 * NavDrawerCategories Provider
 * @returns {JSX}
 */
const NavDrawerCategoriesProvider = ({
  maxCategoryNesting,
  maxLevelWithBorder,
  currentParams,
  currentPathname,
  currentRoute,
  children,
  categoryTree,
  fetchCategoryTree,
  historyPush,
}) => {
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [activeCategoryPath, setActiveCategoryPath] = useState([]);

  // Fetch the category data
  useEffect(() => {
    fetchCategoryTree();
  }, [fetchCategoryTree]);

  useEffect(() => {
    setActiveCategoryPath(() => buildCategoryIdPath(categoryTree, activeCategoryId));
  }, [activeCategoryId, categoryTree]);

  useEffect(() => {
    if (!currentRoute) {
      return;
    }

    const { pattern } = currentRoute;

    if (categoryPatterns.includes(pattern)) {
      const { categoryId } = currentParams;
      setActiveCategoryId(hex2bin(categoryId));
    } else if (!itemPatterns.includes(pattern)) {
      setActiveCategoryId(null);
    }
  });

  // Opens a category route
  const openCategory = useCallback((categoryId) => {
    NavDrawer.close();
    setTimeout(() => {
      historyPush({
        pathname: `${CATEGORY_PATH}/${bin2hex(categoryId)}`,
        state: {},
      });
    }, 100);
  }, [historyPush]);

  // Open a link e.g a CMS page
  const openLink = useCallback((pathname) => {
    NavDrawer.close();
    setTimeout(() => {
      historyPush({
        pathname,
        state: {},
      });
    }, 100);
  }, [historyPush]);

  const value = useMemo(
    () => ({
      maxCategoryNesting,
      maxLevelWithBorder,
      currentParams,
      currentPathname,
      currentRoute,
      activeCategoryId,
      activeCategoryPath,
      openCategory,
      openLink,
    }),
    [
      activeCategoryId,
      activeCategoryPath,
      currentParams,
      currentPathname,
      currentRoute,
      maxCategoryNesting,
      maxLevelWithBorder,
      openCategory,
      openLink,
    ]
  );

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};

NavDrawerCategoriesProvider.propTypes = {
  fetchCategoryTree: PropTypes.func.isRequired,
  historyPush: PropTypes.func.isRequired,
  maxCategoryNesting: PropTypes.number.isRequired,
  maxLevelWithBorder: PropTypes.number.isRequired,
  categoryTree: PropTypes.arrayOf(PropTypes.shape()),
  children: PropTypes.node,
  currentParams: PropTypes.shape(),
  currentPathname: PropTypes.string,
  currentRoute: PropTypes.shape(),
};

NavDrawerCategoriesProvider.defaultProps = {
  currentParams: null,
  currentPathname: '',
  currentRoute: null,
  children: null,
  categoryTree: null,
};

export default connect(NavDrawerCategoriesProvider);
