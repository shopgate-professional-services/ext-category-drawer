import { connect } from 'react-redux';
import {
  makeGetSubcategoriesByCategoryId,
} from '../../selectors';

/**
 * Creates the mapStateToProps connector function.
 * @returns {Function}
 */
const makeMapStateToProps = () => {
  const getSubcategoriesByCategoryId = makeGetSubcategoriesByCategoryId();

  return (state, { categoryId }) => ({
    subcategories: getSubcategoriesByCategoryId(state, { categoryId }),
  });
};

export default connect(makeMapStateToProps);
