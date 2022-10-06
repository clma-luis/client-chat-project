import * as React from "react";
import Button from "@mui/material/Button";
import useNotiffication from "../hooks/UseNotiffication";
import { Box, Divider } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function BasicModal() {
  const { notiffication, removeNotiffication } = useNotiffication();

  const handleOK = () => {
    removeNotiffication(true);
  };
  const handleClose = () => {
    removeNotiffication(false);
  };

  return (
    <Dialog
      open={!!notiffication}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{ px: 4 }}
      maxWidth="xs"
    >
      <DialogTitle>{notiffication?.title}</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {notiffication?.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Box
          component="div"
          sx={{
            display: "inline",
            width: "50%",
            "& button": { width: "100%" },
          }}
        >
          <Button onClick={handleClose} variant="outlined">
            Cancelar
          </Button>
        </Box>
        <Box
          component="div"
          sx={{
            display: "inline",
            width: "50%",
            "& button": { width: "100%" },
          }}
        >
          <Button onClick={handleOK} variant="contained" color="primary">
            OK
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
