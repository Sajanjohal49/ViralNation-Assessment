import React from "react";
import { Box } from "@mui/material";
import MainHomeComponent from "./MainHomeComponent";

const Home = () => {
  // Type annotation for profiles array

  return (
    <Box
      minHeight="100vh"
      sx={{
        bgcolor: "background.default",
        height: "100%",

        color: "text.primary",
      }}>
      <MainHomeComponent />
    </Box>
  );
};

export default Home;
