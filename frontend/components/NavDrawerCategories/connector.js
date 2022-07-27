import { connect } from 'react-redux';
import { historyPush } from '@shopgate/engage/core';
import { getCurrentRoute } from '@shopgate/pwa-common/selectors/router';
import { getCategoryTree } from '../../selectors';
import { fetchCategoryTree } from '../../actions';

/**
 * Maps state to props.
 * @param {Object} state State.
 * @returns {Object}
 */
const mapStateToProps = state => ({
  categoryTree: getCategoryTree(state),
  currentRoute: getCurrentRoute(state),
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

export default connect(mapStateToProps, mapDispatchToProps);
