import { connect } from 'react-redux';
import {
  makeGetSubcategoriesByCategoryId,
  getPageSwitcherSelection,
} from '../../selectors';

/**
 * Creates the mapStateToProps connector function.
 * @returns {Function}
 */
const makeMapStateToProps = () => {
  const getSubcategoriesByCategoryId = makeGetSubcategoriesByCategoryId();

  return (state, { categoryId }) => ({
    subcategories: getSubcategoriesByCategoryId(state, { categoryId }),
    pageSwitcherSelection: getPageSwitcherSelection(state),
  });
};

export default connect(makeMapStateToProps);
