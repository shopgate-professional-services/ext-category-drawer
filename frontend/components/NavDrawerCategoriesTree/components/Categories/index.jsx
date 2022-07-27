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
}) => {
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
      <CategoriesItemChildren level={0} subcategories={subcategories} />
    </li>
  );
};

Categories.propTypes = {
  subcategories: PropTypes.arrayOf(PropTypes.shape()),
};

Categories.defaultProps = {
  subcategories: null,
};

export default connect(Categories);
