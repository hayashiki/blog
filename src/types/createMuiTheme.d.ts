import { Theme, ThemeOptions } from '@material-ui/core/styles/createMuiTheme'

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    layout: {
      contentWidth: number | string
    }
  }
  interface ThemeOptions {
    layout?: {
      contentWidth: number | string
    }
  }
}
