import React, { useContext, useEffect, useState } from "react";
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
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Profile from "../pages/Profile";
import { getAuth } from "firebase/auth";
import app from "../firebaseConfig";
import { useNavigate, useLocation } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { SearchRounded } from "@mui/icons-material";
import { Badge } from "@mui/material";
 import { useSelector } from 'react-redux';
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  textAlign: 'start',
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

// Example categories/subcategories data
const categoriesData = [
  { category: "Electronics", subcategories: ["Mobile", 'Headphones', 'Smartphones', 'Laptops', 'Tablets', 'Cameras'] },
  { category: "Home", subcategories: ['Furniture', 'Decor', 'Kitchen', 'Garden'] },
  { category: "Sports", subcategories: ['Fitness', 'Outdoor', 'Team Sports', 'Water Sports'] },
  { category: "Beauty", subcategories: ['Skincare', 'Makeup', 'Hair Care', 'Fragrance'] },
  { category: "Books", subcategories: ['Fiction', 'Non-Fiction', 'Educational', 'Comics'] },
  { category: "Clothing", subcategories: ['Men', 'Women', 'Kids', 'Accessories'] },
  { category: "Automotive", subcategories: ['Parts', 'Accessories', 'Tools', 'Care'] },
  // ...add more as needed
]


const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null); // Initialize as null
  const auth = getAuth(app);
  const [anchorEl, setAnchorEl] = useState(null);
  // ...existing state and hooks...
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate()
   
  const cartItems = useSelector(state => state.cart.cart);


  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    // Filter categories and subcategories for suggestions
    const lowerValue = value.toLowerCase();
    const matched = [];
    categoriesData.forEach(cat => {
      if (cat.category.toLowerCase().includes(lowerValue)) {
        matched.push(cat.category);
      }
      cat.subcategories.forEach(sub => {
        if (sub.toLowerCase().includes(lowerValue)) {
          matched.push(sub);
        }
      });
    });
    setSuggestions(matched.slice(0, 6)); // Limit to 6 suggestions
    setShowSuggestions(matched.length > 0);
  };


  // Handle Enter key or search icon click
  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (searchValue.trim()) {
        navigate(`/?search=${encodeURIComponent(searchValue.trim())}`);
        setShowSuggestions(false);
      }
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchValue(suggestion);
    navigate(`/?search=${encodeURIComponent(suggestion)}`);
    setShowSuggestions(false);
  };

  // ...rest of Navbar...

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      // console.log("User data:", user); // Debugging line
    });
    return () => unsubscribe(); // Cleanup on unmount
  }, [auth]);

  const {
    handleMobile,
    isSmallScreen
  } = useContext(SideContext);

  return (

    <AppBar position="static" elevation={4} sx={{
      background: {
        xs: "linear-gradient(180deg, #a18cd1 0%,  #fbc2eb 100%)",
        sm: "linear-gradient(180deg, #a18cd1 0%,  #fbc2eb 100%)",
        md: "linear-gradient(90deg, #fbc2eb 0%, #a18cd1 100%)"
      }
    }}>
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
            className="hover:rotate-12 transition-transform duration-500 cursor-pointer"
            src={shopy}
            alt="Brand Logo"
            style={{ width: 40, height: 40, borderRadius: "50%" }}
          />
          <Box sx={{ ml: 1, fontWeight: "bold", fontSize: "1.2rem", color: "#fff" }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>Shopy</Link>
          </Box>
        </Box>

        {/* Search Bar */}
        <Search sx={{ flexGrow: 1, maxWidth: 350, position: "relative" }} className="hidden md:block">
          <SearchIconWrapper onClick={handleSearchSubmit} style={{ cursor: "pointer" }}>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            value={searchValue}
            onChange={handleSearchChange}
            onKeyDown={handleSearchSubmit}
            onFocus={() => setShowSuggestions(suggestions.length > 0)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 100)} // Delay to allow click
          />
          {showSuggestions && (
            <Paper
              className="search-scroll"
              sx={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                zIndex: 10,
                maxHeight: 240,
                overflowY: "auto",
                borderRadius: '8px',
                marginTop: '2px'
              }}
            >
              <List >
                {suggestions.map((suggestion, idx) => (
                  <ListItem className="hover:rounded-lg"
                    button
                    key={idx}
                    onMouseDown={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </Search>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Login/Profile Button */}
        {!currentUser && (
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
        )}

        <IconButton component={Link} to="/add-to-cart" color="inherit">
          <Badge badgeContent={cartItems.length} color='info'> {/* Use badgeContent prop for the number */}
            <AddShoppingCartIcon />
          </Badge>
        </IconButton>
        
        {currentUser && (
          // Profile Button and Dropdown
          <div>
            <IconButton size='small' className="" onClick={handleClick} color="inherit">
              {currentUser.displayName ? (
                <Avatar sx={{ height: '30px', width: '30px' }} alt="Profile">{currentUser.displayName[0]}</Avatar>
              ) : (
                <Avatar sx={{ height: '30px', width: '30px' }} alt="Profile">U</Avatar>
              )}
            </IconButton>
            {/* Profile Dropdown */}
            <Profile
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              handleClose={handleClose}
              currentUser={currentUser}
            />
          </div>
        )}

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;