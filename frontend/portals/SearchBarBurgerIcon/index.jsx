import React from 'react';
import { BurgerIcon } from '@shopgate/pwa-ui-shared';
import { NavDrawer } from '@shopgate/pwa-ui-material';
import { css } from 'glamor';
import { themeName } from '@shopgate/pwa-common/helpers/config';

const isIOS = themeName.includes('ios');

const styles = {
  container: css({
    color: '#929292',
    fontSize: 30,
    paddingRight: 10,
    flexShrink: 0,
  }).toString(),
};

/**
 * SearchBarBurgerIcon
 * @returns {JSX}
 */
const SearchBarBurgerIcon = () => {
  if (!isIOS) {
    return null;
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className={styles.container} onClick={NavDrawer.open} role="button" tabIndex="-1">
      <BurgerIcon />
    </div>
  );
};

export default SearchBarBurgerIcon;
