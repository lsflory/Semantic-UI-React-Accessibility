import _ from 'lodash'
import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'

import {
  childrenUtils,
  createShorthandFactory,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  htmlImageProps,
  partitionHTMLProps,
  SUI,
  getKeyOnly,
  getKeyOrValueAndKey,
  getValueAndKey,
  getVerticalAlignProp,
} from '../../lib'
import Dimmer from '../../modules/Dimmer'
import Label from '../Label/Label'
import ImageGroup from './ImageGroup'

/**
 * An image is a graphic representation of something.
 * @see Icon
 */
const Image = React.forwardRef(function (props, ref) {
  const {
    avatar,
    bordered,
    centered,
    children,
    circular,
    className,
    content,
    dimmer,
    disabled,
    floated,
    fluid,
    hidden,
    href,
    inline,
    label,
    rounded,
    size,
    spaced,
    verticalAlign,
    wrapped,
    ui = true,
  } = props

  const classes = cx(
    getKeyOnly(ui, 'ui'),
    size,
    getKeyOnly(avatar, 'avatar'),
    getKeyOnly(bordered, 'bordered'),
    getKeyOnly(circular, 'circular'),
    getKeyOnly(centered, 'centered'),
    getKeyOnly(disabled, 'disabled'),
    getKeyOnly(fluid, 'fluid'),
    getKeyOnly(hidden, 'hidden'),
    getKeyOnly(inline, 'inline'),
    getKeyOnly(rounded, 'rounded'),
    getKeyOrValueAndKey(spaced, 'spaced'),
    getValueAndKey(floated, 'floated'),
    getVerticalAlignProp(verticalAlign, 'aligned'),
    'image',
    className,
  )

  const rest = getUnhandledProps(Image, props)
  const [imgTagProps, rootProps] = partitionHTMLProps(rest, { htmlProps: htmlImageProps })

  const ElementType = getComponentType(props, {
    defaultAs: 'img',
    getDefault: () => {
      if (
        !_.isNil(dimmer) ||
        !_.isNil(label) ||
        !_.isNil(wrapped) ||
        !childrenUtils.isNil(children)
      ) {
        return 'div'
      }
    },
  })

  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {children}
      </ElementType>
    )
  }
  if (!childrenUtils.isNil(content)) {
    return (
      <ElementType {...rest} className={classes} ref={ref}>
        {content}
      </ElementType>
    )
  }

  if (ElementType === 'img') {
    return <ElementType {...rootProps} {...imgTagProps} className={classes} ref={ref} />
  }

  return (
    <ElementType {...rootProps} className={classes} href={href}>
      {Dimmer.create(dimmer, { autoGenerateKey: false })}
      {Label.create(label, { autoGenerateKey: false })}

      <img {...imgTagProps} ref={ref} />
    </ElementType>
  )
})

Image.Group = ImageGroup

Image.displayName = 'Image'
Image.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** An image may be formatted to appear inline with text as an avatar. */
  avatar: PropTypes.bool,

  /** An image may include a border to emphasize the edges of white or transparent content. */
  bordered: PropTypes.bool,

  /** An image can appear centered in a content block. */
  centered: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** An image may appear circular. */
  circular: PropTypes.bool,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** An image can show that it is disabled and cannot be selected. */
  disabled: PropTypes.bool,

  /** Shorthand for Dimmer. */
  dimmer: customPropTypes.itemShorthand,

  /** An image can sit to the left or right of other content. */
  floated: PropTypes.oneOf(SUI.FLOATS),

  /** An image can take up the width of its container. */
  fluid: customPropTypes.every([PropTypes.bool, customPropTypes.disallow(['size'])]),

  /** An image can be hidden. */
  hidden: PropTypes.bool,

  /** Renders the Image as an <a> tag with this href. */
  href: PropTypes.string,

  /** An image may appear inline. */
  inline: PropTypes.bool,

  /** Shorthand for Label. */
  label: customPropTypes.itemShorthand,

  /** An image may appear rounded. */
  rounded: PropTypes.bool,

  /** An image may appear at different sizes. */
  size: PropTypes.oneOf(SUI.SIZES),

  /** An image can specify that it needs an additional spacing to separate it from nearby content. */
  spaced: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['left', 'right'])]),

  /** Whether or not to add the ui className. */
  ui: PropTypes.bool,

  /** An image can specify its vertical alignment. */
  verticalAlign: PropTypes.oneOf(SUI.VERTICAL_ALIGNMENTS),

  /** An image can render wrapped in a `div.ui.image` as alternative HTML markup. */
  wrapped: PropTypes.bool,
}

Image.create = createShorthandFactory(Image, (value) => ({ src: value }))

export default Image
