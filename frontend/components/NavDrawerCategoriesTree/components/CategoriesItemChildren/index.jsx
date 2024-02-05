import React from 'react';
import PropTypes from 'prop-types';
import CategoriesItem from '../CategoriesItem';

/**
 * The ItemChildren component
 * @returns {JSX}
 */
const CategoriesItemChildren = ({ subcategories, level, pageSwitcher }) => (
  <ul>
    {
      subcategories.map(category => (
        <CategoriesItem
          key={category.id}
          level={level}
          categoryId={category.id}
          content={category.content}
          pageSwitcher={pageSwitcher}
        />
      ))
    }
  </ul>
);

CategoriesItemChildren.propTypes = {
  level: PropTypes.number.isRequired,
  subcategories: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  pageSwitcher: PropTypes.bool,
};

CategoriesItemChildren.defaultProps = {
  pageSwitcher: null,
};

export default CategoriesItemChildren;
