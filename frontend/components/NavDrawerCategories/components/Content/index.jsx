import React from 'react';
import { css } from 'glamor';
import {
  TransitionGroup,
  CSSTransition,
} from 'react-transition-group';
import { useCategoriesContext } from '../../hooks';
import Category from '../Category';

const styles = {
  root: css({
    background: '#fff',
    position: 'relative',
  }).toString(),
  categoryEnter: css({
    transform: 'translateX(100%)',
  }).toString(),
  categoryEnterActive: css({
    transform: 'translateX(0%)',
    transition: 'transform 250ms ease-in-out',
  }).toString(),
  categoryExit: css({
    opacity: 0,
  }).toString(),
};

/**
 * The CategoriesContent component
 * @returns {JSX}
 */
const CategoriesContent = () => {
  const { categoryStack, activeCategory } = useCategoriesContext();

  return (
    <div className={styles.root}>
      <TransitionGroup>
        { categoryStack.map(category => (
          <CSSTransition
            key={category.id}
            timeout={250}
            classNames={{
              enter: styles.categoryEnter,
              enterActive: styles.categoryEnterActive,
              exit: styles.categoryExit,
            }}
          >
            <Category
              key={category.id}
              category={category}
              isVisible={category === activeCategory}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default CategoriesContent;
