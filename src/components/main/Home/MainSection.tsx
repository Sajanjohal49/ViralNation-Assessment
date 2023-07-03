import React, { useEffect, useRef, useState } from "react";
import { useLazyQuery } from "@apollo/client";

import { Box, CircularProgress, Grid } from "@mui/material";
import { GET_ALL_PROFILES } from "../../queries/getAllProfiles";
import debounce from "lodash/debounce";

import ProfileGridItem from "./ProfileGridItem";

import SearchAndCreateProfile from "./SearchAndCreateProfile";
import InfiniteScroll from "react-infinite-scroll-component";

type Profile = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  is_verified: boolean;
  image_url: string;
  description: string;
};

const MainSection = () => {
  const [searchString, setSearchString] = useState("");
  const [profiles, setProfiles] = useState<Profile[]>([]);

  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalProfiles, setTotalProfiles] = useState(0);

  const [open, setOpen] = useState(false);
  const pageSize = 16;
  const containerRef = useRef<HTMLDivElement>(null);

  const [hasMoreProfiles, setHasMoreProfiles] = useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [getAllProfiles, { loading, error, data }] = useLazyQuery(
    GET_ALL_PROFILES,
    {
      fetchPolicy: "network-only",
    }
  );

  useEffect(() => {
    if (data && data.getAllProfiles) {
      const newProfiles = data.getAllProfiles.profiles;
      console.log("Total Profiles: " + data.getAllProfiles.size);
      setTotalProfiles(data.getAllProfiles.size);
      setProfiles((prevProfiles) => [...prevProfiles, ...newProfiles]);
    }
  }, [data, searchString]);

  const observer = useRef<IntersectionObserver | null>(null);

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const isIntersecting = entries[0].isIntersecting;

    if (isIntersecting && hasMoreProfiles) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    setProfiles([]);
    setCurrentPage(0);
    setHasMoreProfiles(true);
    getAllProfiles({
      variables: {
        page: 0,
        rows: pageSize,
        searchString: searchString,
      },
    });
  }, [searchString, getAllProfiles]);

  useEffect(() => {
    observer.current = new IntersectionObserver(handleObserver, {
      root: null,
      threshold: 0.5,
    });

    if (containerRef.current) {
      observer.current.observe(containerRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  });

  useEffect(() => {
    const handleScroll = () => {
      if (
        containerRef.current &&
        window.innerHeight + window.scrollY >=
          containerRef.current.offsetTop + containerRef.current.offsetHeight &&
        !loading &&
        profiles.length < totalProfiles
      ) {
        if (!hasMoreProfiles) {
          window.removeEventListener("scroll", handleScroll);
          return; // Stop making queries if there are no more profiles
        }
        // setCurrentPage((prevPage) => prevPage + 1);

        getAllProfiles({
          variables: {
            page: currentPage,
            rows: pageSize,
            searchString: searchString,
          },
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [
    currentPage,
    pageSize,
    getAllProfiles,
    searchString,
    hasMoreProfiles,
    loading,
    profiles.length,
    totalProfiles,
  ]);
  useEffect(() => {
    getAllProfiles({
      variables: {
        page: currentPage,
        rows: pageSize,

        searchString: searchString,
      },
    });
  }, [currentPage, pageSize, getAllProfiles, searchString]);

  const debouncedSearch = useRef(
    debounce((value: string) => {
      setSearchString(value);
    }, 700)
  ).current;

  const loadMoreProfiles = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedSearch(value);

    // Set the flag to reload the page if input is empty
  };

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <Box sx={{ maxWidth: "1300px", margin: " auto" }}>
      <SearchAndCreateProfile
        searchInput={searchInput}
        handleInputChange={handleInputChange}
        handleOpen={handleOpen}
        open={open}
        handleClose={handleClose}
      />
      {loading && !profiles.length ? (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100px" }} // Adjust the height as needed
        >
          <CircularProgress color="secondary" />
        </Grid>
      ) : (
        <InfiniteScroll
          dataLength={profiles.length}
          next={loadMoreProfiles}
          hasMore={hasMoreProfiles}
          loader={<p></p>}>
          <Grid
            container
            sx={{
              boxShadow: "none",
            }}>
            {profiles.map((profile) => (
              <ProfileGridItem key={profile.id} profile={profile} />
            ))}
          </Grid>
        </InfiniteScroll>
      )}
    </Box>
  );
};

export default MainSection;
