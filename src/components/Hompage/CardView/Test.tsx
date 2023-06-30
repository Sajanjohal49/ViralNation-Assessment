import React, { useEffect, useRef, useState } from "react";
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
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 17;
  const containerRef = useRef<HTMLDivElement>(null);
  const loadingMoreRef = useRef(false);
  const hasMoreRef = useRef(true); // Flag to check if there are more profiles to load

  const { loading, error, data, fetchMore } = useQuery(GET_ALL_PROFILES, {
    variables: {
      page: currentPage,
      rows: pageSize,
    },
  });

  useEffect(() => {
    if (data && data.getAllProfiles) {
      const newProfiles = data.getAllProfiles.profiles;
      setProfiles((prevProfiles) => [...prevProfiles, ...newProfiles]);
      loadingMoreRef.current = false;

      if (newProfiles.length < pageSize) {
        // If fetched profiles count is less than pageSize, it means no more profiles to load
        hasMoreRef.current = false;
      }
    }
  }, [data]);

  const observer = useRef<IntersectionObserver | null>(null);

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (
      target.isIntersecting &&
      !loadingMoreRef.current &&
      hasMoreRef.current
    ) {
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
        if (!loadingMoreRef.current && hasMoreRef.current) {
          loadingMoreRef.current = true;
          setCurrentPage((prevPage) => prevPage + 1);
        }
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

  const fetchMoreProfiles = () => {
    fetchMore({
      variables: {
        page: currentPage,
        rows: pageSize,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        const newProfiles = fetchMoreResult.getAllProfiles.profiles;
        return {
          getAllProfiles: {
            ...fetchMoreResult.getAllProfiles,
            profiles: [...prev.getAllProfiles.profiles, ...newProfiles],
          },
        };
      },
    });
  };

  useEffect(() => {
    if (hasMoreRef.current) {
      fetchMoreProfiles();
    }
  }, [currentPage]);

  if (loading && !profiles.length) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div ref={containerRef}>
      <Grid container spacing={2}>
        {profiles.map((profile, index) => (
          <Grid item xs={3} key={profile.id}>
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
      {loading && profiles.length > 0 && <p>Loading more profiles...</p>}
      {!loading && !hasMoreRef.current && <p>No more profiles to load</p>}
    </div>
  );
};

export default Test;
