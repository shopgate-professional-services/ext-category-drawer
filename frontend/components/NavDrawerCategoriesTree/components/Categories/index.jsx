import React, { memo, useMemo } from 'react';
import { css } from 'glamor';
import { useSelector } from 'react-redux';
import { LoadingIndicator } from '@shopgate/engage/components';
import {
  makeGetSubcategoriesByCategoryId,
  getPageSwitcherSelection,
} from '../../selectors';
import CategoriesItemChildren from '../CategoriesItemChildren';
import { styles as itemStyles } from '../Item';

const styles = {
  list: css({
    borderBottom: '1px solid #c6c6c6',
  }).toString(),
  loadingIndicator: css({
    padding: 0,
    margin: 'auto',
  }).toString(),
};

/**
 * The Categories component
 * @returns {JSX}
 */
const Categories = () => {
  const getSubcategoriesByCategoryId = useMemo(makeGetSubcategoriesByCategoryId, []);
  const subcategories = useSelector(getSubcategoriesByCategoryId);
  const pageSwitcherSelection = useSelector(getPageSwitcherSelection);

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

export default memo(Categories);
