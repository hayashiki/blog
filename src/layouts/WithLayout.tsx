import { useEffect, useState } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline, Paper } from "@material-ui/core";
import getTheme from "../theme";

export const useDarkMode = () => {
  const [themeMode, setTheme] = useState<string>("light");
  const [mountedComponent, setMountedComponent] = useState<boolean>(false);

  const setMode = (mode: string) => {
    window.localStorage.setItem("themeMode", mode);
    setTheme(mode);
  };

  const themeToggler = () => {
    themeMode === "light" ? setMode("dark") : setMode("light");
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("themeMode");
    localTheme ? setTheme(localTheme) : setMode("light");
    setMountedComponent(true);
  }, []);

  return [themeMode, themeToggler, mountedComponent];
};

type Props = {
  layout: any;
  component: any;
  [x: string]: any;
};

export default function WithLayout({
  component: Component,
  layout: Layout,
  ...rest
}: Props): JSX.Element {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);
  const [themeMode, themeToggler, mountedComponent] = useDarkMode();

  if (!mountedComponent) return <div />;

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <Paper elevation={0}>
        <Layout themeMode={themeMode} themeToggler={themeToggler}>
          <Component themeMode={themeMode} {...rest} />
        </Layout>
      </Paper>
    </ThemeProvider>
  );
}
