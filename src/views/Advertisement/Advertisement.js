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
 * An ad displays third-party promotional content.
 */
const Advertisement = React.forwardRef(function (props, ref) {
  const { centered, children, className, content, test, unit } = props

  const classes = cx(
    'ui',
    unit,
    getKeyOnly(centered, 'centered'),
    getKeyOnly(test, 'test'),
    'ad',
    className,
  )
  const rest = getUnhandledProps(Advertisement, props)
  const ElementType = getComponentType(props)

  return (
    <ElementType {...rest} className={classes} data-text={test} ref={ref}>
      {childrenUtils.isNil(children) ? content : children}
    </ElementType>
  )
})

Advertisement.displayName = 'Advertisement'
Advertisement.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** Center the advertisement. */
  centered: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Text to be displayed on the advertisement. */
  test: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string]),

  /** Varies the size of the advertisement. */
  unit: PropTypes.oneOf([
    'medium rectangle',
    'large rectangle',
    'vertical rectangle',
    'small rectangle',
    'mobile banner',
    'banner',
    'vertical banner',
    'top banner',
    'half banner',
    'button',
    'square button',
    'small button',
    'skyscraper',
    'wide skyscraper',
    'leaderboard',
    'large leaderboard',
    'mobile leaderboard',
    'billboard',
    'panorama',
    'netboard',
    'half page',
    'square',
    'small square',
  ]).isRequired,
}

export default Advertisement
