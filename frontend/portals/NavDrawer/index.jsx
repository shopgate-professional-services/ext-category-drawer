import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { NavDrawer } from '@shopgate/pwa-ui-material';
import NavDrawerCategoriesTree from '../../components/NavDrawerCategoriesTree';
import { themeName } from '@shopgate/pwa-common/helpers/config';

const isIOS = themeName.includes('ios');

/**
 * @returns {JSX}
 */
const NavDrawerContainer = ({ onOpen, onClose }) => {
  if (!isIOS) {
    return null;
  }

  return (
    <NavDrawer onOpen={onOpen} onClose={onClose}>
      <NavDrawerCategoriesTree />
    </NavDrawer>
  );
};

NavDrawerContainer.propTypes = {
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
};

NavDrawerContainer.defaultProps = {
  onClose: noop,
  onOpen: noop,
};

export default NavDrawerContainer;
