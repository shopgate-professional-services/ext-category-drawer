import { useContext } from 'react';
import { Context } from './Provider';

/**
 * The useCategoriesContext hook
 * @returns {Function}
 */
export const useCategoriesContext = () => useContext(Context);
