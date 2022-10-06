import PropTypes from "prop-types";
import styled from "@emotion/styled";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
} from "@mui/material";
import Icons from "../../shared/utils/Icons";
import useNotiffication from "../../shared/hooks/UseNotiffication";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;
  const { addNotiffication } = useNotiffication();

  const handleLogoutOpen = () => {
    addNotiffication({
      title: "Estás a punto de cerrar sesión",
      message:
        "Estás a punto de salir de AudioBook, presiona 'OK' para cerrar sessión.",
      onClose: async () => {
        await ""
      },
    });
  };

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: "calc(100% - 280px)",
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <Box sx={{ flexGrow: 1 }} />

          <Tooltip title="Salir">
            <IconButton sx={{ ml: 1 }} onClick={() => handleLogoutOpen()}>
              <Icons name="LogoutIcon" size="lg" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Cuenta">
            <Avatar
              alt={""}
              sx={{
                height: 40,
                width: 40,
                ml: 1,
                cursor: "pointer",
              }}
              src={""}
            />
          </Tooltip>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};
