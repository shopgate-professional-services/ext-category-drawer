import React from 'react';
import PropTypes from 'prop-types';
import Provider from './Provider';
import Content from './components/Content';

/**
 * The NavDrawerCategoriesTree component
 * @returns {JSX}
 */
const NavDrawerCategoriesTree = ({
  maxCategoryNesting,
  maxLevelWithBorder,
}) => (
  <Provider
    maxCategoryNesting={maxCategoryNesting}
    maxLevelWithBorder={maxLevelWithBorder}
  >
    <Content />
  </Provider>
);

NavDrawerCategoriesTree.propTypes = {
  maxCategoryNesting: PropTypes.number,
  maxLevelWithBorder: PropTypes.number,
};

NavDrawerCategoriesTree.defaultProps = {
  maxCategoryNesting: 3,
  maxLevelWithBorder: 2,
};

export default NavDrawerCategoriesTree;
