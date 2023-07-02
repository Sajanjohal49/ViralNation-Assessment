import { gql, useMutation } from "@apollo/client";
import { useTheme } from "@emotion/react";
import { Height } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Fade,
  Grid,
  IconButton,
  Input,
  InputLabel,
  Modal,
  Paper,
  Switch,
  TextField,
  Typography,
  unstable_createMuiStrictModeTheme as createMuiTheme,
  useMediaQuery,
} from "@mui/material";
import { grey } from "@mui/material/colors";

import React, { ChangeEvent, FormEvent, useState } from "react";
type CreateProfileProps = {
  open: boolean;
  handleClose: () => void;
};
const CREATE_PROFILE_MUTATION = gql`
  mutation CreateProfile(
    $firstName: String!
    $lastName: String!
    $email: String!
    $isVerified: Boolean!
    $imageUrl: String!
    $description: String!
  ) {
    createProfile(
      first_name: $firstName
      last_name: $lastName
      email: $email
      is_verified: $isVerified
      image_url: $imageUrl
      description: $description
    ) {
      id
      first_name
      last_name
      email
      is_verified
      image_url
      description
    }
  }
`;

const CreateProfile: React.FC<CreateProfileProps> = ({ open, handleClose }) => {
  const theme = useTheme();
  const muiTheme = createMuiTheme();
  const isSmallScreen = useMediaQuery(muiTheme.breakpoints.down("md"));
  const [createProfile] = useMutation(CREATE_PROFILE_MUTATION);
  const [checked, setChecked] = React.useState(true);

  const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    isVerified: checked,
    imageUrl: "",
    description: "",
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted", formData);
    const variables = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      isVerified: formData.isVerified,
      imageUrl: formData.imageUrl,
      description: formData.description,
    };

    try {
      const response = await createProfile({ variables });
      window.location.reload();
      console.log("Profile created:", response.data.createProfile);
      handleClose(); // Close the modal after successful profile creation
    } catch (error) {
      console.error("Error creating profile:", error);
    }
  };
  return (
    <Modal open={open} onClose={handleClose} closeAfterTransition>
      <Fade in={open}>
        {/* Add your modal content here */}
        {/* For example: */}
        <Paper
          sx={{
            display: "relative",
            position: "fixed",
            top: "50%",
            left: "50%",

            transform: "translate(-50%, -50%)",
            width: isSmallScreen ? "100%" : "60vw",
            height: isSmallScreen ? "100%" : "95%",

            outline: "none",
            color: "text.primary",
            bgcolor: "background.default",

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
            }}>
            <Typography variant="h6">Create Profile</Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <form onSubmit={handleSubmit}>
              <Box>
                <Box
                  sx={{
                    padding: "50px 40px 0px ",
                    justifyContent: "center",

                    alignItems: "center",
                  }}>
                  <Grid container spacing={2} rowSpacing={3}>
                    <Grid item xs={12}>
                      <InputLabel sx={{ fontSize: "13px" }}>
                        Image Url
                      </InputLabel>
                      <TextField
                        name="imageUrl"
                        size="small"
                        fullWidth
                        value={formData.imageUrl}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ fontSize: "13px" }}>
                        First name
                      </InputLabel>
                      <TextField
                        name="firstName"
                        size="small"
                        fullWidth
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <InputLabel sx={{ fontSize: "13px" }}>
                        Last name
                      </InputLabel>
                      <TextField
                        name="lastName"
                        size="small"
                        fullWidth
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputLabel sx={{ fontSize: "13px" }}>Email</InputLabel>
                      <TextField
                        name="email"
                        size="small"
                        fullWidth
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <InputLabel sx={{ fontSize: "13px" }}>
                        Description
                      </InputLabel>
                      <TextField
                        label=""
                        name="description"
                        size="small"
                        fullWidth
                        multiline
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputLabel sx={{ fontSize: "13px" }}>
                        Verification
                      </InputLabel>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          color: "text.primary",
                          padding: "7px 10px",
                          bgcolor: "divider",
                          borderRadius: "4px",
                        }}>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                          }}>
                          Talent is verified
                        </Typography>
                        <Switch
                          checked={checked}
                          onChange={handleSwitch}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    position: "fixed",
                    bottom: "0px",
                    width: "100%",
                    justifyContent: "flex-end",
                    borderTop: "1px solid lightgrey",
                  }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ margin: "20px 20px", textTransform: "none" }}>
                    Create Profile
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default CreateProfile;
