import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import { LoadingIndicator } from '@shopgate/engage/components';
import CategoriesItemChildren from '../CategoriesItemChildren';
import { styles as itemStyles } from '../Item';
import connect from './connector';

const styles = {
  list: css({
    borderBottom: '1px solid #c6c6c6',
  }),
  loadingIndicator: css({
    padding: 0,
    margin: 'auto',
  }).toString(),
};

/**
 * The Categories component
 * @returns {JSX}
 */
const Categories = ({
  subcategories,
  pageSwitcherSelection,
}) => {
  let pageSwitcherCategoryId = null;
  if (pageSwitcherSelection) {
    pageSwitcherCategoryId = pageSwitcherSelection.categoryId;
  }

  if (!subcategories) {
    return (
      <li className={itemStyles.item}>
        <LoadingIndicator className={styles.loadingIndicator} />
      </li>
    );
  }

  if (!subcategories || (Array.isArray(subcategories) && subcategories.length === 0)) {
    return null;
  }

  // ###BOA###
  // Logic for page switcher (if used with @shopgate-project/page-switcher)
  if (pageSwitcherCategoryId) {
    const filteredSubcategories = subcategories.filter(cat => cat.id === pageSwitcherCategoryId);
    return (
      <li className={styles.list}>
        <CategoriesItemChildren level={0} subcategories={filteredSubcategories} pageSwitcher />
      </li>
    );
  }
  // ###EOA###

  return (
    <li className={styles.list}>
      <CategoriesItemChildren level={0} subcategories={subcategories} />
    </li>

  );
};

Categories.propTypes = {
  pageSwitcherSelection: PropTypes.shape(),
  subcategories: PropTypes.arrayOf(PropTypes.shape()),
};

Categories.defaultProps = {
  pageSwitcherSelection: null,
  subcategories: null,
};

export default connect(Categories);
