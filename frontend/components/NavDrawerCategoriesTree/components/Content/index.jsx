import React from 'react';
import { css } from 'glamor';
import { INDEX_PATH } from '@shopgate/engage/core';
import Categories from '../Categories';
import Item from '../Item';

const styles = {
  container: css({
    paddingTop: 48,
    background: '#fff',
  }),
};

/**
 * @returns {JSX}
 */
const Content = () => (
  <div>
    <nav className={styles.container}>
      <ul>
        <Item href={INDEX_PATH} label="navigation.home" noBorder />
        <Categories />
      </ul>
    </nav>
  </div>
);

export default Content;
