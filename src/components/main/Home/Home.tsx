import React from "react";
import { Box } from "@mui/material";

import MainSection from "./MainSection";

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
      <MainSection />
    </Box>
  );
};

export default Home;
