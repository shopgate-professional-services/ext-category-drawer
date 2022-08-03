import React, {
  useState, useCallback, useMemo, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { ArrowDropIcon } from '@shopgate/engage/components';
import Item, { styles as itemStyles } from '../Item';

/**
 * The SideNavigationCategoriesItem component
 * @returns {JSX}
 */
const NestedItem = ({
  level,
  label,
  href,
  children,
  forceActive,
}) => {
  const [isOpen, setIsOpen] = useState(forceActive);
  useEffect(() => {
    if (forceActive) {
      setIsOpen(true);
    }
  }, [forceActive]);

  const handleClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const buttonRight = useMemo(() => (
    <button type="button" onClick={handleClick} className={itemStyles.chevronButton}>
      <ArrowDropIcon
        className={(isOpen ? itemStyles.chevronUp : itemStyles.chevronDown).toString()}
      />
    </button>
  ), [handleClick, isOpen]);

  return (
    <Item
      href={href}
      label={label}
      level={level}
      buttonRight={buttonRight}
      className={level === 0 && isOpen ? itemStyles.open : null}
      forceInactive
    >
      {isOpen ? children : null}
    </Item>
  );
};

NestedItem.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  forceActive: PropTypes.bool,
  level: PropTypes.number,
};

NestedItem.defaultProps = {
  level: 0,
  forceActive: false,
};

export default NestedItem;
