import React from 'react'
import {
  Box,
  Button,
  Drawer,
  Hidden,
  List,
  ListItem,
  makeStyles,
  Typography,
} from '@material-ui/core'
import { components } from './data'
import NavItem from '@/layouts/Minimal/components/Navbar/components/NavItem'

const useStyles = makeStyles((theme) => ({
  navGroupTitle: {
    paddingBottom: 0,
  },
  title: {
    fontWeight: 700,
  },
  navGroup: {
    marginBottom: theme.spacing(2),
    '&:last-child': {
      marginBottom: 0,
    },
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)',
  },
  mobileDrawer: {
    width: 256,
  },
}))

type Props = {
  onMobileClose: Function
  openMobile: boolean
}

const Navbar = ({ onMobileClose, openMobile }: Props): JSX.Element => {
  const classes = useStyles()

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box p={2} paddingBottom={0}>
        <List>
          {components.map((item) => (
            <div key={item.id}>
              <ListItem>
                <Typography variant="button" color="textSecondary" className={classes.title}>
                  {item.title}
                </Typography>
              </ListItem>
              <List disablePadding className={classes.navGroup}>
                {item.pages.map((page) => (
                  <NavItem href={page.href} key={page.id} title={page.title} id={page.id} />
                ))}
              </List>
            </div>
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
      <Box p={2} paddingTop={0}>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button color="primary" component="a" href="/" variant="outlined" fullWidth>
            SEE ALL PAGES
          </Button>
        </Box>
      </Box>
    </Box>
  )

  return (
    <>
      <Hidden mdUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={() => onMobileClose()}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden smDown>
        <Drawer anchor="left" open classes={{ paper: classes.desktopDrawer }} variant="persistent">
          {content}
        </Drawer>
      </Hidden>
    </>
  )
}

export default Navbar
