/* eslint-disable jsx-a11y/anchor-has-content */
import * as React from 'react'
import classnames from 'classnames'
import { useRouter } from 'next/router'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import MuiLink, { LinkProps as MuiLinkProps } from '@material-ui/core/Link'

type NextComposedProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
> &
  NextLinkProps

const NextComposed = React.forwardRef<HTMLAnchorElement, NextComposedProps>(
  (props, ref) => {
    const {
      as,
      href,
      replace,
      scroll,
      passHref,
      shallow,
      prefetch,
      ...rest
    } = props

    return (
      <NextLink
        href={href}
        prefetch={prefetch}
        as={as}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        passHref={passHref}
      >
        <a ref={ref} {...rest} />
      </NextLink>
    )
  },
)

interface LinkPropsBase {
  activeClassName?: string
  innerRef?: React.Ref<HTMLAnchorElement>
  naked?: boolean
}

export type LinkProps = LinkPropsBase &
  NextComposedProps &
  Omit<MuiLinkProps, 'href'>

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
function Link(props: LinkProps) {
  const {
    href,
    activeClassName = 'active',
    className: classNameProps,
    innerRef,
    naked,
    ...rest
  } = props

  const router = useRouter()
  const pathname = typeof href === 'string' ? href : href.pathname
  const className = classnames(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  })

  if (naked) {
    return (
      <NextComposed
        className={className}
        ref={innerRef}
        href={href}
        {...rest}
      />
    )
  }

  return (
    <MuiLink
      component={NextComposed}
      className={className}
      ref={innerRef}
      href={href as string}
      {...rest}
    />
  )
}

export default React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <Link {...props} innerRef={ref} />
))