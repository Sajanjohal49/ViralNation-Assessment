import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Fade,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Popover,
  Stack,
  TextField,
  Typography,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { gql, useLazyQuery } from "@apollo/client";
import debounce from "lodash.debounce";
import { blue, grey } from "@mui/material/colors";
import VerifiedIcon from "@mui/icons-material/Verified";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import CreateProfile from "../CreateProfile/CreateProfile";
import styled from "@emotion/styled";
import { DarkModeContext } from "../../hook/DarkModeContext";
import DeleteProfile from "../DeleteProfile/DeleteProfile";
import EditProfile from "../EditProfile/EditProfile";
import Actions from "./Actions";

const CustomBox = styled(Box)`
  line-height: 0.2; // Adjust the line height as needed
`;

type Profile = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  is_verified: boolean;
  image_url: string;
  description: string;
};

type CardViewProps = {};

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

const CardView: React.FC<CardViewProps> = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const [hasMoreProfiles, setHasMoreProfiles] = useState(true);

  const muiTheme = createTheme();
  const isSmallScreen = useMediaQuery(muiTheme.breakpoints.down("md"));

  const { darkMode } = useContext(DarkModeContext);
  const [open, setOpen] = useState(false);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [searchString, setSearchString] = useState("");

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalProfiles, setTotalProfiles] = useState<number>(0);
  const [rows, setRows] = useState(16);

  const [fetchProfiles, { data, loading: queryLoading, error }] = useLazyQuery(
    GET_ALL_PROFILES,
    {
      onCompleted: (data) => {
        const { size, profiles: fetchedProfiles } = data.getAllProfiles;
        setRows(size);
        setPage((prevPage) => prevPage + 1);
        setProfiles(fetchedProfiles);
        setHasMoreProfiles(fetchProfiles.length <= size);
      },
    }
  );
  console.log(rows);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const debouncedSearch = debounce(() => {
      setProfiles([]);

      fetchProfiles({
        variables: {
          orderBy: {
            key: "is_verified",
            sort: "asc",
          },
          searchString,
        },
      });
    }, 500);

    debouncedSearch();
    return debouncedSearch.cancel;
  }, [searchString]);

  useEffect(() => {
    setLoading(queryLoading);
  }, [queryLoading]);

  const handleLoadMore = () => {
    fetchProfiles({
      variables: {
        orderBy: {
          key: "is_verified",
          sort: "asc",
        },
        rows,
        page,
      },
    });
  };
  useEffect(() => {
    if (data) {
      const { size, profiles: fetchedProfiles } = data.getAllProfiles;
      setTotalProfiles(size);
      setRows(size);
      setProfiles((prevProfiles) => [...prevProfiles, ...fetchedProfiles]);
      setPage((prevPage) => prevPage + 1);
      setHasMoreProfiles(fetchedProfiles.length <= size);
    }
  }, [data, totalProfiles]);
  const cardBackground = darkMode ? "#000000" : grey[200];

  return (
    <Box>
      <Grid
        container
        sx={{
          boxShadow: "none",
          maxWidth: "1300px",
          marginLeft: "auto",
          padding: "20px",
          marginRight: "auto",
          marginTop: "30px",
        }}>
        <Grid
          item
          xs={12}
          sx={{ display: `${isSmallScreen ? "relative" : "flex"}` }}
          padding={1}>
          <TextField
            value={searchString}
            fullWidth
            size="small"
            onChange={(e) => {
              setSearchString(e.target.value);
            }}
            label="Search"
            variant="outlined"
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
                padding: "7px 0px",
                margin: `${isSmallScreen ? "16px 10px" : "0px 10px"}`,
                borderRadius: "10px",
              }}
              onClick={handleOpen}>
              <PersonAddAlt1Icon sx={{ paddingRight: "10px" }} />
              Create Profile
            </Button>
          </Box>
          <CreateProfile open={open} handleClose={handleClose} />
        </Grid>
      </Grid>
      <Box>
        <InfiniteScroll
          dataLength={rows}
          next={handleLoadMore}
          hasMore={hasMoreProfiles}
          loader={<p></p>}
          endMessage={
            <Typography variant="body2" sx={{ textAlign: "center" }}>
              You have reached the end!
            </Typography>
          }>
          <Grid
            ref={targetRef}
            container
            sx={{
              boxShadow: "none",
              maxWidth: "1300px",
              marginLeft: "auto",
              padding: "20px",
              marginRight: "auto",
              marginTop: `${isSmallScreen ? "0px" : "50px"}`,
            }}></Grid>
        </InfiniteScroll>
      </Box>
    </Box>
  );
};

export default CardView;

const Item = styled(Box)(({ theme }) => ({
  textAlign: "center",

  maxWidth: 400,
}));
