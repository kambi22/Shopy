import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  TextField,
  Paper,
  Snackbar,
  Alert
} from '@mui/material';
import { ArrowForward, Email } from '@mui/icons-material';
import HeroSection from '../component/HeroSection';
import ProductCard from '../component/ProductCard';
import { heroSlides, sampleProducts } from '../data/sampleData';
import { useNavigate } from 'react-router';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  // Simulate loading products
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setProducts(sampleProducts);
      setFeaturedProducts(sampleProducts.filter(p => p.isFeatured));
      setNewProducts(sampleProducts.filter(p => p.isNew));
      setLoading(false);
    };

    loadProducts();
  }, []);

  const handleAddToCart = (product) => {
    setSnackbar({
      open: true,
      message: `${product.name} added to cart!`,
      severity: 'success'
    });
    console.log('Added to cart:', product);
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
    <Box>
      {/* Hero Section */}
      <HeroSection slides={heroSlides} />




      {/* Featured Products Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
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
              <Grid size={{ xl: 4, md: 4, sm: 6, xs: 12 }} key={index}>
                <Box
                  sx={{
                    width: '100%',
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
              <Grid item size={{xl:4, md: 6, sm:6, xs:12}} key={product.id}>
                <Box
                  className="bg-amber-600"
                  role="button"
                  tabIndex={0}
                  sx={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/detail-product/${product.id}`)}
                >
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
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

      {/* New Arrivals Section */}
      <Box sx={{ backgroundColor: '#f8f9fa', py: 6 }}>
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
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
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

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
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
