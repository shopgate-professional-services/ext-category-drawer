import React, {
  createContext, useMemo, useState, useCallback, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { NavDrawer } from '@shopgate/pwa-ui-material';
import {
  CATEGORY_PATH,
  CATEGORY_PATTERN,
} from '@shopgate/pwa-common-commerce/category/constants';
import { bin2hex, hex2bin } from '@shopgate/pwa-common/helpers/data';
import connect from './connector';

export const Context = createContext({});

/**
 * Find a category within the category tree
 * @param {string} categoryId Thea searched categoryId
 * @param {Array} categories Category list
 * @param {boolean} [removeLastEntry=false] Whether the last entry is removed in any case
 * @param {boolean} [isInitial] Internal parameter
 * @returns {Object}
 */
const buildCategoryTree = (categoryId, categories, removeLastEntry = false, isInitial = true) => {
  let tree = [
    // Always add an entry for the root category to the tree
    ...(isInitial ? [{
      id: null,
      name: '',
      children: categories,
    }] : []),
  ];

  // Relevant parameters not available yet
  if (!categoryId || !categories) {
    return tree;
  }

  for (let i = 0; i < categories.length; i += 1) {
    const category = categories[i];
    const hasChildren = Array.isArray(category.children) && category.children.length > 0;

    // Category found - add it to the tree
    if (category.id === categoryId) {
      tree = [
        ...tree,
        category,
      ];
      break;
    }

    // Category not found yet, but it has sub categories
    if (hasChildren) {
      // Repeat search within the sub categories
      const subTree = buildCategoryTree(categoryId, category.children, removeLastEntry, false);
      // Add the sub tree when it contains a category match
      if (subTree.length !== 0) {
        tree = [
          ...tree,
          category,
          ...subTree,
        ];
        break;
      }
    }
  }

  // Remove the last entry from the tree, when it does not have sub categories
  if (
    isInitial &&
    (!tree[tree.length - 1].children.length ||
      (removeLastEntry && tree.length > 1))
  ) {
    tree.splice(-1, 1);
  }

  return tree;
};

/**
 * The CategoriesProvider component
 * @param {Object} props The component props
 * @returns {JSX}
 */
const CategoriesProvider = ({
  categoryTree,
  fetchCategoryTree,
  historyPush,
  children,
  currentRoute,
}) => {
  const [categoryStack, setCategoryStack] = useState([]);

  // Fetch the category data
  useEffect(() => {
    fetchCategoryTree();
  }, [fetchCategoryTree]);

  // Initialize the stack after the category data came available
  useEffect(() => {
    if (!categoryTree) {
      return;
    }

    setCategoryStack(buildCategoryTree(null, categoryTree));
  }, [categoryTree]);

  // Update the tree on route changes
  useEffect(() => {
    let categoryId = null;
    let removeLastEntry = false;

    if (currentRoute.pattern === CATEGORY_PATTERN) {
      categoryId = hex2bin(currentRoute.params.categoryId);
      removeLastEntry = true;
    }

    setCategoryStack(buildCategoryTree(categoryId, categoryTree, removeLastEntry));
  }, [categoryTree, currentRoute]);

  // Extract the category id from category routes
  const currentRouteCategoryId = useMemo(
    () => {
      let categoryId = get(currentRoute, 'params.categoryId', null);
      if (categoryId) {
        categoryId = hex2bin(categoryId);
      }
      return categoryId;
    },
    [currentRoute]
  );

  // Removes a stack entry
  const popCategory = useCallback(() => {
    setCategoryStack(categoryStack.slice(0, categoryStack.length - 1));
  }, [categoryStack]);

  // Adds a category to the stack (rebuilds it)
  const pushCategory = useCallback((categoryId) => {
    setCategoryStack(buildCategoryTree(categoryId, categoryTree));
  }, [categoryTree]);

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

  const value = useMemo(() => ({
    activeCategory: categoryStack[categoryStack.length - 1],
    categoryStack,
    popCategory,
    pushCategory,
    openCategory,
    currentRouteCategoryId,
  }), [categoryStack, currentRouteCategoryId, openCategory, popCategory, pushCategory]);

  if (!categoryTree) {
    return null;
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};

CategoriesProvider.propTypes = {
  fetchCategoryTree: PropTypes.func.isRequired,
  historyPush: PropTypes.func.isRequired,
  categoryTree: PropTypes.arrayOf(PropTypes.shape()),
  children: PropTypes.node,
  currentRoute: PropTypes.shape(),
};

CategoriesProvider.defaultProps = {
  children: null,
  categoryTree: null,
  currentRoute: null,
};

export default connect(CategoriesProvider);
