import { Divider, makeStyles } from '@material-ui/core'
import React, { ReactNode, useState } from 'react'
import { NextSeo } from 'next-seo'
import { Head } from 'next/document'
import ScrollTop from '@/components/ScrollTop'
import Topbar from '@/components/Topbar'
import Sidebar from '@/components/Sidebar'

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    height: '100%',
    width: '100%',
  },
  content: {
    // minHeight: 'calc(100vh - 56px)',
    height: '100%',
    width: '100%',
  },
  offset: {
    ...theme.mixins.toolbar,
    flexGrow: 1,
  },
}))

type Props = {
  children: React.ReactNode
  themeMode: string
  className?: string
}

const BaseLayout = ({ themeMode, children, className }: Props): JSX.Element => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Topbar
        themeMode={themeMode}
        // themeTogger={themeToggler}
      />
      <div className={classes.offset} />
      <main className={classes.content}>{children}</main>
      <ScrollTop />
    </div>
  )
}

export default BaseLayout
