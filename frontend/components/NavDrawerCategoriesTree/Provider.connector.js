import { connect } from 'react-redux';
import {
  getCurrentRoute,
  getCurrentPathname,
  getCurrentParams,
  historyPush,
} from '@shopgate/engage/core';
import { getCategoryTree } from '../../selectors';
import { fetchCategoryTree } from '../../actions';

/**
 * Creates the mapStateToProps connector function.
 * @returns {Function}
 */
const makeMapStateToProps = () => state => ({
  currentParams: getCurrentParams(state),
  currentPathname: getCurrentPathname(state),
  currentRoute: getCurrentRoute(state),
  categoryTree: getCategoryTree(state),
});

/**
 * Maps dispatch to props.
 * @param {Function} dispatch Dispatch.
 * @returns {Object}
 */
const mapDispatchToProps = {
  fetchCategoryTree,
  historyPush,
};

export default connect(makeMapStateToProps, mapDispatchToProps);
