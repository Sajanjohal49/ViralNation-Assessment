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
  const lastProfileRef = useRef(null);
  const [hasMoreProfiles, setHasMoreProfiles] = useState(true);

  const muiTheme = createTheme();
  const isSmallScreen = useMediaQuery(muiTheme.breakpoints.down("md"));

  const { darkMode } = useContext(DarkModeContext);
  const [open, setOpen] = useState(false);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [searchString, setSearchString] = useState("");

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(16);

  const [fetchProfiles, { data, loading: queryLoading, error }] = useLazyQuery(
    GET_ALL_PROFILES,
    {
      onCompleted: (data) => {
        const { size, profiles: fetchedProfiles } = data.getAllProfiles;
        setPage((prevPage) => prevPage + 1);
        setProfiles((prevProfiles) => [...prevProfiles, ...fetchedProfiles]);
        setHasMoreProfiles(fetchedProfiles.length >= rows);
      },
    }
  );

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const debouncedSearch = debounce(() => {
      setProfiles([]);
      setPage(1);

      fetchProfiles({
        variables: {
          orderBy: {
            key: "is_verified",
            sort: "desc",
          },
          rows,
          page,
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

  useEffect(() => {
    if (data) {
      const { size, profiles: fetchedProfiles } = data.getAllProfiles;
      setPage((prevPage) => prevPage + 1);
      setProfiles((prevProfiles) => [...prevProfiles, ...fetchedProfiles]);
      setHasMoreProfiles(fetchedProfiles.length >= rows);
    }
  }, [data]);

  const handleLoadMore = () => {
    fetchProfiles({
      variables: {
        orderBy: {
          key: "is_verified",
          sort: "asc",
        },
        rows,
        page,
        searchString,
      },
    });
  };
  //   if (queryLoading) return <p>Loading</p>; please implement this later
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
              {" "}
              <PersonAddAlt1Icon sx={{ paddingRight: "10px" }} />
              Create Profile
            </Button>
          </Box>
          <CreateProfile open={open} handleClose={handleClose} />
        </Grid>
      </Grid>
      <Box>
        <InfiniteScroll
          dataLength={profiles.length}
          next={handleLoadMore}
          hasMore={hasMoreProfiles}
          loader={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}>
              <CircularProgress />
            </div>
          }
          endMessage={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Typography
                variant="caption"
                sx={{ textAlig: "center", margin: " 40px auto" }}>
                No more profiles to load
              </Typography>
            </div>
          }>
          <Grid
            ref={lastProfileRef}
            container
            sx={{
              boxShadow: "none",
              maxWidth: "1300px",
              marginLeft: "auto",
              padding: "20px",
              marginRight: "auto",
              marginTop: `${isSmallScreen ? "0px" : "50px"}`,
            }}>
            {profiles.map((profile, index) => (
              <Grid
                item
                key={`${profile.id}-${index}`}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                zeroMinWidth
                padding={1}>
                <Card
                  sx={{
                    borderRadius: "10px",
                    padding: 1,

                    backgroundColor: cardBackground,
                    boxShadow: "none",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingBottom: 2,
                      }}>
                      <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
                        <Box>
                          <Item
                            sx={{
                              mx: "auto",
                            }}>
                            <Stack
                              spacing={2}
                              direction="row"
                              alignItems="center">
                              <Avatar
                                alt={profile.image_url}
                                src={profile.image_url}
                                sx={{ width: 56, height: 56 }}
                              />

                              <Typography
                                noWrap
                                sx={{
                                  color: grey[900],
                                  display: "flex",

                                  flexDirection: "column",
                                }}>
                                <Typography
                                  noWrap
                                  variant="subtitle2"
                                  sx={{
                                    color: grey[900],
                                    textAlign: "left",
                                  }}>
                                  {profile.first_name} {profile.last_name}
                                  <VerifiedIcon
                                    sx={{
                                      color: blue[500],
                                      width: 20,
                                      height: 20,
                                      verticalAlign: "middle",
                                    }}
                                  />
                                </Typography>
                                <Typography
                                  noWrap
                                  variant="caption"
                                  sx={{ textAlign: "left", color: grey[800] }}>
                                  {profile.email}
                                </Typography>
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  alignItems: "flex-end",
                                }}>
                                <Actions profileId={profile.id} />
                              </Box>
                            </Stack>
                          </Item>
                        </Box>
                      </Box>
                    </Box>

                    <CustomBox>
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: "0.7rem",
                          lineHeight: "14px",
                          color: grey[700],
                        }}>
                        {profile.description}
                      </Typography>
                    </CustomBox>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            {queryLoading && <CircularProgress sx={{ margin: " 40px auto" }} />}
          </Grid>
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
