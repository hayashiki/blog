import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: theme.layout.contentWidth,
    width: "100%",
    margin: "0 auto",
    padding: theme.spacing(6, 2),
    // [theme.breakpoints.up("sm")]: {
    //   padding: theme.spacing(8, 8)
    // },
    // [theme.breakpoints.up("md")]: {
    //   padding: theme.spacing(12, 8)
    // }
  },
  fullWidth: {
    maxWidth: "100%",
  },
  disablePadding: {
    padding: 0,
  },
  narrow: {
    maxWidth: 800,
  },
}));

const Section = ({
  children,
  fullWidth,
  narrow,
  disablePadding,
  className,
  ...rest
}: SectionProps): JSX.Element => {
  const classes = useStyles();

  return (
    <section
      className={clsx(
        "section",
        classes.root,
        fullWidth ? classes.fullWidth : {},
        narrow ? classes.narrow : {},
        disablePadding ? classes.disablePadding : {},
        className
      )}
      {...rest}
    >
      {children}
    </section>
  );
};

export default Section;

interface SectionProps {
  /**
   * External classes
   */
  className?: string;
  /**
   * Children to placed inside the section
   */
  children?: JSX.Element;
  /**
   * Should show narrow sections
   */
  narrow?: boolean;
  /**
   * Should the section be full width
   */
  fullWidth?: boolean;
  /**
   * Should the section render with no padding
   */
  disablePadding?: boolean;

  // All other props
  [x: string]: any;
}
