import React from 'react';
import BrowseIcon from '@shopgate/pwa-ui-shared/icons/BrowseIcon';
import { NavDrawer } from '@shopgate/pwa-ui-material';
import { useWidgetSettings } from '@shopgate/engage/core';
import { I18n } from '@shopgate/engage/components';
import Button from '@shopgate/pwa-common/components/Button';
import { themeName } from '@shopgate/pwa-common/helpers/config';
import { makeStyles } from '@shopgate/engage/styles';
import getConfig from '../../../helpers/getConfig';

const useStyles = makeStyles()(({
  container: {
    display: 'flex',
    position: 'relative',
    flexBasis: 0,
    flexDirection: 'column',
    flexGrow: 1,
    alignItems: 'center',
    fontWeight: 500,
    fontSize: '0.64rem',
    height: '100%',
    padding: 0,
    color: 'var(--tab-bar-item-default-color)',
    '> svg': {
      flexGrow: 1,
      width: 33,
      height: 22,
      marginRight: 'auto',
      marginLeft: 'auto',
    },
  },
}));

const { showTabBarBrowse } = getConfig();
const isIOS = themeName.includes('ios');

/**
 * Disables browse button on tab bar
 * @returns {JSX.Element}
 */
const TabBarBrowse = () => {
  const { classes } = useStyles();
  const { showLabels = true } = useWidgetSettings('@shopgate/engage/components/TabBar');

  if (!isIOS || !showTabBarBrowse) {
    return null;
  }

  return (
    <Button
      className={`theme__tab-bar__tab-bar-action ${classes.container}`}
      onClick={NavDrawer.open}
      data-test-id="Button"
      role="tab"
    >
      <BrowseIcon />
      <div className={classes.span}>
        {showLabels && <I18n.Text string="Stöbern" />}
      </div>
    </Button>
  );
};

export default TabBarBrowse;
