import React, {
  useState, useCallback, useMemo, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import classNames from 'classnames';
import { ChevronIcon } from '@shopgate/engage/components';
import CategoriesItemChildren from '../CategoriesItemChildren';
import Item from '../Item';
import connect from './connector';
import { useSideNavigation } from '../../hooks';

const animationDuration = 500;

const chevronStyles = css({
  transformOrigin: 'center center',
  transition: 'transform 250ms cubic-bezier(0.25, 0.1, 0.25, 1)',
});

const styles = {
  chevronButton: css({
    flexShrink: 0,
    outline: 0,
    padding: 10,
    fontSize: 28,
    color: '#85754e',
    position: 'relative',
  }),
  chevron: chevronStyles,
  chevronDown: css(chevronStyles, {
    transform: 'rotateZ(-90deg)',
  }).toString(),
  chevronUp: css(chevronStyles, {
    transform: 'rotateZ(-270deg)',
  }).toString(),
  open: css({
    //  borderRight: '2px solid var(--color-primary)',
  }).toString(),
  transitionBlock: css({
    transition: `max-height ${animationDuration}ms cubic-bezier(0, 1, 0, 1)`,
    maxHeight: 0,
    overflow: 'hidden',
  }).toString(),
  transitionBlockOpen: css({
    transition: `max-height ${animationDuration * 2}ms ease-in-out !important`,
    maxHeight: '1000vh !important',
  }).toString(),
};

/**
 * The CategoriesItem component
 * @returns {JSX}
 */
const CategoriesItem = ({
  categoryId,
  category,
  subcategories,
  level,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    maxCategoryNesting,
    activeCategoryId,
    openCategory,
    activeCategoryPath,
  } = useSideNavigation();

  const isPartOfCategoryPath = useMemo(
    () => activeCategoryPath.includes(categoryId),
    [activeCategoryPath, categoryId]
  );

  useEffect(() => {
    setIsOpen(isPartOfCategoryPath);
  }, [isPartOfCategoryPath]);

  const hasSubcategories = useMemo(() => category && category.childrenCount !== 0, [category]);
  const maxNestingReached = useMemo(() => level + 1 === maxCategoryNesting, [
    level,
    maxCategoryNesting,
  ]);

  const handleClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleOpenCategory = useCallback(() => {
    openCategory(categoryId);
  }, [categoryId, openCategory]);

  const buttonRight = useMemo(() => {
    if (!maxNestingReached && hasSubcategories) {
      return (
        <button type="button" onClick={handleClick} className={styles.chevronButton}>
          <ChevronIcon
            className={isOpen && subcategories ? styles.chevronUp : styles.chevronDown}
          />
        </button>
      );
    }

    return null;
  }, [handleClick, hasSubcategories, isOpen, maxNestingReached, subcategories]);

  if (!category) {
    return null;
  }

  const classes = classNames(styles.transitionBlock, {
    [styles.transitionBlockOpen]: isOpen,
  });

  return (
    <Item
      label={category.name}
      level={level}
      buttonRight={buttonRight}
      forceActive={activeCategoryId === categoryId || isPartOfCategoryPath}
      className={level === 0 && isOpen ? styles.open : null}
      isOpen={isOpen}
      onClick={handleOpenCategory}
    >
      { !maxNestingReached && hasSubcategories && subcategories && (
        <div className={classes}>
          <CategoriesItemChildren subcategories={subcategories} level={level + 1} />
        </div>
      )}
    </Item>
  );
};

CategoriesItem.propTypes = {
  category: PropTypes.shape(),
  categoryId: PropTypes.string,
  level: PropTypes.number,
  subcategories: PropTypes.arrayOf(PropTypes.shape()),
};

CategoriesItem.defaultProps = {
  category: null,
  subcategories: null,
  categoryId: null,
  level: 0,
};

export default connect(CategoriesItem);
