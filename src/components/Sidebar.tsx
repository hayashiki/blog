import { colors, createStyles, Drawer, List, ListItem, Theme, Typography } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/styles'

type Props = {
  onClose: Function
  open: boolean
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: '100%',
      maxWidth: '10rem',
    },
    root: {
      height: '100%',
      padding: theme.spacing(1),
    },
    nav: {
      marginBottom: theme.spacing(1),
    },
    menuGroupItem: {
      paddingTop: 0,
    },
  }),
)

const Sidebar = ({ open, onClose }: Props): JSX.Element => {
  const classes = useStyles()

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={() => onClose()}
      open={open}
      variant="temporary"
    >
      <List disablePadding>
        <ListItem disableGutters>
          <Typography variant="body2" color="primary">
            Title
          </Typography>
        </ListItem>
        <ListItem disableGutters className={classes.menuGroupItem}>
          <Typography variant="body2" component={'a'} href={'profile'} onClick={() => onClose()}>
            Profile
          </Typography>
        </ListItem>
      </List>
    </Drawer>
  )
}

export default Sidebar
