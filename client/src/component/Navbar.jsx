import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { styled, alpha } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { SideContext } from "../context/SidebarContext";
import shopy from '../assets/shopy.png'; // Assuming you have a logo image
// Styled search bar
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar = () => {
  const {
    handleMobile,
    isSmallScreen
  } = useContext(SideContext);

  return (
    <AppBar position="static"  elevation={4} sx={{ background: "linear-gradient(90deg, #a18cd1 0%, #fbc2eb 100%)" }}>
      <Toolbar>
        {/* Sidebar Menu Icon */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleMobile}
          sx={{ mr: 2, display: { xs: "block", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Brand Logo */}
        <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
          <img
            src={shopy}
            alt="Brand Logo"
            style={{ width: 40, height: 40, borderRadius: "50%" }}
          />
          <Box sx={{ ml: 1, fontWeight: "bold", fontSize: "1.2rem", color: "#fff" }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>Shopy</Link>
          </Box>
        </Box>

        {/* Search Bar */}
        <Search sx={{ flexGrow: 1, maxWidth: 350, mx: 2 , }}
        className="hidden md:block" >
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Login Button */}
        <Button
          component={Link}
          to="/choose-profile"
          variant="outlined"
          color="inherit"
          sx={{
            mr: 2,
            borderColor: "#fff",
            color: "#fff",
            "&:hover": { borderColor: "#fff", background: alpha("#fff", 0.1) }
          }}
        >
          Login
        </Button>

        {/* Profile Button */}
        {/* <IconButton component={Link} to="/profile" color="inherit">
          <Avatar alt="Profile" src={shopy} />
        </IconButton> */}
        <IconButton component={Link} to="/add-to-cart" color="inherit">
          <AddShoppingCartIcon/>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;