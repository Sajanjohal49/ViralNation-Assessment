import { useMutation } from "@apollo/client";
import CloseIcon from "@mui/icons-material/Close";
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
  unstable_createMuiStrictModeTheme as createMuiTheme,
  useMediaQuery,
} from "@mui/material";

import React from "react";
import { CREATE_PROFILE_MUTATION } from "../../queries/createProfile";
import { useFormik } from "formik";
import * as Yup from "yup";

type CreateProfileProps = {
  open: boolean;
  handleClose: () => void;
};
const validationSchema = Yup.object({
  imageUrl: Yup.string().required("Image URL is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  description: Yup.string().required("Description is required"),
});

const CreateProfile: React.FC<CreateProfileProps> = ({ open, handleClose }) => {
  const muiTheme = createMuiTheme();
  const isSmallScreen = useMediaQuery(muiTheme.breakpoints.down("md"));
  const [createProfile] = useMutation(CREATE_PROFILE_MUTATION);
  const [checked, setChecked] = React.useState(true);

  const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const formik = useFormik({
    initialValues: {
      imageUrl: "",
      firstName: "",
      lastName: "",
      email: "",
      description: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      // Handle form submission
      console.log("Form submitted", values);
      const { imageUrl, firstName, lastName, email, description } = values;
      const variables = {
        imageUrl,
        firstName,
        lastName,
        email,
        isVerified: checked,
        description,
      };

      try {
        const response = await createProfile({ variables });
        window.location.reload();
        console.log("Profile created:", response.data.createProfile);
        handleClose(); // Close the modal after successful profile creation
      } catch (error) {
        console.error("Error creating profile:", error);
      }
    },
  });

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
            <form onSubmit={formik.handleSubmit}>
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
                        value={formik.values.imageUrl}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.imageUrl &&
                          Boolean(formik.errors.imageUrl)
                        }
                        helperText={
                          formik.touched.imageUrl && formik.errors.imageUrl
                        }
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
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.firstName &&
                          Boolean(formik.errors.firstName)
                        }
                        helperText={
                          formik.touched.firstName && formik.errors.firstName
                        }
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
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.lastName &&
                          Boolean(formik.errors.lastName)
                        }
                        helperText={
                          formik.touched.lastName && formik.errors.lastName
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputLabel sx={{ fontSize: "13px" }}>Email</InputLabel>
                      <TextField
                        name="email"
                        size="small"
                        fullWidth
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
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
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.description &&
                          Boolean(formik.errors.description)
                        }
                        helperText={
                          formik.touched.description &&
                          formik.errors.description
                        }
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
