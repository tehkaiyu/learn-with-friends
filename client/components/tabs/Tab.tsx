import React from 'react'
import Tab from '@material-ui/core/Tab'
import { makeStyles } from '@material-ui/styles'

const useTabStyles = makeStyles((theme) => ({
  root: {
    lineHeight: 'inherit',
    minWidth: 0,
    '&:not(:last-child)': {
      marginRight: 24,
      [theme.breakpoints.up('sm')]: {
        marginRight: 60,
      },
    },
    [theme.breakpoints.up('md')]: {
      minWidth: 0,
    },
  },
  labelIcon: {
    minHeight: 53,
    '& $wrapper > *:first-child': {
      marginBottom: 0,
    },
  },
  textColorInherit: {
    opacity: 0.4,
  },
  wrapper: {
    flexDirection: 'row',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    fontSize: theme.typography.overline.fontSize,
    justifyContent: 'left',
    '& svg, .material-icons': {
      fontSize: 16,
      marginRight: 8,
    },
  },
}))

function IntTab({ children, ...props }) {
  const classes = useTabStyles()
  return (
    <Tab classes={classes} {...props}>
      {children}
    </Tab>
  )
}

export default IntTab