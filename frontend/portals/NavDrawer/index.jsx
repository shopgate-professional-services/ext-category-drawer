import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { NavDrawer } from '@shopgate/pwa-ui-material';
import { themeName } from '@shopgate/pwa-common/helpers/config';
import { FocusTrap } from '@shopgate/engage/a11y/components';
import NavDrawerCategoriesTree from '../../components/NavDrawerCategoriesTree';

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
      <FocusTrap>
        <NavDrawerCategoriesTree />
      </FocusTrap>
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
