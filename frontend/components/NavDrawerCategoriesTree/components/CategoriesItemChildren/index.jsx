import React from 'react';
import PropTypes from 'prop-types';
import CategoriesItem from '../CategoriesItem';

/**
 * The ItemChildren component
 * @returns {JSX}
 */
const CategoriesItemChildren = ({ subcategories, level }) => (
  <ul>
    {
      subcategories.map(category => (
        <CategoriesItem
          key={category.id}
          level={level}
          categoryId={category.id}
        />
      ))
    }
  </ul>
);

CategoriesItemChildren.propTypes = {
  level: PropTypes.number.isRequired,
  subcategories: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default CategoriesItemChildren;
