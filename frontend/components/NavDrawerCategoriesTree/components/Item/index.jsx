import React, { useMemo, memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';
import { i18n } from '@shopgate/engage/core';
import { useSideNavigation } from '../../hooks';

const { variables, colors } = themeConfig;

/**
 * @param {number} level The indentation level
 * @returns {string}
 */
const getIndentation = (level = 0) => css({
  paddingLeft: (level * variables.gap.big),
}).toString();

export const styles = {
  list: css({
    position: 'relative',
  }).toString(),
  item: css({
    color: 'rgb(90, 90, 90)',
    alignItems: 'center',
    display: 'flex',
    textAlign: 'left',
    outline: 0,
    position: 'relative',
    width: '100%',
    lineHeight: '1.45em',
    borderTop: '1px solid #c6c6c6',
  }).toString(),
  itemNoBorder: css({
    borderTop: 'none',
  }).toString(),
  itemActive: css({
    color: colors.primary.toLowerCase(),
  }).toString(),
  link: css({
    flexGrow: 1,
    textAlign: 'left',
    outline: 0,
    padding: '12px 16px',
    color: 'var(--color-text-high-emphasis)',
    ':hover': {
      color: 'var(--color-primary)',
    },
  }).toString(),
  withButtonRight: css({
    paddingRight: 0,
  }).toString(),
  linkActive: css({
    fontWeight: 'bold',
  }).toString(),
};

/**
 * Item component
 * @returns {JSX}
 */
const Item = ({
  level,
  href,
  label,
  buttonRight,
  children,
  forceActive,
  forceInactive,
  className,
  onClick,
  isOpen,
  noBorder,
}) => {
  const { currentPathname, maxLevelWithBorder, openLink } = useSideNavigation();
  const isActive = useMemo(() => !forceInactive && (currentPathname === href || forceActive), [
    currentPathname,
    forceActive,
    forceInactive,
    href,
  ]);

  const handleOpenLink = useCallback(() => {
    openLink(href);
  }, [href, openLink]);

  return (
    <li className={classNames(styles.list, className, getIndentation(level))}>
      <div className={classNames(styles.item, {
        [styles.itemActive]: isActive || isOpen,
        [styles.itemNoBorder]: level >= maxLevelWithBorder || noBorder,
      })}
      >
        <button
          type="button"
          className={classNames(styles.link, {
            [styles.linkActive]: isActive || isOpen,
            [styles.withButtonRight]: !!buttonRight,
          })}
          onClick={href ? handleOpenLink : onClick}
        >
          {i18n.text(label)}
        </button>

        { buttonRight}
      </div>
      {children}
    </li>
  );
};

Item.propTypes = {
  label: PropTypes.string.isRequired,
  buttonRight: PropTypes.shape(),
  children: PropTypes.node,
  className: PropTypes.string,
  forceActive: PropTypes.bool,
  forceInactive: PropTypes.bool,
  href: PropTypes.string,
  isOpen: PropTypes.bool,
  level: PropTypes.number,
  noBorder: PropTypes.bool,
  onClick: PropTypes.func,
};

Item.defaultProps = {
  buttonRight: null,
  children: null,
  forceActive: false,
  isOpen: false,
  noBorder: false,
  forceInactive: false,
  level: 0,
  href: null,
  className: null,
  onClick: () => {},
};

export default memo(Item);
