import React from 'react';
import { BurgerIcon } from '@shopgate/pwa-ui-shared';
import { NavDrawer } from '@shopgate/pwa-ui-material';
import { useWidgetSettings } from '@shopgate/engage/core';
import I18n from '@shopgate/pwa-common/components/I18n';
import Button from '@shopgate/pwa-common/components/Button';
import { css } from 'glamor';
import { themeName, themeColors } from '@shopgate/pwa-common/helpers/config';
import getConfig from '../../../helpers/getConfig';

const { showTabBarBrowse } = getConfig();
const isIOS = themeName.includes('ios');
const styles = {
  container:css({
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
    color: themeColors.shade3,
    '> svg': {
      flexGrow: 1,
      width: 'auto',
      heigth: 'auto',
      marginRight: 'auto',
      marginLeft: 'auto',
    },
  }).toString(),

  span: css({
    marginBottom: 2,
  }).toString(),
};

/**
 * Disables browse button on tab bar
 * @returns {JSX}
 */
const tabBarBrowse = () => {
  if (!isIOS || !showTabBarBrowse) {
    return null;
  }

  const { showLabels = true } = useWidgetSettings('@shopgate/engage/components/TabBar');

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <Button 
      className={`theme__tab-bar__tab-bar-action ${styles.container}`}
      onClick={NavDrawer.open} 
      data-test-id="Button" 
      role="tab"
    >
      <BurgerIcon className={styles.burger} />
      <div className={styles.span}>
        {showLabels && <I18n.Text string="Stöbern" />}
      </div>
    </Button>
  );
  
};

export default tabBarBrowse;
