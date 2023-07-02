import {
  Box,
  Button,
  Fade,
  IconButton,
  Modal,
  Paper,
  Typography,
  unstable_createMuiStrictModeTheme,
  useMediaQuery,
} from "@mui/material";
import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import { gql, useMutation } from "@apollo/client";

const DELETE_PROFILE = gql`
  mutation DeleteProfile($deleteProfileId: String!) {
    deleteProfile(id: $deleteProfileId)
  }
`;
type DeleteProfileProps = {
  open: boolean;
  handleClose: () => void;
  selectedProfileId: string;
};
const DeleteProfile: React.FC<DeleteProfileProps> = ({
  handleClose,
  open,
  selectedProfileId,
}) => {
  const muiTheme = unstable_createMuiStrictModeTheme();
  const isSmallScreen = useMediaQuery(muiTheme.breakpoints.down("md"));
  const [deleteProfile] = useMutation(DELETE_PROFILE);

  const handleDelete = async () => {
    try {
      await deleteProfile({
        variables: { deleteProfileId: selectedProfileId },
      });

      handleClose();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose} closeAfterTransition>
      <Fade in={open}>
        <Paper
          sx={{
            display: "relative",
            position: "fixed",
            top: "50%",
            left: "50%",
            bgcolor: "background.default",
            color: "text.primary",
            transform: "translate(-50%, -50%)",
            width: isSmallScreen ? "70%" : "500px",
            maxHeight: isSmallScreen ? "100%" : "400px",
          }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "20px 40px  ",
              alignItems: "center",
              height: "30px",

              borderBottom: "1px solid lightgrey",
              color: "text.primary",
            }}>
            <Typography variant="h6">Remove Profile</Typography>
            <IconButton onClick={handleClose}>
              {" "}
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", padding: "50px" }}>
            <Typography variant="caption">
              Removed profile will be deleted permenantly and won’t be available
              anymore.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              padding: "20px 10px",
              borderTop: "1px solid lightgrey",
            }}>
            <Button
              onClick={handleClose}
              sx={{
                textTransform: "none",
                width: "100%",
                color: "text.primary",
                bgcolor: "text.disabled",
                margin: " 0 20px",
              }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleDelete}
              color="error"
              sx={{
                textTransform: "none",
                width: "100%",

                margin: " 0 20px",
              }}>
              Delete
            </Button>
          </Box>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default DeleteProfile;
