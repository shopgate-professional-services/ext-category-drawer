import { connect } from 'react-redux';
import { getCategory } from '@shopgate/pwa-common-commerce/category/selectors';
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
    category: getCategory(state, { categoryId }),
    subcategories: getSubcategoriesByCategoryId(state, { categoryId }),
  });
};

export default connect(makeMapStateToProps);
