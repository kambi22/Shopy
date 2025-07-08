import React, { useState, useEffect, use } from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  TextField,
  Paper,
  Snackbar,
  Alert,
  IconButton
} from '@mui/material';
import { ArrowForward, Category, CategoryOutlined, Email } from '@mui/icons-material';
import HeroSection from '../component/HeroSection';
import ProductCard from '../component/ProductCard';
import { heroSlides, sampleProducts } from '../data/sampleData';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import axios from 'axios';
import { addToCart } from '../reduxToolkit/action';
import { useDispatch } from 'react-redux';

const HomePage = () => {

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();



  // Parse the query string
  const queryParams = new URLSearchParams(location.search);


  const category = queryParams.get("category");
  console.log('category name: ', category)

  const search = queryParams.get("search");
  console.log('search name: ', search)

    const handleSearchValue = async () => {
      setLoading(true);
      try {
        const resp = await axios.get(`${import.meta.env.VITE_BASE_API_URI}/search?q=${search}`);
        // If your API returns { products: [...] }
        const products = Array.isArray(resp.data)
          ? resp.data
          : Array.isArray(resp.data.products)
            ? resp.data.products
            : [];
        if (products.length === 0) {
          setSnackbar({
            open: true,
            message: "Searched item not found",
            severity: "warning",
          });
          // Fetch all products and set as featured
          await fetchProducts();
        } else {
          setFeaturedProducts(products);
        }
        setLoading(false);
        console.log("searched value:", products);
      } catch (error) {
        setLoading(false);
        setSnackbar({
          open: true,
          message: "Failed to load search products.",
          severity: "error",
        });
      }
    };




  // Simulate loading products
  // ...existing code...
  // Fetch all products from backend and set state
  const fetchProducts = async () => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BASE_API_URI}/all-products`)
      .then((res) => {

        console.log("all products", res.data)
        // Optionally, filter featured and new products here
        setFeaturedProducts(res.data.slice(0, 4)); // Example: first 4 as featured
        setNewProducts(res.data.slice(-4)); // Example: last 4 as new arrivals
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setSnackbar({
          open: true,
          message: "Failed to load products.",
          severity: "error",
        });
      });
  }


  const fetchCategoryProducts = async () => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BASE_API_URI}/product-category/${category}`)
      .then((res) => {

        console.log('category products are:', res.data)
        // Optionally, filter featured and new products here
        setFeaturedProducts(res.data); // category products

        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setSnackbar({
          open: true,
          message: "Failed to load category products.",
          severity: "error",
        });
      });
  }

  useEffect(() => {
    if (search) {
      handleSearchValue()
      
    }else if(category){
      fetchCategoryProducts()
      
    }else{
    fetchProducts()

    }
  }, [search, category]);




  
  // ...existing code...

   const handleAddToCart = (id) => {
      dispatch(addToCart(id))
      setSnackbar({
        open: true,
        message: `${quantity} item(s) added to cart!`,
        severity: 'success'
      });
    };

  const handleAddToWishlist = (product) => {
    setSnackbar({
      open: true,
      message: `${product.name} added to wishlist!`,
      severity: 'info'
    });
    console.log('Added to wishlist:', product);
  };

  const handleQuickView = (product) => {
    console.log('Quick view:', product);
    // Implement quick view modal here
  };



  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSnackbar({
        open: true,
        message: 'Successfully subscribed to newsletter!',
        severity: 'success'
      });
      setEmail('');
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box className=''>
      {/* Hero Section */}
      <HeroSection slides={heroSlides} />




      {/* Featured Products Section */}
      <Container maxWidth="lg" className='' >
        <Box textAlign="center" sx={{ color: 'black' }} mb={4}>
          <Typography
            className='text-black'
            variant="h3"
            component="h2"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 600,
              color: 'black',
              mb: 2
            }}
          >
            Featured Products
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            Discover our handpicked selection of premium products
          </Typography>
        </Box>

        {loading ? (
          <Grid spacing={3}>
            {[...Array(4)].map((_, index) => (
              <Grid size={{ xl: 4, md: 6, sm: 6, xs: 12 }} key={index}>
                <Box
                  sx={{

                    height: 400,
                    backgroundColor: '#f5f5f5',
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography color="text.secondary">Loading...</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={3}>
            {featuredProducts.map((product) => (
              <Grid item size={{ xl: 4, md: 6, sm: 6, xs: 12 }} key={product._id}>
               
                <Box
                  className=""
                  role="button"
                  tabIndex={0}
                  sx={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/detail-product/${product._id}`)}
      
                >

                  <ProductCard
                    product={product}
                    onAddToCart={()=>handleAddToCart(product._id)}
                    onAddToWishlist={handleAddToWishlist}
                    onQuickView={handleQuickView}
                  />
                </Box>

              </Grid>
            ))}
          </Grid>
        )}

        <Box textAlign="center" mt={4}>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
          >
            View All Products
          </Button>
        </Box>
      </Container>
      <div className="mt-5 fill-gray-50 bg-white " >
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-gray-50"></path>
        </svg>

        {/* New Arrivals Section */}
        <Box className='bg-white' sx={{ py: 6 }}>
          <Container maxWidth="lg">
            <Box textAlign="center" mb={4}>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  fontWeight: 600,
                  mb: 2
                }}
              >
                New Arrivals
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ maxWidth: 600, mx: 'auto' }}
              >
                Check out the latest additions to our collection
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {newProducts.map((product) => (
                <Grid item size={{ xl: 4, md: 6, sm: 6, xs: 12 }} key={product._id}>
                  <ProductCard
                    product={product}
                    onAddToCart={()=>handleAddToCart(product._id)}
                    onAddToWishlist={handleAddToWishlist}
                    onQuickView={handleQuickView}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Newsletter Section */}
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              textAlign: 'center',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white'
            }}
          >
            <Typography
              variant="h4"
              component="h2"
              sx={{ mb: 2, fontWeight: 600 }}
            >
              Stay Updated
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 3, opacity: 0.9 }}
            >
              Subscribe to our newsletter and get the latest deals and updates
            </Typography>

            <Box
              component="form"
              onSubmit={handleNewsletterSubmit}
              sx={{
                display: 'flex',
                gap: 2,
                maxWidth: 400,
                mx: 'auto',
                flexDirection: { xs: 'column', sm: 'row' }
              }}
            >
              <TextField
                fullWidth
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white',
                    '& fieldset': {
                      borderColor: 'transparent'
                    }
                  }
                }}
                InputProps={{
                  startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />
                }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.3)'
                  },
                  minWidth: { xs: 'auto', sm: 120 }
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Paper>
        </Container>
      </div>
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default HomePage;
