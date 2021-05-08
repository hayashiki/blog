import React from "react";
import { Avatar, makeStyles, Toolbar } from "@material-ui/core";
import clsx from "clsx";

type Props = {
  themeMode: string;
  className?: string;
  onMobileNavOpen: () => void;
};

const useStyles = makeStyles((theme) => ({
  toolbar: {
    width: "100%",
    padding: theme.spacing(0, 2),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(0, 8),
    },
  },
  logoContainer: {
    width: 56,
    height: 56,
    [theme.breakpoints.up("md")]: {
      width: 56,
      height: 56,
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

//<Image width={150} height={150} src="/assets/xxx.png" />
const Topbar = ({ themeMode, className, ...rest }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Toolbar className={clsx(classes.toolbar, className)} {...rest}>
      <div className={classes.logoContainer}>
        <Avatar
          className={classes.large}
          src={
            themeMode === "light"
              ? "/assets/blog-logo-oimo-type2.png"
              : "/assets/blog-logo-oimo-type2.png"
          }
        />
      </div>
    </Toolbar>
  );
};

export default Topbar;
