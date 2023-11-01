import { appWillStart$ } from '@shopgate/pwa-common/streams/app';
import { routeWillLeave$ } from '@shopgate/engage/core';
import { fetchCategoryTree } from '../actions';
import { NavDrawer } from '@shopgate/pwa-ui-material';

export default (subscribe) => {
  subscribe(appWillStart$, ({ dispatch }) => {
    dispatch(fetchCategoryTree());
  });  
  
  subscribe(routeWillLeave$, () => {
    NavDrawer.close()
  })
};

