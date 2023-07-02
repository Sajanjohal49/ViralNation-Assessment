import styled from "@emotion/styled";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import Actions from "./Actions";

import VerifiedIcon from "@mui/icons-material/Verified";
import { blue, grey } from "@mui/material/colors";
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
      <Card
        sx={{
          borderRadius: "10px",
          padding: 1,

          backgroundColor: grey[200],
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
                  <Stack spacing={2} direction="row" alignItems="center">
                    <Avatar
                      alt={profile.image_url}
                      src={profile.image_url}
                      sx={{ width: 56, height: 56 }}
                    />

                    <Typography
                      component="div"
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
                        sx={{
                          textAlign: "left",
                          color: grey[800],
                        }}>
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

          <Box>
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.7rem",
                lineHeight: "14px",
                color: grey[700],
              }}>
              {profile.description}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProfileGridItem;
const Item = styled(Box)(({ theme }) => ({
  textAlign: "center",

  maxWidth: 400,
}));
