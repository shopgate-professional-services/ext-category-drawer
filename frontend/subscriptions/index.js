import { appWillStart$ } from '@shopgate/pwa-common/streams/app';
import { fetchCategoryTree } from '../actions';

export default (subscribe) => {
  let windowReady = false;
  window.addEventListener('load', () => {
    windowReady = true;
  });

  subscribe(appWillStart$, ({ dispatch }) => {
    dispatch(fetchCategoryTree());
  });          
};
