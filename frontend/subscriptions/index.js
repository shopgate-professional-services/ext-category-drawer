import { appWillStart$ } from '@shopgate/pwa-common/streams/app';
import { fetchCategoryTree } from '../actions';

export default (subscribe) => {
  subscribe(appWillStart$, ({ dispatch }) => {
    dispatch(fetchCategoryTree());
  });          
};
