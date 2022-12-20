import React from "react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "@mui/material";

const MenuButton = ({ title, textList, linkList }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  var tllist = [];
  for (let index = 0; index < textList.length; index++) {
    tllist.push({
      text: textList[index],
      link: linkList[index]
    })
  }
  return (
    <>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {title}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {tllist.map((i) => {
          console.log(i)
          return (
            <MenuItem onClick={handleClose} key={i.text}>
              <Link to={i.link} color={"inherit"}>{i.text}</Link>
            </MenuItem>
          )
        })}
      </Menu>
    </>
  )
}

export default MenuButton;