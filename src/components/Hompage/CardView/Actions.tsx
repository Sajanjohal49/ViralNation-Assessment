import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { profile } from "console";
import { gql, useLazyQuery } from "@apollo/client";
import EditProfile from "../EditProfile/EditProfile";
import DeleteProfile from "../DeleteProfile/DeleteProfile";
import { Box } from "@mui/material";

type Profile = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  is_verified: boolean;
  image_url: string;
  description: string;
};

interface IActionsProps {
  profileId: string;
}

const Actions: React.FunctionComponent<IActionsProps> = ({ profileId }) => {
  const [openEditModal, setOpenEditModal] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [fetchedProfile, setFetchedProfile] = React.useState<Profile | null>(
    null
  );

  const [selectedProfileId, setSelectedProfileId] = React.useState<string>("");
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleEdit = (profileId: string) => {
    setSelectedProfileId(profileId);
    setOpenEditModal(true);
    console.log(profileId);
  };
  const handleDelete = (profileId: string) => {
    setSelectedProfileId(profileId);
    setOpenDeleteModal(true);
    console.log(profileId);
  };

  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={openMenu ? "long-menu" : undefined}
        aria-expanded={openMenu ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}>
        <MenuItem
          sx={{ fontSize: "14px" }}
          onClick={() => {
            handleEdit(profileId);
          }}>
          Edit
        </MenuItem>
        <MenuItem
          sx={{ fontSize: "14px" }}
          onClick={() => {
            handleDelete(profileId);
          }}>
          Delete profile
        </MenuItem>
      </Menu>

      <EditProfile
        selectedProfileId={selectedProfileId}
        open={openEditModal}
        handleClose={() => setOpenEditModal(false)}
      />
      <DeleteProfile
        selectedProfileId={selectedProfileId}
        open={openDeleteModal}
        handleClose={() => setOpenDeleteModal(false)}
      />
    </>
  );
};

export default Actions;
