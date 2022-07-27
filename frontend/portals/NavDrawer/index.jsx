import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { NavDrawer } from '@shopgate/pwa-ui-material';
import NavDrawerCategoriesTree from '../../components/NavDrawerCategoriesTree';

/**
 * @returns {JSX}
 */
const NavDrawerContainer = ({ onOpen, onClose }) => (
  <NavDrawer onOpen={onOpen} onClose={onClose}>
    <NavDrawerCategoriesTree />
  </NavDrawer>
);

NavDrawerContainer.propTypes = {
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
};

NavDrawerContainer.defaultProps = {
  onClose: noop,
  onOpen: noop,
};

export default NavDrawerContainer;
