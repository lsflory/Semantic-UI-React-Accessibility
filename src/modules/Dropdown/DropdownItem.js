import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'

import {
  childrenUtils,
  createShorthand,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  getKeyOnly,
} from '../../lib'
import Flag from '../../elements/Flag'
import Icon from '../../elements/Icon'
import Image from '../../elements/Image'
import Label from '../../elements/Label'

/**
 * An item sub-component for Dropdown component.
 */
const DropdownItem = React.forwardRef(function (props, ref) {
  const {
    active,
    children,
    className,
    content,
    disabled,
    description,
    flag,
    icon,
    image,
    label,
    selected,
    text,
  } = props

  const handleClick = (e) => {
    _.invoke(props, 'onClick', e, props)
  }

  const classes = cx(
    getKeyOnly(active, 'active'),
    getKeyOnly(disabled, 'disabled'),
    getKeyOnly(selected, 'selected'),
    'item',
    className,
  )
  // add default dropdown icon if item contains another menu
  const iconName = _.isNil(icon)
    ? childrenUtils.someByType(children, 'DropdownMenu') && 'dropdown'
    : icon
  const rest = getUnhandledProps(DropdownItem, props)
  const ElementType = getComponentType(props)
  const ariaOptions = {
    role: 'option',
    'aria-disabled': disabled,
    'aria-checked': active,
    'aria-selected': selected,
  }

  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} {...ariaOptions} className={classes} onClick={handleClick} ref={ref}>
        {children}
      </ElementType>
    )
  }

  const flagElement = Flag.create(flag, { autoGenerateKey: false })
  const iconElement = Icon.create(iconName, { autoGenerateKey: false })
  const imageElement = Image.create(image, { autoGenerateKey: false })
  const labelElement = Label.create(label, { autoGenerateKey: false })
  const descriptionElement = createShorthand('span', (val) => ({ children: val }), description, {
    defaultProps: { className: 'description' },
    autoGenerateKey: false,
  })
  const textElement = createShorthand(
    'span',
    (val) => ({ children: val }),
    childrenUtils.isNil(content) ? text : content,
    { defaultProps: { className: 'text' }, autoGenerateKey: false },
  )

  return (
    <ElementType {...rest} {...ariaOptions} className={classes} onClick={handleClick} ref={ref}>
      {imageElement}
      {iconElement}
      {flagElement}
      {labelElement}
      {descriptionElement}
      {textElement}
    </ElementType>
  )
})

DropdownItem.displayName = 'DropdownItem'
DropdownItem.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Style as the currently chosen item. */
  active: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Additional text with less emphasis. */
  description: customPropTypes.itemShorthand,

  /** A dropdown item can be disabled. */
  disabled: PropTypes.bool,

  /** Shorthand for Flag. */
  flag: customPropTypes.itemShorthand,

  /** Shorthand for Icon. */
  icon: customPropTypes.itemShorthand,

  /** Shorthand for Image. */
  image: customPropTypes.itemShorthand,

  /** Shorthand for Label. */
  label: customPropTypes.itemShorthand,

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: PropTypes.func,

  /**
   * The item currently selected by keyboard shortcut.
   * This is not the active item.
   */
  selected: PropTypes.bool,

  /** Display text. */
  text: customPropTypes.contentShorthand,

  /** Stored value. */
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),
}

DropdownItem.create = createShorthandFactory(DropdownItem, (opts) => opts)

export default DropdownItem
