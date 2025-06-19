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

// Sample detailed product data
const sampleDetailedProduct = {
  id: 1,
  name: "Premium Wireless Bluetooth Headphones with Active Noise Cancellation",
  brand: "TechSound Pro",
  price: 199.99,
  originalPrice: 299.99,
  discount: 33,
  images: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=600&fit=crop"
  ],
  rating: 4.6,
  totalReviews: 1247,
  category: "Electronics",
  subcategory: "Audio",
  inStock: true,
  stockCount: 23,
  sku: "TSP-WBH-001",
  description: "Experience premium audio quality with our flagship wireless headphones featuring advanced active noise cancellation technology. Perfect for music lovers, professionals, and travelers who demand the best in audio performance.",
  features: [
    "Active Noise Cancellation (ANC) technology",
    "40-hour battery life with ANC off",
    "Quick charge: 10 minutes = 3 hours playback",
    "Premium leather ear cushions",
    "Bluetooth 5.2 connectivity",
    "Built-in microphone for calls",
    "Foldable design for portability",
    "Compatible with voice assistants"
  ],
  specifications: {
    "Driver Size": "40mm",
    "Frequency Response": "20Hz - 20kHz",
    "Impedance": "32 Ohms",
    "Battery Life": "40 hours (ANC off), 30 hours (ANC on)",
    "Charging Time": "2 hours",
    "Weight": "250g",
    "Connectivity": "Bluetooth 5.2, 3.5mm jack",
    "Warranty": "2 years"
  },
  colors: [
    { name: "Midnight Black", value: "#000000", available: true },
    { name: "Silver Gray", value: "#C0C0C0", available: true },
    { name: "Rose Gold", value: "#E8B4B8", available: false }
  ],
  sizes: ["One Size"],
  reviews: [
    {
      id: 1,
      user: "John D.",
      rating: 5,
      date: "2024-01-15",
      title: "Excellent sound quality!",
      comment: "These headphones exceeded my expectations. The noise cancellation is fantastic and the battery life is amazing.",
      verified: true,
      helpful: 23
    },
    {
      id: 2,
      user: "Sarah M.",
      rating: 4,
      date: "2024-01-10",
      title: "Great for travel",
      comment: "Perfect for long flights. Comfortable to wear for hours and the ANC really works well.",
      verified: true,
      helpful: 18
    },
    {
      id: 3,
      user: "Mike R.",
      rating: 5,
      date: "2024-01-08",
      title: "Worth every penny",
      comment: "Premium build quality and incredible sound. The quick charge feature is a lifesaver.",
      verified: false,
      helpful: 12
    }
  ],
  relatedProducts: [
    {
      id: 2,
      name: "Wireless Earbuds Pro",
      brand: "TechSound",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=300&fit=crop",
      rating: 4.4
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      brand: "TechSound",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop",
      rating: 4.2
    }
  ]
};

const DetailProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
    const loadProduct = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProduct(sampleDetailedProduct);
      setLoading(false);
    };

    loadProduct();
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
          <LinearProgress sx={{ width: '100%', top:'0px',color:'purple' }} />
        </Box>
       
          <CircularProgress   sx={{ width: '50px', height:'50px', marginTop:'30%', color:'purple' }} />
        
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

  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

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
                src={product.images[selectedImage]}
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
                {product.colors.map((color, index) => (
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
          <Tab label="Specifications" />
          <Tab label={`Reviews (${product.totalReviews})`} />
        </Tabs>

        {/* Description Tab */}
        <TabPanel value={tabValue} index={0}>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
            Key Features:
          </Typography>
          <List>
            {product.features.map((feature, index) => (
              <ListItem key={index} sx={{ py: 0.5 }}>
                <ListItemText primary={`• ${feature}`} />
              </ListItem>
            ))}
          </List>
        </TabPanel>

        {/* Specifications Tab */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={2}>
            {Object.entries(product.specifications).map(([key, value]) => (
              <Grid item xs={12} sm={6} key={key}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid #eee' }}>
                  <Typography variant="body2" color="text.secondary">
                    {key}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {value}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
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
            {product.reviews.map((review) => (
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
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Related Products
        </Typography>
        <Grid container spacing={3}>
          {product.relatedProducts.map((relatedProduct) => (
            <Grid item size={{xl:4, md:4, sm:6, xs: 12}} key={relatedProduct.id}>
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
      </Box>

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
