import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import classNames from 'classnames';
import { ChevronIcon } from '@shopgate/pwa-ui-shared';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';
import { useCategoriesContext } from '../../hooks';

const { colors } = themeConfig;

const styles = {
  root: css({
    margin: '0 16px',
    paddingTop: 48,
  }).toString(),
  entry: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #C6C6C6',
  }).toString(),
  entryHidden: css({
    visibility: 'hidden',
  }).toString(),
  content: css({
    flex: 1,
    padding: '12px 0',
  }).toString(),
  contentActive: css({
    fontWeight: 600,
  }).toString(),
  contentBack: css({
    fontWeight: 'normal !important',
  }).toString(),
  iconContainer: css({
    fontSize: '28px',
    padding: '8px 0 8px 16px',
    marginRight: -8,
  }).toString(),
  iconContainerBack: css({
    padding: '8px 0  !important',
    marginLeft: -8,
    marginRight: 0,
  }).toString(),
  icon: css({
    color: colors.primary,
  }).toString(),
  iconForward: css({
    transform: 'scale(-1, 1)',
  }).toString(),
};

/**
 * The Category component
 * @param {Object} props The component props
 * @returns {JSX}
 */
const Category = ({ isVisible, category }) => {
  const {
    popCategory,
    pushCategory,
    openCategory,
    currentRouteCategoryId,
  } = useCategoriesContext();

  const headerLabel = useMemo(() => {
    if (!category.parent) {
      return null;
    }

    return category.name;
  }, [category]);

  if (!isVisible || !Array.isArray(category.children)) {
    return null;
  }

  return (
    <div className={styles.root}>
      { /* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div
        tabIndex={-1}
        role="button"
        onClick={() => popCategory()}
        className={classNames(styles.entry, { [styles.entryHidden]: !headerLabel })}
      >
        <div
          className={classNames(
            styles.iconContainer,
            styles.iconContainerBack
          )}
          role="button"
        >
          <ChevronIcon className={styles.icon} />
        </div>
        <div
          className={classNames(styles.content, styles.contentBack)}
        >
          {headerLabel || '_'}
        </div>
      </div>
      <ul>
        {category.children.map(({
          id, name, children,
        }) => {
          const hasChildren = Array.isArray(children) && children.length > 0;

          return (
            <li key={id} className={styles.entry}>
              { /* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
              <div
                tabIndex={-1}
                role="button"
                onClick={() => openCategory(id)}
                className={classNames(
                  styles.content,
                  { [styles.contentActive]: id === currentRouteCategoryId }
                )}
              >
                {name}
              </div>
              {hasChildren ? (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                <div
                  className={styles.iconContainer}
                  role="button"
                  tabIndex={-1}
                  onClick={() => pushCategory(id)}
                >
                  <ChevronIcon
                    className={classNames(styles.icon, styles.iconForward)}
                  />
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

Category.propTypes = {
  category: PropTypes.shape().isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default memo(Category);
