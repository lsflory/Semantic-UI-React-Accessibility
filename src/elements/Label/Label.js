import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'

import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  SUI,
  getKeyOnly,
  getKeyOrValueAndKey,
  getValueAndKey,
  useEventCallback,
} from '../../lib'
import Icon from '../Icon/Icon'
import Image from '../Image/Image'
import LabelDetail from './LabelDetail'
import LabelGroup from './LabelGroup'

/**
 * A label displays content classification.
 */
const Label = React.forwardRef(function (props, ref) {
  const {
    active,
    attached,
    basic,
    children,
    circular,
    className,
    color,
    content,
    corner,
    detail,
    empty,
    floating,
    horizontal,
    icon,
    image,
    onRemove,
    pointing,
    prompt,
    removeIcon,
    ribbon,
    size,
    tag,
  } = props

  const pointingClass =
    (pointing === true && 'pointing') ||
    ((pointing === 'left' || pointing === 'right') && `${pointing} pointing`) ||
    ((pointing === 'above' || pointing === 'below') && `pointing ${pointing}`)

  const classes = cx(
    'ui',
    color,
    pointingClass,
    size,
    getKeyOnly(active, 'active'),
    getKeyOnly(basic, 'basic'),
    getKeyOnly(circular, 'circular'),
    getKeyOnly(empty, 'empty'),
    getKeyOnly(floating, 'floating'),
    getKeyOnly(horizontal, 'horizontal'),
    getKeyOnly(image === true, 'image'),
    getKeyOnly(prompt, 'prompt'),
    getKeyOnly(tag, 'tag'),
    getKeyOrValueAndKey(corner, 'corner'),
    getKeyOrValueAndKey(ribbon, 'ribbon'),
    getValueAndKey(attached, 'attached'),
    'label',
    className,
  )
  const rest = getUnhandledProps(Label, props)
  const ElementType = getComponentType(props)

  const handleClick = useEventCallback((e) => {
    _.invoke(props, 'onClick', e, props)
  })

  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes} onClick={handleClick} ref={ref}>
        {children}
      </ElementType>
    )
  }

  const removeIconShorthand = _.isUndefined(removeIcon) ? 'delete' : removeIcon

  return (
    <ElementType {...rest} className={classes} onClick={handleClick} ref={ref}>
      {Icon.create(icon, { autoGenerateKey: false })}
      {typeof image !== 'boolean' && Image.create(image, { autoGenerateKey: false })}
      {content}
      {LabelDetail.create(detail, { autoGenerateKey: false })}
      {onRemove &&
        Icon.create(removeIconShorthand, {
          autoGenerateKey: false,
          overrideProps: (predefinedProps) => ({
            onClick: (e) => {
              _.invoke(predefinedProps, 'onClick', e)
              _.invoke(props, 'onRemove', e, props)
            },
          }),
        })}
    </ElementType>
  )
})

Label.displayName = 'Label'
Label.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** A label can be active. */
  active: PropTypes.bool,

  /** A label can attach to a content segment. */
  attached: PropTypes.oneOf([
    'top',
    'bottom',
    'top right',
    'top left',
    'bottom left',
    'bottom right',
  ]),

  /** A label can reduce its complexity. */
  basic: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** A label can be circular. */
  circular: PropTypes.bool,

  /** Additional classes. */
  className: PropTypes.string,

  /** Color of the label. */
  color: PropTypes.oneOf(SUI.COLORS),

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A label can position itself in the corner of an element. */
  corner: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['left', 'right'])]),

  /** Shorthand for LabelDetail. */
  detail: customPropTypes.itemShorthand,

  /** Formats the label as a dot. */
  empty: customPropTypes.every([PropTypes.bool, customPropTypes.demand(['circular'])]),

  /** Float above another element in the upper right corner. */
  floating: PropTypes.bool,

  /** A horizontal label is formatted to label content along-side it horizontally. */
  horizontal: PropTypes.bool,

  /** Shorthand for Icon. */
  icon: customPropTypes.itemShorthand,

  /** A label can be formatted to emphasize an image or prop can be used as shorthand for Image. */
  image: PropTypes.oneOfType([PropTypes.bool, customPropTypes.itemShorthand]),

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: PropTypes.func,

  /**
   * Adds an "x" icon, called when "x" is clicked.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onRemove: PropTypes.func,

  /** A label can point to content next to it. */
  pointing: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['above', 'below', 'left', 'right']),
  ]),

  /** A label can prompt for an error in your forms. */
  prompt: PropTypes.bool,

  /** Shorthand for Icon to appear as the last child and trigger onRemove. */
  removeIcon: customPropTypes.itemShorthand,

  /** A label can appear as a ribbon attaching itself to an element. */
  ribbon: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['right'])]),

  /** A label can have different sizes. */
  size: PropTypes.oneOf(SUI.SIZES),

  /** A label can appear as a tag. */
  tag: PropTypes.bool,
}

Label.Detail = LabelDetail
Label.Group = LabelGroup

Label.create = createShorthandFactory(Label, (value) => ({ content: value }))

export default Label
