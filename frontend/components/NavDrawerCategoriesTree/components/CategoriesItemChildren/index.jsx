import React from 'react';
import PropTypes from 'prop-types';
import CategoriesItem from '../CategoriesItem';

/**
 * The ItemChildren component
 * @returns {JSX}
 */
const CategoriesItemChildren = ({ subcategories, level }) => {
  return(
  <ul>
    {
      subcategories.map(category => (
        <CategoriesItem
          key={category.id}
          level={level}
          categoryId={category.id}
          content={category.content}
        />
      ))
    }
  </ul>
  )
};

CategoriesItemChildren.propTypes = {
  level: PropTypes.number.isRequired,
  subcategories: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default CategoriesItemChildren;
