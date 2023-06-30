import React, { useEffect, useRef, useState, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { GET_ALL_PROFILES } from "../../queries/getAllProfiles";

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
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [doneLoad, setDoneLoad] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 17;
  const containerRef = useRef<HTMLDivElement>(null);
  const loadingMoreRef = useRef(false);
  const [totalProfiles, setTotalProfiles] = useState<number>(0);

  const { loading, error, data } = useQuery(GET_ALL_PROFILES, {
    variables: {
      page: currentPage,
      rows: pageSize,
    },
  });

  useEffect(() => {
    if (data && data.getAllProfiles) {
      const newProfiles = data.getAllProfiles.profiles;

      setProfiles((prevProfiles) => [...prevProfiles, ...newProfiles]);
      setTotalProfiles(data.getAllProfiles.total);
      setDoneLoad((prevDoneLoad) => prevDoneLoad + newProfiles.length);
      loadingMoreRef.current = false;
    }
  }, [data]);
  console.log(doneLoad);

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
    // Reset loadingMoreRef when loading changes to false
    if (!loading) {
      loadingMoreRef.current = false;
    }
  }, [loading]);

  const filteredProfiles = useMemo(() => {
    const uniqueProfiles = new Map<string, Profile>();
    profiles.forEach((profile) => {
      uniqueProfiles.set(profile.id, profile);
    });

    return Array.from(uniqueProfiles.values());
  }, [profiles]);

  if (loading && !profiles.length) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const renderMoreProfiles = filteredProfiles.length !== doneLoad;

  return (
    <div ref={containerRef}>
      <Grid container spacing={2}>
        {filteredProfiles.map((profile, index) => (
          <Grid item xs={12} key={profile.id}>
            <Card>
              <CardContent>
                <Typography>{profile.id}</Typography>
                <Typography variant="h6">{profile.first_name}</Typography>
                {/* Render other profile details */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {renderMoreProfiles && <p>Loading more profiles...</p>}
    </div>
  );
};

export default Test;
