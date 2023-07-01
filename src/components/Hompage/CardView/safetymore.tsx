import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import { Card, CardContent, Grid, Input, Typography } from "@mui/material";
import { GET_ALL_PROFILES } from "../../queries/getAllProfiles";
import debounce from "lodash/debounce";

type Profile = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  is_verified: boolean;
  image_url: string;
  description: string;
};

const Test = () => {
  const [searchString, setSearchString] = useState("");
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [doneLoad, setDoneLoad] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 16;
  const containerRef = useRef<HTMLDivElement>(null);
  const loadingMoreRef = useRef(false);

  const { loading, error, data } = useQuery(GET_ALL_PROFILES, {
    variables: {
      page: currentPage,
      rows: pageSize,
      searchString: searchString,
    },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (data && data.getAllProfiles) {
      const newProfiles = data.getAllProfiles.profiles;
      console.log("Total Profiles: " + data.getAllProfiles.size);

      setProfiles((prevProfiles) => [...prevProfiles, ...newProfiles]);
      setDoneLoad((prevDoneLoad) => prevDoneLoad + newProfiles.length);
      loadingMoreRef.current = false;
    }
  }, [data]);

  const observer = useRef<IntersectionObserver | null>(null);

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !loadingMoreRef.current) {
      loadingMoreRef.current = true;
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

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
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        containerRef.current &&
        window.innerHeight + window.scrollY >=
          containerRef.current.offsetTop + containerRef.current.offsetHeight
      ) {
        loadingMoreRef.current = true;
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      loadingMoreRef.current = false;
    }
  }, [loading]);

  useEffect(() => {
    setProfiles([]);
    setDoneLoad(0);
    setCurrentPage(0);
    loadingMoreRef.current = false;
  }, [searchString]);

  const debouncedSearch = useRef(
    debounce((value: string) => {
      setSearchString(value);
    }, 500)
  ).current;

  const performSearch = (searchValue: string) => {};

  if (loading && !profiles.length) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <Input
        type="text"
        value={searchString}
        onChange={(e) => debouncedSearch(e.target.value)}
        placeholder="Search Profiles"
      />
      <div ref={containerRef}>
        <Grid container spacing={2}>
          {profiles.map((profile) => (
            <Grid item xs={4} key={profile.id}>
              <Card sx={{ width: "300px", height: "500px" }}>
                <CardContent>
                  <Typography>{profile.id}</Typography>
                  <Typography variant="h6">{profile.first_name}</Typography>
                  {/* Render other profile details */}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Test;
