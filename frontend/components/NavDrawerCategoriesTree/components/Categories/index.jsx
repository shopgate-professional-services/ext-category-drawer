import React, { memo, useMemo } from 'react';
import { css } from 'glamor';
import { useSelector } from 'react-redux';
import { LoadingIndicator } from '@shopgate/engage/components';
import { isEqual } from 'lodash';
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
  const pageSwitcherSelection = useSelector(getPageSwitcherSelection);

  let pageSwitcherCategoryId = null;
  if (pageSwitcherSelection) {
    pageSwitcherCategoryId = pageSwitcherSelection.categoryId;
  }

  const getSubcategoriesByCategoryId = useMemo(
    () => makeGetSubcategoriesByCategoryId({ pageSwitcherCategoryId }),
    [pageSwitcherCategoryId]
  );
  const subcategories = useSelector(getSubcategoriesByCategoryId, isEqual);

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

  return (
    <li className={styles.list}>
      <CategoriesItemChildren
        level={0}
        subcategories={subcategories}
        pageSwitcher={!!pageSwitcherCategoryId}
      />
    </li>
  );
};

export default memo(Categories);
