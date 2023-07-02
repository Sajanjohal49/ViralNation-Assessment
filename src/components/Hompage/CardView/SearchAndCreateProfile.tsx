import React from "react";
import {
  Box,
  TextField,
  Button,
  useMediaQuery,
  createTheme,
} from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import CreateProfile from "../CreateProfile/CreateProfile";
import { useTheme } from "@emotion/react";

type SearchAndCreateProfileProps = {
  searchInput: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOpen: () => void;
  open: boolean;
  handleClose: () => void;
};

const SearchAndCreateProfile: React.FC<SearchAndCreateProfileProps> = ({
  searchInput,
  handleInputChange,
  handleOpen,
  open,
  handleClose,
}) => {
  const theme = useTheme();

  // Use the theme object to determine the border color

  const muiTheme = createTheme();
  const isSmallScreen = useMediaQuery(muiTheme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        bgcolor: "background.default",

        color: "text.primary",
        padding: isSmallScreen ? "20px 30px" : "50px 0px",
        display: isSmallScreen ? "relative" : "flex",
      }}>
      <TextField
        type="text"
        size="small"
        fullWidth
        sx={{
          padding: isSmallScreen ? "0px" : "10px",
        }}
        value={searchInput}
        onChange={handleInputChange}
        placeholder="Search Profiles"
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}>
        <Button
          color="primary"
          variant="outlined"
          sx={{
            display: "flex",
            alignItems: "center",

            textTransform: "none",
            minWidth: "10rem",
            padding: "7px",
            marginTop: isSmallScreen ? "10px" : "",
            borderRadius: "10px",
          }}
          onClick={handleOpen}>
          <PersonAddAlt1Icon sx={{ paddingRight: "10px" }} />
          Create Profile
        </Button>
      </Box>
      <CreateProfile open={open} handleClose={handleClose} />
    </Box>
  );
};

export default SearchAndCreateProfile;
