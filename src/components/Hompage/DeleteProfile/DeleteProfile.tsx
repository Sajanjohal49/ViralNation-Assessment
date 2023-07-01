import {
  Box,
  Button,
  Fade,
  Modal,
  Typography,
  alpha,
  unstable_createMuiStrictModeTheme,
  useMediaQuery,
} from "@mui/material";
import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@emotion/react";
import { grey, red } from "@mui/material/colors";
import { Padding } from "@mui/icons-material";
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
  const theme = useTheme();
  const muiTheme = unstable_createMuiStrictModeTheme();
  const isSmallScreen = useMediaQuery(muiTheme.breakpoints.down("md"));
  const [deleteProfile] = useMutation(DELETE_PROFILE);

  const handleDelete = async () => {
    try {
      await deleteProfile({
        variables: { deleteProfileId: selectedProfileId },
      });

      // Handle successful deletion here

      handleClose();
      window.location.reload();
    } catch (error) {
      console.error(error);
      // Handle error here
    }
  };

  return (
    <Modal open={open} onClose={handleClose} closeAfterTransition>
      <Fade in={open}>
        {/* Add your modal content here */}
        {/* For example: */}
        <Box
          sx={{
            display: "relative",
            position: "fixed",
            top: "50%",
            left: "50%",
            bgcolor: "#fff",
            transform: "translate(-50%, -50%)",
            width: isSmallScreen ? "70%" : "400px",
            maxHeight: isSmallScreen ? "100%" : "400px",

            outline: "none",

            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
          }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "20px 40px  ",
              alignItems: "center",
              height: "30px",

              borderBottom: "1px solid lightgrey",
              color: grey[800],
            }}>
            <Typography variant="h6">Remove Profile</Typography>
            <CloseIcon onClick={handleClose} />
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
                bgcolor: grey[300],
                color: grey[900],
                margin: " 0 30px",
              }}>
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              sx={{
                textTransform: "none",
                width: "100%",
                bgcolor: {
                  main: red[700],
                  "&:hover": alpha(red[700], 0.8), // Adjust the opacity to make it lighter on hover
                },
                color: grey[200],
                margin: " 0 30px",
              }}>
              Delete
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default DeleteProfile;
