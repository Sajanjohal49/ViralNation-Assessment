import React, { FormEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  Fade,
  Grid,
  IconButton,
  InputLabel,
  Modal,
  Paper,
  Switch,
  TextField,
  Typography,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { useLazyQuery, useMutation } from "@apollo/client";

import CloseIcon from "@mui/icons-material/Close";
import { UPDATE_PROFILE } from "../../queries/editProfiles";
import { GET_PROFILE_DETAILS } from "../../queries/getProfileDetails";

type Profile = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  is_verified: boolean;
  image_url: string;
  description: string;
};

type EditProfileProps = {
  open: boolean;
  handleClose: () => void;
  selectedProfileId: string;
};

const EditProfile: React.FC<EditProfileProps> = ({
  open,
  handleClose,
  selectedProfileId,
}) => {
  const muiTheme = createTheme();
  const isSmallScreen = useMediaQuery(muiTheme.breakpoints.down("md"));
  const [formData, setFormData] = useState<Partial<Profile>>({
    is_verified: false,
  });
  const [formErrors, setFormErrors] = useState<Partial<Profile>>({});

  const [fetchProfileDetails] = useLazyQuery(GET_PROFILE_DETAILS, {
    onCompleted: (data) => {
      const fetchedProfileData = data.getProfileById;
      setFormData(fetchedProfileData);
    },
  });

  const [updateProfile] = useMutation(UPDATE_PROFILE);

  useEffect(() => {
    if (selectedProfileId) {
      fetchProfileDetails({ variables: { getProfileById: selectedProfileId } });
    }
  }, [selectedProfileId, fetchProfileDetails]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Validate form data
      const errors: Partial<Profile> = {};
      if (!formData.first_name) {
        errors.first_name = "First name is required";
      }
      if (!formData.last_name) {
        errors.last_name = "Last name is required";
      }
      if (!formData.email) {
        errors.email = "Email is required";
      }
      if (!formData.description) {
        errors.description = "description is required";
      }
      // You can add more validation rules here

      // Set form errors
      setFormErrors(errors);

      // Check if there are any validation errors
      if (Object.keys(errors).length > 0) {
        return;
      }

      // Submit the form if there are no errors
      await updateProfile({
        variables: {
          updateProfileId: selectedProfileId,
          firstName: formData.first_name,
          lastName: formData.last_name,
          email: formData.email,
          isVerified: formData.is_verified || false,
          imageUrl: formData.image_url,
          description: formData.description,
        },
      });

      console.log(formData);
      window.location.reload();
      // Handle successful update here
    } catch (error) {
      console.error(error);
      // Handle error here
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      is_verified: checked,
    }));
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose} closeAfterTransition>
        <Fade in={open}>
          <Paper
            sx={{
              display: "relative",
              position: "fixed",
              top: "50%",
              left: "50%",
              bgcolor: "background.default",
              color: "text.default",
              transform: "translate(-50%, -50%)",
              width: isSmallScreen ? "100%" : "60vw",
              height: isSmallScreen ? "100%" : "95%",
              outline: "none",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
            }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "20px 40px",
                alignItems: "center",
                height: "30px",
                borderBottom: "1px solid lightgrey",
              }}>
              <Typography variant="h6">Edit Profile</Typography>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <form onSubmit={handleSubmit}>
                <Box>
                  <Box sx={{ padding: "30px 60px" }}>
                    <Grid container spacing={2} rowSpacing={3}>
                      <Grid item xs={12}>
                        <InputLabel sx={{ fontSize: "13px" }}>
                          Image Url
                        </InputLabel>
                        <TextField
                          name="image_url"
                          size="small"
                          fullWidth
                          value={formData.image_url || ""}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <InputLabel sx={{ fontSize: "13px" }}>
                          First name
                        </InputLabel>
                        <TextField
                          name="first_name"
                          size="small"
                          fullWidth
                          value={formData.first_name}
                          onChange={handleChange}
                          error={!!formErrors.first_name}
                          helperText={formErrors.first_name}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <InputLabel sx={{ fontSize: "13px" }}>
                          Last name
                        </InputLabel>
                        <TextField
                          name="last_name"
                          size="small"
                          fullWidth
                          value={formData.last_name || ""}
                          onChange={handleChange}
                          error={!!formErrors.last_name}
                          helperText={formErrors.last_name}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <InputLabel sx={{ fontSize: "13px" }}>Email</InputLabel>
                        <TextField
                          name="email"
                          size="small"
                          fullWidth
                          value={formData.email || ""}
                          onChange={handleChange}
                          error={!!formErrors.email}
                          helperText={formErrors.email}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <InputLabel sx={{ fontSize: "13px" }}>
                          Description
                        </InputLabel>
                        <TextField
                          multiline
                          rows={4}
                          name="description"
                          size="small"
                          fullWidth
                          value={formData.description || ""}
                          onChange={handleChange}
                          error={!!formErrors.description}
                          helperText={formErrors.description}
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
                            sx={{
                              justifyContent: "center",
                              alignItems: "center",
                              display: "flex",
                              fontSize: "14px",
                            }}>
                            Talent is verified
                          </Typography>
                          <Switch
                            sx={{ color: "text.primary" }}
                            checked={formData.is_verified}
                            onChange={handleSwitchChange}
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
                      Update Profile
                    </Button>
                  </Box>
                </Box>
              </form>
            </Box>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
};

export default EditProfile;
