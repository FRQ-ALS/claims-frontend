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

const pages = ["inventory", "auction", "notifications", "donate", "analytics"];
const settings = ["Profile", , "Logout"];

const ResponsiveAppBar = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (event, page) => {
    // console.log(event.currentTarget)
    // navigate('/'+event.currentTarget)
  };

  const handlePageSelection = (event, page) => {
    navigate("/"+page)

  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);

  };

  React.useEffect(() => {
    setLoggedIn(localStorage.getItem('loggedin'))  
  })

 

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <BoltIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
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
            INSURANCE CLAIMS
          </Typography>

          {loggedIn ? (
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu} justifyContent='center'>
                    <Typography textAlign="center" >{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            ""
          )}
          <BoltIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1}}
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
              color: "#FFFF00",
              textDecoration: "none",
            }}
          >
            ElectroSwap
          </Typography>
          {loggedIn ? (
            <Box sx={{ flexGrow: 3, display: { xs: 10, md: "flex" }}}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={event => handlePageSelection(event, page)}
                  sx={{ my: 2, color: blue[900], display: "block" }}
                  style={{
                    borderSpacing:100,
                    fontWeight:'bold',
                    backgroundColor:blue[900],
                    borderRadius:10,
                    // fontSize:18,
                    marginLeft:100,
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            
          )
          : (
            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            ></Box>
          )}

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
                    <Typography textAlign="center">{setting}</Typography>
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
                  LOGIN / SIGNUP
                </Button>
              </Tooltip>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
