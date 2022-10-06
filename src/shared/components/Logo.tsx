import React from "react";

import { Box } from "@mui/material";
import Link from "next/link";

const Logo = () => {
  return (
    <Box>
      <Link href="/">
        <Box component="img" src="/static/icon_logo.png" alt="logo" />
      </Link>
    </Box>
  );
};

export default Logo;
