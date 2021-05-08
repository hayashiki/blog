import { Divider, makeStyles } from "@material-ui/core";
import React, { ReactNode, useState } from "react";
import Topbar from "@/layouts/Minimal/components/Topbar";

const useStyles = makeStyles(() => ({
  root: {},
  content: {
    height: "100%",
  },
}));

type Props = {
  children: React.ReactNode;
  themeMode: string;
  className?: string;
};

const Minimal = ({ themeMode, children, className }: Props): JSX.Element => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div>
      <Topbar
        themeMode={themeMode}
        // themeTogger={themeToggler}
        onMobileNavOpen={() => setMobileNavOpen(true)}
      />
      <Divider />
      <main>{children}</main>
    </div>
  );
};

export default Minimal;
