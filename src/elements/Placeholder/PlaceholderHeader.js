import cx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'

import {
  childrenUtils,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  getKeyOnly,
} from '../../lib'

/**
 * A placeholder can contain a header.
 */
const PlaceholderHeader = React.forwardRef(function (props, ref) {
  const { children, className, content, image } = props
  const classes = cx(getKeyOnly(image, 'image'), 'header', className)
  const rest = getUnhandledProps(PlaceholderHeader, props)
  const ElementType = getComponentType(props)

  return (
    <ElementType {...rest} className={classes} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})

PlaceholderHeader.displayName = 'PlaceholderHeader'
PlaceholderHeader.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** A placeholder can contain an image. */
  image: PropTypes.bool,
}

export default PlaceholderHeader
