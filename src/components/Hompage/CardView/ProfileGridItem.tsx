import styled from "@emotion/styled";
import { Avatar, Box, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import Actions from "./Actions";

import VerifiedIcon from "@mui/icons-material/Verified";
import { blue } from "@mui/material/colors";
type Profile = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  is_verified: boolean;
  image_url: string;
  description: string;
};
type ProfileGridItemProps = {
  profile: Profile;
};

const ProfileGridItem: React.FC<ProfileGridItemProps> = ({ profile }) => {
  return (
    <Grid
      item
      key={`${profile.id}`}
      xs={12}
      sm={6}
      md={4}
      lg={3}
      zeroMinWidth
      padding={1}>
      {/* ********Shrinkable******** */}
      <Paper
        sx={{
          borderRadius: "10px",
          padding: 3,
          minHeight: "154px",
          color: "text.primary",
          boxShadow: "none",
          overflow: "hidden",

          textOverflow: "ellipsis",
        }}>
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
                  alignItems="center"
                  justifyContent="space-between">
                  <Avatar
                    alt={profile.image_url}
                    src={profile.image_url}
                    sx={{ width: 56, height: 56 }}
                  />

                  <Typography
                    component="div"
                    noWrap //shrinkable
                    sx={{
                      display: "flex",

                      flexDirection: "column",
                    }}>
                    <Typography
                      noWrap //shrinkable
                      variant="subtitle2"
                      sx={{
                        textAlign: "left",
                      }}>
                      {profile.first_name} {profile.last_name}
                      <VerifiedIcon
                        sx={{
                          color: blue[500],
                          marginLeft: "5px",
                          width: 20,
                          height: 20,
                          verticalAlign: "middle",
                        }}
                      />
                    </Typography>
                    <Typography
                      noWrap //shrinkable
                      variant="caption"
                      sx={{
                        textAlign: "left",
                        color: "text.secondary",
                      }}>
                      {profile.email}
                    </Typography>
                  </Typography>

                  <Actions profileId={profile.id} />
                </Stack>
              </Item>
            </Box>
          </Box>
        </Box>

        <Box>
          <Typography
            variant="caption"
            sx={{
              fontSize: "0.7rem",
              lineHeight: "14px",
              color: "text.secondary",
            }}>
            {profile.description}
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
};

export default ProfileGridItem;
const Item = styled(Box)(({ theme }) => ({
  textAlign: "center",

  maxWidth: 400,
}));
