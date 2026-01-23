import React from 'react';
import PropTypes from 'prop-types';
import BrowseIcon from '@shopgate/pwa-ui-shared/icons/BrowseIcon';
import { NavDrawer } from '@shopgate/pwa-ui-material';
import { useWidgetSettings, i18n } from '@shopgate/engage/core';
import { themeName } from '@shopgate/pwa-common/helpers/config';
import { makeStyles } from '@shopgate/engage/styles';
import getConfig from '../../../helpers/getConfig';

const useStyles = makeStyles()(({
  browseIcon: {
    height: 22,
    width: 31,
  },
}));

const { showTabBarBrowse } = getConfig();
const isIOS = themeName.includes('ios');

/**
 * Disables browse button on tab bar
 * @returns {JSX.Element}
 */
const TabBarBrowse = ({ TabBarAction }) => {
  const { classes } = useStyles();
  const { showLabels = true } = useWidgetSettings('@shopgate/engage/components/TabBar');

  if (!isIOS || !showTabBarBrowse) {
    return null;
  }

  return (
    <TabBarAction
      icon={<BrowseIcon className={classes.browseIcon} />}
      onClick={NavDrawer.open}
      label={showLabels ? i18n.text('tab_bar.browse') : null}
    />
  );
};

TabBarBrowse.propTypes = {
  TabBarAction: PropTypes.func.isRequired,
};

export default TabBarBrowse;
