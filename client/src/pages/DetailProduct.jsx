import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
  Rating,
  Divider,
  TextField,
  Card,
  CardContent,
  CardMedia,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  Avatar,
  LinearProgress,
  Breadcrumbs,
  Link,
  Snackbar,
  Alert,
  Badge,
  ButtonGroup,
  useMediaQuery,
  CircularProgress
} from '@mui/material';
import {
  FavoriteOutlined,
  Favorite,
  ShoppingCartOutlined,
  Share,
  ZoomIn,
  Add,
  Remove,
  LocalShipping,
  Security,
  Replay,
  Star,


} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../reduxToolkit/action';

// Sample detailed product data


const DetailProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const isSm = useMediaQuery('(min-width:600px)');


  // Load product data
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BASE_API_URI}/product-detail?id=${id}`)
      .then((res) => {
        setProduct(res.data);
        console.log('products detail data', res.data)
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
  }, [id]);

  const handleImageSelect = (index) => {
    setSelectedImage(index);
  };

  const handleColorSelect = (index) => {
    setSelectedColor(index);
  };

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, Math.min(prev + change, product?.stockCount || 1)));
  };

  const handleAddToCart = () => {
    dispatch(addToCart(id))
    setSnackbar({
      open: true,
      message: `${quantity} item(s) added to cart!`,
      severity: 'success'
    });
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    setSnackbar({
      open: true,
      message: isWishlisted ? 'Removed from wishlist' : 'Added to wishlist',
      severity: 'info'
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setSnackbar({
        open: true,
        message: 'Product link copied to clipboard',
        severity: 'info'
      });
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );

  if (loading) {
    return (
      <Container maxWidth='xl' className='h-screen'>
        <Box display="flex" justifyContent="center" alignItems="center" >
          <LinearProgress sx={{ width: '100%', top: '0px', color: 'purple' }} />
        </Box>
        <CircularProgress sx={{ width: '50px', height: '50px', marginTop: '30%', color: 'purple' }} />
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" textAlign="center">Product not found</Typography>
      </Container>
    );
  }

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}


      <Grid container spacing={4}>
        {/* Product Images */}
        <Grid item size={{ xl: 6, md: 6, sm: 12, xs: 12 }} xs={12} md={6} xl={6}>
          <Box>
            {/* Main Image */}
            <Box
              sx={{
                position: 'relative',
                mb: 2,
                borderRadius: 2,
                overflow: 'hidden',
                backgroundColor: '#f5f5f5'
              }}
            >
            
              <img
                src={product.images?.[selectedImage]}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                  cursor: 'zoom-in'
                }}
                onClick={() => setZoomOpen(true)}
              />

              {/* Zoom Icon */}
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' }
                }}
                onClick={() => setZoomOpen(true)}
              >
                <ZoomIn />
              </IconButton>

              {/* Discount Badge */}
              {discountPercentage > 0 && (
                <Chip
                  label={`-${discountPercentage}%`}
                  color="error"
                  sx={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    fontWeight: 'bold'
                  }}
                />
              )}
            </Box>

            {/* Thumbnail Images */}
            {!isSm ?
              <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto' }}>
                {product.images.map((image, index) => (
                  <Box
                    key={index}
                    onClick={() => handleImageSelect(index)}

                    sx={{
                      minWidth: 100,
                      height: 100,
                      borderRadius: 1,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: selectedImage === index ? '2px solid' : '2px solid transparent',
                      borderColor: selectedImage === index ? 'primary.main' : 'transparent',
                      '&:hover': { opacity: 0.8 }
                    }}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </Box>
                ))}
              </Box>
              :
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {product.images.map((image, index) => (
                  <Grid item key={index} size={{ xl: 4, md: 4 }}>
                    <Box
                      onClick={() => handleImageSelect(index)}
                      sx={{
                        width: '100%',
                        height: 150,

                        borderRadius: 2,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        border: selectedImage === index ? '2px solid' : '2px solid transparent',
                        borderColor: selectedImage === index ? 'primary.main' : 'transparent',
                        '&:hover': { opacity: 0.8 }
                      }}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            }




          </Box>
        </Grid>

        {/* Product Info */}
        <Grid item size={{ xl: 6, md: 6, sm: 12, xs: 12 }} xs={12} md={6} xl={6}>
          <Box className='text=-start' sx={{ padding: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1, }}>
            {/* Brand */}
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ fontSize: '1rem', letterSpacing: 1 }}
            >
              {product.brand}
            </Typography>

            {/* Product Name */}
            <Typography
              variant="h6"
              component="h6"
              className='text-start'
              sx={{ mb: 2, fontWeight: 500, lineHeight: 1.3 }}
            >
              {product.name}
            </Typography>

            {/* Rating and Reviews */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={product.rating} precision={0.1} readOnly />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({product.totalReviews} reviews)
              </Typography>
            </Box>

            {/* Price */}
            <Box sx={{ mb: 3 }} className='text-start'>
              <Box className='' sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Typography
                  variant="h4"
                  color="primary"
                  sx={{ fontWeight: 700 }}
                >
                  ${product.price}
                </Typography>
                {product.originalPrice > product.price && (
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ textDecoration: 'line-through' }}
                  >
                    ${product.originalPrice}
                  </Typography>
                )}
              </Box>
              {discountPercentage > 0 && (
                <Typography variant="body2" color="success.main" sx={{ fontWeight: 600 }}>
                  You save ${(product.originalPrice - product.price).toFixed(2)} ({discountPercentage}% off)
                </Typography>
              )}
            </Box>

            {/* Stock Status */}
            <Box sx={{ mb: 3 }} className='text-start'>
              <Typography
                variant="body2"
                color={product.inStock ? 'success.main' : 'error.main'}
                sx={{ fontWeight: 600, mb: 1 }}
              >
                {product.inStock ? `In Stock (${product.stockCount} available)` : 'Out of Stock'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                SKU: {product.sku}
              </Typography>
            </Box>

            {/* Color Selection */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                Color: {product.colors[selectedColor].name}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {(product.colors || []).map((color, index) => (
                  <Box
                    key={index}
                    onClick={() => color.available && handleColorSelect(index)}
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: color.value,
                      border: selectedColor === index ? '3px solid' : '2px solid',
                      borderColor: selectedColor === index ? 'primary.main' : '#ddd',
                      cursor: color.available ? 'pointer' : 'not-allowed',
                      opacity: color.available ? 1 : 0.5,
                      position: 'relative',
                      '&:hover': color.available ? { transform: 'scale(1.1)' } : {}
                    }}
                  >
                    {!color.available && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%) rotate(45deg)',
                          width: '2px',
                          height: '100%',
                          backgroundColor: 'error.main'
                        }}
                      />
                    )}
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Quantity Selection */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                Quantity
              </Typography>
              <ButtonGroup variant="outlined" sx={{ mb: 2 }}>
                <Button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                  <Remove />
                </Button>
                <Button disabled sx={{ minWidth: 60 }}>
                  {quantity}
                </Button>
                <Button onClick={() => handleQuantityChange(1)} disabled={quantity >= product.stockCount}>
                  <Add />
                </Button>
              </ButtonGroup>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Button
                  className='bg-yellow-300'
                  variant="contained"
                  size="large"

                  startIcon={<ShoppingCartOutlined />}
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  sx={{ flex: 1, py: 1.5, backgroundColor: '#fbc02d', color: '#fff', '&:hover': { backgroundColor: '#f9a825' } }}
                >
                  Add to Cart
                </Button>
                <IconButton
                  onClick={handleWishlistToggle}
                  color={isWishlisted ? 'error' : 'default'}

                >
                  {isWishlisted ? <Favorite /> : <FavoriteOutlined />}
                </IconButton>
                <IconButton
                  onClick={handleShare}

                >
                  <Share />
                </IconButton>
              </Box>

              <Button
                variant="outlined"
                size="large"
                fullWidth
                sx={{ py: 1.5 }}
              >
                Buy Now
              </Button>
            </Box>

            {/* Features */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocalShipping color="primary" />
                  <Typography variant="body2">Free Shipping</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Replay color="primary" />
                  <Typography variant="body2">30-Day Returns</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Security color="primary" />
                  <Typography variant="body2">2-Year Warranty</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Product Details Tabs */}
      <Box sx={{ mt: 6 }}>
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab label="Description" />

          <Tab label={`Reviews (${product.totalReviews})`} />
        </Tabs>

        {/* Description Tab */}
        <TabPanel value={tabValue} index={0}>
          <Typography variant="body1" className='text-black text-start' paragraph>
            {product.description}
          </Typography>
          <Typography variant="h6" className='text-black text-center' sx={{ mt: 3, mb: 2 }}>
            Key Features:
          </Typography>
          <List>
            {product.features.map((feature, index) => (
              <ListItem key={index} sx={{ py: 0.5 }}>
                <ListItemText className='text-black text-start'  primary={`• ${feature}`} />
              </ListItem>
            ))}
          </List>
        </TabPanel>


        {/* Reviews Tab */}
        <TabPanel value={tabValue} index={2}>
          {/* Rating Summary */}
          <Box sx={{ mb: 4, p: 3, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box textAlign="center">
                  <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                    {product.rating}
                  </Typography>
                  <Rating value={product.rating} precision={0.1} readOnly size="large" />
                  <Typography variant="body2" color="text.secondary">
                    Based on {product.totalReviews} reviews
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={8}>
                {[5, 4, 3, 2, 1].map((stars) => (
                  <Box key={stars} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" sx={{ minWidth: 20 }}>
                      {stars}
                    </Typography>
                    <Star fontSize="small" sx={{ mx: 0.5 }} />
                    <LinearProgress
                      variant="determinate"
                      value={stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 5 : stars === 2 ? 3 : 2}
                      sx={{ flex: 1, mx: 1, height: 8, borderRadius: 4 }}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ minWidth: 30 }}>
                      {stars === 5 ? '70%' : stars === 4 ? '20%' : stars === 3 ? '5%' : stars === 2 ? '3%' : '2%'}
                    </Typography>
                  </Box>
                ))}
              </Grid>
            </Grid>
          </Box>

          {/* Individual Reviews */}
          <Box>
            {(product.reviews || []).map((review) => (
              <Card key={review.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar>{review.user[0]}</Avatar>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {review.user}
                          {review.verified && (
                            <Chip label="Verified Purchase" size="small" color="success" sx={{ ml: 1 }} />
                          )}
                        </Typography>
                        <Rating value={review.rating} size="small" readOnly />
                      </Box>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {review.date}
                    </Typography>
                  </Box>

                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                    {review.title}
                  </Typography>

                  <Typography variant="body2" paragraph>
                    {review.comment}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button size="small" variant="outlined">
                      Helpful ({review.helpful})
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </TabPanel>
      </Box>

      {/* Related Products */}
      {/* <Box sx={{ mt: 6 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Related Products
        </Typography>
        <Grid container spacing={3}>
          {(product.relatedProducts || []).map((relatedProduct) => (
            <Grid item size={{ xl: 4, md: 4, sm: 6, xs: 12 }} key={relatedProduct.id}>
              <Card sx={{ cursor: 'pointer', width: '100%', '&:hover': { boxShadow: 4 } }}>
                <CardMedia
                  component="img"
                  height="200"

                  image={relatedProduct.image}
                  alt={relatedProduct.name}
                />
                <CardContent>
                  <Typography variant="caption" color="text.secondary">
                    {relatedProduct.brand}
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {relatedProduct.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h6" color="primary">
                      ${relatedProduct.price}
                    </Typography>
                    <Rating value={relatedProduct.rating} size="small" readOnly />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box> */}

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default DetailProduct;
