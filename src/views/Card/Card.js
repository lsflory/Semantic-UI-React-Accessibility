import cx from 'clsx'
import _ from 'lodash'
import PropTypes from 'prop-types'
import * as React from 'react'

import {
  childrenUtils,
  customPropTypes,
  getComponentType,
  getUnhandledProps,
  SUI,
  getKeyOnly,
  useEventCallback,
} from '../../lib'
import Image from '../../elements/Image'
import CardContent from './CardContent'
import CardDescription from './CardDescription'
import CardGroup from './CardGroup'
import CardHeader from './CardHeader'
import CardMeta from './CardMeta'

/**
 * A card displays site content in a manner similar to a playing card.
 */
const Card = React.forwardRef(function (props, ref) {
  const {
    centered,
    children,
    className,
    color,
    content,
    description,
    extra,
    fluid,
    header,
    href,
    image,
    link,
    meta,
    onClick,
    raised,
  } = props

  const classes = cx(
    'ui',
    color,
    getKeyOnly(centered, 'centered'),
    getKeyOnly(fluid, 'fluid'),
    getKeyOnly(link, 'link'),
    getKeyOnly(raised, 'raised'),
    'card',
    className,
  )
  const rest = getUnhandledProps(Card, props)
  const ElementType = getComponentType(props, {
    getDefault: () => {
      if (onClick) {
        return 'a'
      }
    },
  })

  const handleClick = useEventCallback((e) => {
    _.invoke(props, 'onClick', e, props)
  })

  if (!childrenUtils.isNil(children)) {
    return (
      <ElementType {...rest} className={classes} href={href} onClick={handleClick} ref={ref}>
        {children}
      </ElementType>
    )
  }
  if (!childrenUtils.isNil(content)) {
    return (
      <ElementType {...rest} className={classes} href={href} onClick={handleClick} ref={ref}>
        {content}
      </ElementType>
    )
  }

  return (
    <ElementType {...rest} className={classes} href={href} onClick={handleClick} ref={ref}>
      {Image.create(image, {
        autoGenerateKey: false,
        defaultProps: {
          ui: false,
          wrapped: true,
        },
      })}
      {(description || header || meta) && (
        <CardContent description={description} header={header} meta={meta} />
      )}
      {extra && <CardContent extra>{extra}</CardContent>}
    </ElementType>
  )
})

Card.displayName = 'Card'
Card.propTypes = {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,

  /** A Card can center itself inside its container. */
  centered: PropTypes.bool,

  /** Primary content. */
  children: PropTypes.node,

  /** Additional classes. */
  className: PropTypes.string,

  /** A Card can be formatted to display different colors. */
  color: PropTypes.oneOf(SUI.COLORS),

  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,

  /** Shorthand for CardDescription. */
  description: customPropTypes.itemShorthand,

  /** Shorthand for primary content of CardContent. */
  extra: customPropTypes.contentShorthand,

  /** A Card can be formatted to take up the width of its container. */
  fluid: PropTypes.bool,

  /** Shorthand for CardHeader. */
  header: customPropTypes.itemShorthand,

  /** Render as an `a` tag instead of a `div` and adds the href attribute. */
  href: PropTypes.string,

  /** A card can contain an Image component. */
  image: customPropTypes.itemShorthand,

  /** A card can be formatted to link to other content. */
  link: PropTypes.bool,

  /** Shorthand for CardMeta. */
  meta: customPropTypes.itemShorthand,

  /**
   * Called on click. When passed, the component renders as an `a`
   * tag by default instead of a `div`.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: PropTypes.func,

  /** A Card can be formatted to raise above the page. */
  raised: PropTypes.bool,
}

Card.Content = CardContent
Card.Description = CardDescription
Card.Group = CardGroup
Card.Header = CardHeader
Card.Meta = CardMeta

export default Card
