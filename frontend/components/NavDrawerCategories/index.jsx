import React from 'react';
import CategoriesProvider from './Provider';
import CategoriesContent from './components/Content';

/**
 * The NavDrawerCategories component
 * @returns {JSX}
 */
const NavDrawerCategories = () => (
  <CategoriesProvider>
    <CategoriesContent />
  </CategoriesProvider>
);

export default NavDrawerCategories;
