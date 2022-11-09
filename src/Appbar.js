import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import BoltIcon from "@mui/icons-material/Bolt";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import { ElevenMpTwoTone } from "@mui/icons-material";
import blue from "@material-ui/core/colors/blue";
import { Paper } from "@mui/material";
import CarCrashIcon from '@mui/icons-material/CarCrash';
import { useState } from "react";
import { useEffect } from "react";

const settings = ["Profile", "Dashboard", "Logout"];

const Appbar = () => {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem("loggedIn"));
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (event, page) => {
  };

  const handleMenuSelection = (event, item) => {

    if(item=="Logout") {
      localStorage.setItem("jwt", "")
      sessionStorage.setItem("loggedIn", false)
      setLoggedIn(false)
      navigate("/")
    }

    if(item=="Dashboard") {
    navigate("/dashboard")
    }

    if(item=="Profile") {
      navigate("/profile")
    }

    }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);

  };


  function updateLogInStatus(status) {
    this.setLoggedIn(status)
  }

  

  


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CarCrashIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            INSURANCE
          </Typography>

         
          <CarCrashIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1}}
           style={{fill: "yellow"}} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "white",
              textDecoration: "none",
            }}
          >
            INSRUANCE
          </Typography>
          {/* {loggedIn ? (
            <Box sx={{ flexGrow: 3, display: { xs: 10, md: "flex" }}}>
            </Box>
            
          )
          : (
            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            ></Box>
          )} */}

          {loggedIn ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {/* Fetch Avatar and Name from server */}
                  <Avatar
                    alt="lllemy Sharp"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Button sx={{fontWeight:'bold'}} onClick={event=> handleMenuSelection(event, setting)} textAlign="center">{setting}</Button>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }} display="flex">
              <Tooltip title="Log In">
                <Button
                  color="inherit"
                  onClick={() => navigate("/login")}
                  sx={{ p: 0 }}
                >
                  <LoginIcon />
                </Button>
              </Tooltip>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Appbar;
