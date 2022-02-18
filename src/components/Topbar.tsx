import React, { useState } from 'react'
import {
  AppBar,
  Avatar,
  Box,
  Container,
  Hidden,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import MenuIcon from '@material-ui/icons/Menu'
import Link from 'next/link'
import Sidebar from '@/components/Sidebar'

type Props = {
  themeMode: string
}

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  logo: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
  },
  iconButton: {
    padding: 0,
    '&:hover': {
      background: 'transparent',
    },
  },
}))

const Topbar = ({ themeMode }: Props): JSX.Element => {
  const classes = useStyles()

  const [openSidebar, setOpenSidebar] = useState<boolean>(false)
  const handleSidebarClose = () => {
    setOpenSidebar(false)
  }

  return (
    <AppBar className={classes.root} position="fixed" elevation={0} color="inherit">
      <Sidebar onClose={handleSidebarClose} open={openSidebar} />
      <Toolbar>
        <Container maxWidth={'md'}>
          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Box display={'flex'} alignItems={'center'}>
              <Link href="/" passHref>
                <Avatar
                  className={classes.logo}
                  src={
                    themeMode === 'light'
                      ? '/assets/blog-logo-oimo-type2.png'
                      : '/assets/blog-logo-oimo-type2.png'
                  }
                  alt={'profile.img'}
                />
              </Link>
              <Link href="/" passHref>
                <Box fontWeight={'bold'} component={'span'} p={1}>
                  Hayashida.dev
                </Box>
              </Link>
            </Box>
            <Hidden xsDown>
              {/* TODO: Loop */}
              <Box display={'flex'} alignItems={'center'}>
                <Box fontWeight="bold">
                  <Typography
                    color="textPrimary"
                    variant="body1"
                    component={'a'}
                    href={'profile'}
                    style={{ textDecoration: 'none' }}
                  >
                    Profile
                  </Typography>
                </Box>
                <Box ml={1}>
                  <Link href="/tag" passHref>
                    <Typography
                      color="textPrimary"
                      variant="body1"
                      component={'a'}
                      href={'profile'}
                      style={{ textDecoration: 'none' }}
                    >
                      Tag
                    </Typography>
                  </Link>
                </Box>
                <Box ml={1}>
                  <IconButton color="inherit">
                    <Brightness7Icon />
                  </IconButton>
                </Box>
              </Box>
            </Hidden>
            <Hidden smUp>
              <IconButton
                className={classes.iconButton}
                onClick={() => setOpenSidebar(true)}
                aria-label="Menu"
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  )
}

export default Topbar
