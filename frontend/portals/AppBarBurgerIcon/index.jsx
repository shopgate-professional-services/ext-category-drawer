import React, { useCallback } from 'react';
import { BurgerIcon } from '@shopgate/pwa-ui-shared';
import { NavDrawer } from '@shopgate/pwa-ui-material';
import { css } from 'glamor';
import { i18n, getCurrentRoute } from '@shopgate/engage/core';
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
  route: getCurrentRoute(state),
  pageSwitcherSelection: getPageSwitcherSelection(state),
});

const { showAppBarNavDrawer } = getConfig();

/**
 * AppBarBurgerIcon
 * @param {Object} route the current route
 * @param {Object} [pageSwitcherSelection] optional page information
 * if used in combination with page switcher extension
 * @returns {JSX.Element}
 */
const AppBarBurgerIcon = ({ route, pageSwitcherSelection }) => {
  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter') {
      NavDrawer.open();
    }
  }, []);

  if (!showAppBarNavDrawer || ((Object.keys(pageSwitcherSelection).length === 0) && route?.pathname !== '/')) {
    return null;
  }

  if (Object.keys(pageSwitcherSelection).length > 0
    && route?.pathname !== pageSwitcherSelection?.path) {
    return null;
  }

  return (
    <div
      onKeyDown={handleKeyDown}
      className={styles.container}
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
  route: PropTypes.shape().isRequired,
  pageSwitcherSelection: PropTypes.shape(),
};

AppBarBurgerIcon.defaultProps = {
  pageSwitcherSelection: null,
};

export default connect(mapStateToProps)(AppBarBurgerIcon);

