import React, { useCallback } from 'react';
import { BurgerIcon } from '@shopgate/pwa-ui-shared';
import { NavDrawer } from '@shopgate/pwa-ui-material';
import { css } from 'glamor';
import { themeName } from '@shopgate/pwa-common/helpers/config';
import { i18n } from '@shopgate/engage/core';
import getConfig from '../../helpers/getConfig';

const { showSearchBarNavDrawer } = getConfig();
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
  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter') {
      NavDrawer.open();
    }
  }, []);

  if (!isIOS || !showSearchBarNavDrawer) {
    return null;
  }

  return (
    <div
      onKeyDown={handleKeyDown}
      className={`${styles.container} category-search-bar-burger-icon`}
      onClick={NavDrawer.open}
      role="button"
      tabIndex={0}
      aria-label={i18n.text('open_categories')}
    >
      <BurgerIcon />
    </div>
  );
};

export default SearchBarBurgerIcon;
