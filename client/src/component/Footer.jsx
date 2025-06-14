import React from "react";
import { Box, Typography, Link, Grid } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(90deg, #a18cd1 0%, #fbc2eb 100%)",
        color: "#fff",
       
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Shopy
          </Typography>
          <Typography variant="body2">
            Your one-stop shop for all your needs. Quality products, fast delivery, and great deals!
          </Typography>
        </Grid>
        <Grid item xs={12} md={2}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Quick Links
          </Typography>
          <Box>
            <Link href="/" color="inherit" underline="hover" display="block">Home</Link>
            <Link href="/products" color="inherit" underline="hover" display="block">Products</Link>
            <Link href="/login" color="inherit" underline="hover" display="block">Login</Link>
            <Link href="/sign-up" color="inherit" underline="hover" display="block">Sign Up</Link>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
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