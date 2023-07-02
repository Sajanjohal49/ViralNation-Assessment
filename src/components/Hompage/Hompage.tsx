import React, { useContext, useState } from "react";
import { Box } from "@mui/material";
import CardView from "./CardView/CardView";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import Test from "./CardView/Test";

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  is_verified: boolean;
  image_url: string;
  description: string;
}

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
