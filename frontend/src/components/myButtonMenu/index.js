import { IconButton, Menu, MenuItem } from "@mui/material"
import React, { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/authContext"

const MyButtonMenu = ((props) => {
  const authContext = useContext(AuthContext)
  const [avatarMenuOpen, setAvatarMenuOpen] = React.useState(null);
  const handleAvatarClick = (event) => {
    setAvatarMenuOpen(event.currentTarget);
  };

  const handleAvatarClose = (e) => {
    setAvatarMenuOpen(null);
  };
  return (
    <>
      <IconButton onClick={handleAvatarClick}>
        {props.children}
      </IconButton>
      <Menu
        anchorEl={avatarMenuOpen}
        // keepMounted
        open={Boolean(avatarMenuOpen)}
        onClose={handleAvatarClose}
      >
        {props.items.map((i) =>
          <MenuItem component={Link} to={`${i.link}`} onClick={i.title !== "Logout" ? handleAvatarClose : authContext.signOut}>{i.title}</MenuItem>
        )}
      </Menu>
    </>
  )
})

export default MyButtonMenu;