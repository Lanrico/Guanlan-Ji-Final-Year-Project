import React from "react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link, ThemeProvider, useTheme } from "@mui/material";
import { styled, alpha, createTheme } from '@mui/material/styles';
import { changeElementColor } from "../../util";

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.grey[300], 0.5),
  ':hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  
  ':hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
}));

const MenuButton = ({ title, textList, linkList }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const buttonId = "menu-button-" + title;
  const theme = useTheme();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    let button = document.getElementById(buttonId);
    button.style.backgroundColor = theme.palette.primary.main;
    button.style.color = theme.palette.common.black;
  };

  const handleClose = () => {
    setAnchorEl(null);
    let button = document.getElementById(buttonId);
    button.style.backgroundColor = alpha(theme.palette.grey[300], 0.5);
    button.style.color = "gray";
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
      <StyledButton
        id={buttonId}
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      // onMouseEnter={changeElementColor(buttonId, theme.palette.common.black, theme.palette.primary.main)}
      // style={{this:hover: }}
      >
        {title}
      </StyledButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {tllist.map((i) => {
          return (
            <StyledMenuItem onClick={handleClose} key={i.text}>
              <Link underline="none" to={i.link} color={"inherit"}>{i.text}</Link>
            </StyledMenuItem>
          )
        })}
      </Menu>
    </>
  )
}

export default MenuButton;