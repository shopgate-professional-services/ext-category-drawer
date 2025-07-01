import React, { useCallback } from 'react';
import { BurgerIcon } from '@shopgate/pwa-ui-shared';
import { NavDrawer } from '@shopgate/pwa-ui-material';
import { css } from 'glamor';
import { i18n, getCurrentRoute } from '@shopgate/engage/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getConfig from '../../helpers/getConfig';

const styles = {
  container: css({
    color: '#929292',
    fontSize: 30,
    marginLeft: 10,
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
});

const { showAppBarNavDrawer } = getConfig();

/**
 * AppBarBurgerIcon
 * @param {Object} route the current route
 * @returns {JSX}
 */
const AppBarBurgerIcon = ({ route }) => {
  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter') {
      NavDrawer.open();
    }
  }, []);

  if (!showAppBarNavDrawer || route.pathname !== '/') {
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
};

export default connect(mapStateToProps)(AppBarBurgerIcon);

