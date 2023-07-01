import React from "react";
import { Box, TextField, Button } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import CreateProfile from "../CreateProfile/CreateProfile";

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
  return (
    <Box
      sx={{
        padding: "20px 0",
      }}>
      <TextField
        type="text"
        size="small"
        fullWidth
        sx={{ padding: "0px 10px 0px" }}
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
          variant="outlined"
          sx={{
            display: "flex",
            alignItems: "center",
            textTransform: "none",
            minWidth: "10rem",
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
