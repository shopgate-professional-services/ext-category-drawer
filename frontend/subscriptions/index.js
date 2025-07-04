import { appWillStart$ } from '@shopgate/pwa-common/streams/app';
import { routeWillLeave$ } from '@shopgate/engage/core';
import { NavDrawer } from '@shopgate/pwa-ui-material';
import { fetchCategoryTree } from '../actions';

export default (subscribe) => {
  subscribe(appWillStart$, ({ dispatch }) => {
    dispatch(fetchCategoryTree());
  });

  subscribe(routeWillLeave$, () => {
    NavDrawer.close();
  });
};

