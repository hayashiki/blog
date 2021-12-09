import React from 'react'
import { parse } from 'querystring'
import { ListItem, makeStyles, Typography } from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  item: {},
  itemActive: {},
}))

const getComponentId = () => parse(window.location.search).component || 'introduction'

type Props = {
  id: string
  title: string
  className?: string
  href: string
}

const NavItem = ({ title, id, className, href, ...rest }: Props): JSX.Element => {
  const classes = useStyles()
  return (
    <ListItem
      className={clsx(classes.item, getComponentId() === id ? classes.itemActive : '', className)}
      component={'a'}
      href={href}
      {...rest}
    >
      <Typography variant="body2" component="span">
        {title}
      </Typography>
    </ListItem>
  )
}

export default NavItem
