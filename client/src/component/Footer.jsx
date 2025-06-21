import React from "react";
import { Box, Typography, Grid, Divider } from "@mui/material";
import { Link } from "react-router";
import shopy from "../assets/shopy.png"; // Replace with your logo path
const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(90deg, #a18cd1 0%, #fbc2eb 100%)",
        color: "#fff",
        padding: 4,
        position: "relative",
        bottom: 0,
        width: "100%",
      }}
    >
      <style>
        {`
          .footer-link {
            position: relative;
            color: white;
            text-decoration: none;
            display: inline-block;
            transition: color 0.5s;
          }
          .footer-link::after {
            content: '';
            position: absolute;
            left: 30%;
            right:30%;
            bottom: -3px;
            width: 0;
            height: 3px;
            background-color: white;
            margin-top:5px;
            transition: width 0.5s cubic-bezier(0.4,0,0.2,1);
          }
          .footer-link:hover::after {
            width: 40%;
            margin:auto
          }
        `}
      </style>
      <Grid container spacing={4} justifyContent="center">
        <Grid item size={{ xs: 12, sm: 12, md: 4 , xl:4}} className="text-center">
          <Box alignItems="center" mb={2}>
            <img
              className="mx-auto hover:rotate-12 transition-transform duration-500 cursor-pointer"
              src={shopy}
              alt="Shopy Logo"
              style={{ width: "100px", height: "auto", marginBottom: "16px" }}
            />
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Shopy
            </Typography>
            <Typography variant="body2">
              Your one-stop shop for all your needs. Quality products, fast delivery, and great deals!
            </Typography>
          </Box>
        </Grid>
        <Divider className=' bg-white' orientation="vertical" flexItem />
        <Grid item size={{ xs: 12, sm: 12, md: 3 , xl:3}}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Quick Links
          </Typography>
          <Box className='text-' sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/products" className="footer-link">Products</Link>
            <Link to="/about" className="footer-link">About</Link>
            <Link to="/login" className="footer-link">Login</Link>
            <Link to="/signup" className="footer-link">Sign Up</Link>
          </Box>
        </Grid>
        <Divider className=' bg-white' orientation="vertical" flexItem />
        <Grid item size={{ xs: 12, sm: 12, md: 3 , xl:3}}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body2">Email: support@shopy.com</Typography>
          <Typography variant="body2">Phone: +1 234 567 890</Typography>
        </Grid>
      </Grid>
      <Box textAlign="center" mt={4} fontSize="0.9rem" opacity={0.8}>
        © {new Date().getFullYear()} Shopy. All rights reserved.
      </Box>
    </Box>
  );
};

export default Footer;