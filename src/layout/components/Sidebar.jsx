import { Component, Dispatch, SetStateAction, useEffect } from "react";
import {Route, Link, Routes, useLocation} from 'react-router-dom';
import PropTypes from "prop-types";
import {
  Box,
  Divider,
  Drawer,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Icons from "../../shared/utils/Icons";
import { Logo } from "../utils/logo";
import { NavItem } from "./user";


const items = [
  {
    
    href: "/",
    icon: <Icons name="HomeIcon" size="lg" />,
    title: "Inicio",
  },

  {
    href: "/blog",
    icon: <Icons name="BookOpenIcon"  size="lg"/>,
    title: "Blog",
  },
  {
    href: "/donaciones",
    icon: <Icons name="GiftIcon"  size="lg" />,
    title: "Donaciones",
  },
];



export const DashboardSidebar = (props) => {
  const { isSidebarOpen, setSidebarOpen } = props;
  const location = useLocation();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (!location) {
      return;
    }

    if (isSidebarOpen) {
      setSidebarOpen?.(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);  

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ p: 1 }}>
       
          Chat
        
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: "#2D3748" }} />
      </Box>
    </>
  );

  
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: matches ? "100vw" : 380,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  

 /*  return (
    <Drawer
      anchor="left"
      onClose={setSidebarOpen}
      open={isSidebarOpen}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 350,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  ); */
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
