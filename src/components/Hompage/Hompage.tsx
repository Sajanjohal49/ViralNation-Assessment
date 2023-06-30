import React, { useContext, useState } from "react";
import { DarkModeContext } from "../hook/DarkModeContext";
import { Box } from "@mui/material";
import CardView from "./CardView/CardView";
import { gql, useLazyQuery, useQuery } from "@apollo/client";

const GET_ALL_PROFILES = gql`
  query GetAllProfiles(
    $orderBy: globalOrderBy
    $searchString: String
    $rows: Int
    $page: Int
  ) {
    getAllProfiles(
      orderBy: $orderBy
      searchString: $searchString
      rows: $rows
      page: $page
    ) {
      size
      profiles {
        id
        first_name
        last_name
        email
        is_verified
        image_url
        description
      }
    }
  }
`;
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
    <Box>
      <CardView />
    </Box>
  );
};

export default Homepage;
