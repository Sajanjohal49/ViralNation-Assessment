import React from "react";
import { Box } from "@mui/material";
import Test from "./CardView/Test";

const Homepage = () => {
  // Type annotation for profiles array

  return (
    <Box
      minHeight="100vh"
      sx={{
        bgcolor: "background.default",
        height: "100%",

        color: "text.primary",
      }}>
      {/* <CardView /> */}
      <Test />
    </Box>
  );
};

export default Homepage;
