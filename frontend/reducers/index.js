import {
  ERROR_CATEGORY_TREE,
  RECEIVE_CATEGORY_TREE,
  REQUEST_CATEGORY_TREE,
} from '../constants';

/**
 * @param {Object} state state
 * @param {Object} action action
 * @return {Object}
 */
const categoryTreeReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case REQUEST_CATEGORY_TREE:
      return {
        ...state,
        isFetching: true,
        expires: 0,
      };
    case RECEIVE_CATEGORY_TREE:
      return {
        categoryTree: action.categoryTree,
        isFetching: false,
        expires: Date.now() + 3600000,
      };
    case ERROR_CATEGORY_TREE:
      return {
        ...state,
        isFetching: false,
        expires: 0,
      };
    default:
      return state;
  }
};

export default categoryTreeReducer;
