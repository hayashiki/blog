import React, { useEffect } from 'react'
import Head from 'next/head'
import { useAnalytics } from '@/lib/analytics'
import { ThemeProvider } from '@material-ui/styles'
import getTheme from '@/theme'
import { CssBaseline, Paper } from '@material-ui/core'

interface AppProps {
  Component: any
  pageProps: any
}

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  useAnalytics()

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])
  // const [themeMode, themeToggler, mountedComponent] = useDarkMode()

  // if (!mountedComponent) return <div />

  return (
    <ThemeProvider theme={getTheme('light')}>
      <CssBaseline />
      <Paper elevation={0}>
        <Component {...pageProps} />
      </Paper>
    </ThemeProvider>
  )
}
