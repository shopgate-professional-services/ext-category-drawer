import { useContext } from 'react';
import { Context } from './Provider';

/**
 * Returns the value of the side navigation provider state.
 * @returns {Object}
 */
export const useSideNavigation = () => useContext(Context);
