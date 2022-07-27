import { INDEX_PATH } from '@shopgate/pwa-common/constants/RoutePaths';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables } = themeConfig;

export const MORE_PATH = '/more';

export const searchBarWhitelist = [
  INDEX_PATH,
];

export const HEADER_HEIGHT_PX = variables.navbar.height;
export const APP_BAR_BACKGROUND_COLOR = '#fff';
export const RECEIVE_CATEGORY_TREE = 'RECEIVE_CATEGORY_TREE';
export const REQUEST_CATEGORY_TREE = 'REQUEST_CATEGORY_TREE';
export const ERROR_CATEGORY_TREE = 'ERROR_CATEGORY_TREE';
