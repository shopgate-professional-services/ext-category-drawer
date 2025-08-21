import React, { useCallback, useMemo } from 'react';
import { BurgerIcon } from '@shopgate/pwa-ui-shared';
import { NavDrawer } from '@shopgate/pwa-ui-material';
import { css } from 'glamor';
import { i18n, useRoute } from '@shopgate/engage/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getConfig from '../../helpers/getConfig';
import { getPageSwitcherSelection } from '../../components/NavDrawerCategoriesTree/selectors';

const styles = {
  container: css({
    color: '#929292',
    fontSize: 30,
    margin: '0 10px',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
  }).toString(),
};

/**
 * Creates the mapStateToProps connector function.
 * @param {Object} state state
 * @returns {Function}
 */
const mapStateToProps = state => ({
  pageSwitcherSelection: getPageSwitcherSelection(state),
});

const { showAppBarNavDrawer } = getConfig();

// fix logo overlapping category drawer in app header
if (showAppBarNavDrawer) {
  css.global('.engage__logo > img', {
    margin: '0',
  });
}

/**
 * AppBarBurgerIcon
 * @param {Object} route the current route
 * @param {Object} [pageSwitcherSelection] optional page information
 * if used in combination with page switcher extension
 * @returns {JSX.Element}
 */
const AppBarBurgerIcon = ({ pageSwitcherSelection }) => {
  const route = useRoute();

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter') {
      NavDrawer.open();
    }
  }, []);

  const isVisible = useMemo(() => {
    // Not configured to show the app bar nav drawer icon
    if (!showAppBarNavDrawer) {
      return false;
    }

    const hasPageSwitcherSelection = Object.keys(pageSwitcherSelection).length > 0;

    // No page switcher homepage route configured and not on the homepage
    if (!hasPageSwitcherSelection && route?.pathname !== '/') {
      return false;
    }

    // Page switcher homepage configured but not on the configured route
    if (hasPageSwitcherSelection && route?.pathname !== pageSwitcherSelection?.path) {
      return false;
    }

    return true;
  }, [pageSwitcherSelection, route.pathname]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      onKeyDown={handleKeyDown}
      className={`${styles.container} category-drawer__app-bar-burger-icon`}
      onClick={NavDrawer.open}
      role="button"
      tabIndex={0}
      aria-label={i18n.text('open_categories')}
    >
      <BurgerIcon />
    </div>
  );
};

AppBarBurgerIcon.propTypes = {
  pageSwitcherSelection: PropTypes.shape(),
};

AppBarBurgerIcon.defaultProps = {
  pageSwitcherSelection: null,
};

export default connect(mapStateToProps)(AppBarBurgerIcon);

