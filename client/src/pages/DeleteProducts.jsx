import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  FormControlLabel,
  Checkbox,
  IconButton,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Divider,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
  Rating,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  CloudUpload as CloudUploadIcon,
  Star as StarIcon,
  AttachMoney as AttachMoneyIcon,
  Inventory as InventoryIcon,
  Category as CategoryIcon,
  Description as DescriptionIcon,
  Palette as PaletteIcon,
  Reviews as ReviewsIcon
} from '@mui/icons-material';

const DeleteProduct = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    originalPrice: '',
    discount: '',
    images: [''],
    rating: '',
    totalReviews: '',
    category: '',
    subcategory: '',
    inStock: true,
    stockCount: '',
    sku: '',
    description: '',
    features: [''],
    specifications: {
      'Driver Size': '',
      'Frequency Response': '',
      'Impedance': '',
      'Battery Life': '',
      'Charging Time': '',
      'Weight': '',
      'Connectivity': '',
      'Warranty': ''
    },
    colors: [{ name: '', value: '#000000', available: true }],
    sizes: ['One Size'],
    reviews: [{
      id: 1,
      user: '',
      rating: 0,
      date: '',
      title: '',
      comment: '',
      verified: true,
      helpful: 0
    }]
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');

  const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Beauty', 'Automotive'];
  const subcategories = {
    'Electronics': ['Headphones', 'Smartphones', 'Laptops', 'Tablets', 'Cameras'],
    'Clothing': ['Men', 'Women', 'Kids', 'Accessories'],
    'Books': ['Fiction', 'Non-Fiction', 'Educational', 'Comics'],
    'Home & Garden': ['Furniture', 'Decor', 'Kitchen', 'Garden'],
    'Sports': ['Fitness', 'Outdoor', 'Team Sports', 'Water Sports'],
    'Beauty': ['Skincare', 'Makeup', 'Hair Care', 'Fragrance'],
    'Automotive': ['Parts', 'Accessories', 'Tools', 'Care']
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSpecificationChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [key]: value
      }
    }));
  };

  const handleArrayChange = (index, value, arrayName) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (arrayName, defaultValue) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], defaultValue]
    }));
  };

  const removeArrayItem = (index, arrayName) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index)
    }));
  };

  const handleColorChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.map((color, i) => 
        i === index ? { ...color, [field]: value } : color
      )
    }));
  };

  const handleReviewChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      reviews: [{
        ...prev.reviews[0],
        [field]: value
      }]
    }));
  };

  const checkingall = () => {
        e.preventDefault();
    setLoading(true);
    setMessage('');
    console.log('formdata:', formData);
    console.log('categories:', categories);
    console.log('subcategories:', subcategories);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const productData = {
        ...formData,
        id: Date.now(),
        price: parseFloat(formData.price),
        originalPrice: parseFloat(formData.originalPrice),
        discount: parseFloat(formData.discount),
        rating: parseFloat(formData.rating),
        totalReviews: parseInt(formData.totalReviews),
        stockCount: parseInt(formData.stockCount),
        reviews: [{
          ...formData.reviews[0],
          id: 1,
          rating: parseInt(formData.reviews[0].rating),
          helpful: parseInt(formData.reviews[0].helpful)
        }]
      };

      const response = await axios.post('http://localhost:5000/api/products', productData);
      
      if (response.status === 201) {
        setMessage('Product added successfully!');
        setMessageType('success');
        // Reset form
        setFormData({
          name: '',
          brand: '',
          price: '',
          originalPrice: '',
          discount: '',
          images: [''],
          rating: '',
          totalReviews: '',
          category: '',
          subcategory: '',
          inStock: true,
          stockCount: '',
          sku: '',
          description: '',
          features: [''],
          specifications: {
            'Driver Size': '',
            'Frequency Response': '',
            'Impedance': '',
            'Battery Life': '',
            'Charging Time': '',
            'Weight': '',
            'Connectivity': '',
            'Warranty': ''
          },
          colors: [{ name: '', value: '#000000', available: true }],
          sizes: ['One Size'],
          reviews: [{
            id: 1,
            user: '',
            rating: 0,
            date: '',
            title: '',
            comment: '',
            verified: true,
            helpful: 0
          }]
        });
      }
    } catch (error) {
      console.error('Error adding product:', error);
      setMessage('Error adding product. Please try again.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
      <Paper 
        elevation={3} 
        className='shadow-none'
        sx={{ 
          p: { xs: 2, md: 4 }, 
          borderRadius: 3,
          background: 'linear-gradient(135deg,rgb(162, 122, 230) 0%,rgb(242, 178, 247) 100%)',
          color: 'white',
          mb: 3
        }}
      >
        <Typography 
          variant={isMobile ? "h4" : "h3"} 
          component="h1" 
          textAlign="center" 
          fontWeight="bold"
          sx={{ mb: 1 }}
        >
          Add New Product
        </Typography>
        <Typography 
          variant="subtitle1" 
          textAlign="center" 
          sx={{ opacity: 0.9 }}
        >
          Fill in the details below to add a new product to your store
        </Typography>
      </Paper>

      {message && (
        <Alert 
          severity={messageType} 
          sx={{ mb: 3, borderRadius: 2 }}
          onClose={() => setMessage('')}
        >
          {message}
        </Alert>
      )}

      <Box component="form" onSubmit={checkingall}>
        {/* Basic Information */}
        <Card sx={{ mb: 3, borderRadius: 3, overflow: 'hidden' }}>
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <InventoryIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" fontWeight="bold">
                Basic Information
              </Typography>
            </Box>
            
            <Grid container spacing={3} className='' >
              <Grid item className='  ' size={{ xl: 3, md: 4, sm: 6, xs: 12 }} >
                <TextField
                  fullWidth
                  label="Product Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                />
              </Grid>
              
              <Grid item  size={{ xl: 3, md: 4, sm: 6, xs: 12 }}>
                <TextField
                  fullWidth
                  label="Brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                />
              </Grid>
              
              <Grid item size={{ xl: 3, md: 4, sm: 6, xs: 12 }} >
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              
              <Grid item size={{ xl: 3, md: 4, sm: 6, xs: 12 }}>
                <TextField
                  fullWidth
                  label="Original Price"
                  name="originalPrice"
                  type="number"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoneyIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              
              <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}>
                <TextField
                  fullWidth
                  label="Discount %"
                  name="discount"
                  type="number"
                  value={formData.discount}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              
              <Grid size={{ xl: 3, md: 4, sm: 6, xs: 12 }}>
                <TextField
                  fullWidth
                  label="SKU"
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Category and Stock */}
        <Card sx={{ mb: 3, borderRadius: 3 }}>
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <CategoryIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" fontWeight="bold">
                Category & Stock
              </Typography>
            </Box>
            
            <Grid container spacing={3}>
              <Grid item size={{ xl: 3, md: 4, sm: 6, xs: 12 }}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {cat}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item size={{ xl: 3, md: 4, sm: 6, xs: 12 }}>
                <FormControl fullWidth>
                  <InputLabel>Subcategory</InputLabel>
                  <Select
                    name="subcategory"
                    value={formData.subcategory}
                    onChange={handleInputChange}
                    disabled={!formData.category}
                  >
                    {formData.category && subcategories[formData.category]?.map((subcat) => (
                      <MenuItem key={subcat} value={subcat}>
                        {subcat}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item size={{ xl: 3, md: 4, sm: 6, xs: 12 }}>
                <TextField
                  fullWidth
                  label="Stock Count"
                  name="stockCount"
                  type="number"
                  value={formData.stockCount}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                />
              </Grid>
              
              <Grid item >
                <FormControlLabel
                  control={
                    <Checkbox
                      name="inStock"
                      checked={formData.inStock}
                      onChange={handleInputChange}
                      color="primary"
                    />
                  }
                  label="In Stock"
                  sx={{ mt: 2 }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Description */}
        <Card sx={{ mb: 3, borderRadius: 3 }}>
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <DescriptionIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" fontWeight="bold">
                Description
              </Typography>
            </Box>
            
            <TextField
              fullWidth
              label="Product Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              multiline
              rows={4}
              required
              variant="outlined"
            />
          </CardContent>
        </Card>

        {/* Images */}
        <Card sx={{ mb: 3, borderRadius: 3 }}>
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <CloudUploadIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" fontWeight="bold">
                Product Images
              </Typography>
            </Box>
            
            <Stack spacing={2}>
              {formData.images.map((image, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <TextField
                    fullWidth
                    label={`Image URL ${index + 1}`}
                    value={image}
                   
                    onChange={(e) => handleArrayChange(index, e.target.value, 'images')}
                    variant="outlined"
                  />
                  {formData.images.length > 1 && (
                    <IconButton
                      onClick={() => removeArrayItem(index, 'images')}
                      color="error"
                      sx={{ flexShrink: 0 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
              ))}
              <Button
                startIcon={<AddIcon />}
                onClick={() => addArrayItem('images', '')}
                variant="outlined"
                sx={{ alignSelf: 'flex-start' }}
              >
                Add Image
              </Button>
            </Stack>
          </CardContent>
        </Card>

        {/* Features */}
        <Card sx={{ mb: 3, borderRadius: 3 }}>
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <StarIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" fontWeight="bold">
                Features
              </Typography>
            </Box>
            
            <Stack spacing={2}>
              {formData.features.map((feature, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <TextField
                    fullWidth
                    label={`Feature ${index + 1}`}
                    value={feature}
                    onChange={(e) => handleArrayChange(index, e.target.value, 'features')}
                    variant="outlined"
                  />
                  {formData.features.length > 1 && (
                    <IconButton
                      onClick={() => removeArrayItem(index, 'features')}
                      color="error"
                      sx={{ flexShrink: 0 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
              ))}
              <Button
                startIcon={<AddIcon />}
                onClick={() => addArrayItem('features', '')}
                variant="outlined"
                sx={{ alignSelf: 'flex-start' }}
              >
                Add Feature
              </Button>
            </Stack>
          </CardContent>
        </Card>

        {/* Specifications */}
        <Card sx={{ mb: 3, borderRadius: 3 }}>
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
              Specifications
            </Typography>
            
            <Grid container spacing={3} >
              {Object.entries(formData.specifications).map(([key, value]) => (
                <Grid className='' item size={{ xl: 3, md: 4, sm: 6, xs: 12 }} key={key}>
                  <TextField
                    className=''
                    fullWidth
                    label={key}
                    value={value}
                    onChange={(e) => handleSpecificationChange(key, e.target.value)}
                    variant="outlined"
                  />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* Colors */}
        <Card sx={{ mb: 3, borderRadius: 3 }}>
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <PaletteIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" fontWeight="bold">
                Colors
              </Typography>
            </Box>
            
            <Stack spacing={2}>
              {formData.colors.map((color, index) => (
                <Paper key={index} sx={{ p: 2, backgroundColor: 'grey.50' }}>
                  <Grid container spacing={2} alignItems="center"  >
                    <Grid item size={{ xl: 3, md: 3, sm: 6, xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Color Name"
                        value={color.name}
                        onChange={(e) => handleColorChange(index, 'name', e.target.value)}
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={6} md={2}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2">Color:</Typography>
                        <input
                          type="color"
                          value={color.value}
                          onChange={(e) => handleColorChange(index, 'value', e.target.value)}
                          style={{ 
                            width: '40px', 
                            height: '40px', 
                            border: 'none', 
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={color.available}
                            onChange={(e) => handleColorChange(index, 'available', e.target.checked)}
                            size="small"
                          />
                        }
                        label="Available"
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      {formData.colors.length > 1 && (
                        <Button
                          onClick={() => removeArrayItem(index, 'colors')}
                          color="error"
                          variant="outlined"
                          size="small"
                          startIcon={<DeleteIcon />}
                          fullWidth
                        >
                          Remove
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </Paper>
              ))}
              <Button
                startIcon={<AddIcon />}
                onClick={() => addArrayItem('colors', { name: '', value: '#000000', available: true })}
                variant="outlined"
                sx={{ alignSelf: 'flex-start' }}
              >
                Add Color
              </Button>
            </Stack>
          </CardContent>
        </Card>

        {/* Rating and Reviews */}
        <Card sx={{ mb: 3, borderRadius: 3 }}>
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <ReviewsIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" fontWeight="bold">
                Rating & Reviews
              </Typography>
            </Box>
            
            <Grid container spacing={3}>
              <Grid item size={{ xl: 4, md: 4, sm: 6, xs: 12 }}>
                <TextField
                  fullWidth
                  label="Rating (1-5)"
                  name="rating"
                  type="number"
                  inputProps={{ min: 1, max: 5, step: 0.1 }}
                  value={formData.rating}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item size={{ xl: 3, md: 3, sm: 6, xs: 12 }}>
                <TextField
                  fullWidth
                  label="Total Reviews"
                  name="totalReviews"
                  type="number"
                  value={formData.totalReviews}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />
            
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
              Sample Review
            </Typography>
            <Grid container spacing={3}>
              <Grid item size={{ xl: 3, md: 3, sm: 6, xs: 12 }}>
                <TextField
                  fullWidth
                  label="Reviewer Name"
                  value={formData.reviews[0].user}
                  onChange={(e) => handleReviewChange('user', e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item size={{ xl: 3, md: 3, sm: 6, xs: 12 }}>
                <TextField
                  fullWidth
                  label="Review Rating (1-5)"
                  type="number"
                  inputProps={{ min: 1, max: 5 }}
                  value={formData.reviews[0].rating}
                  onChange={(e) => handleReviewChange('rating', e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item size={{ xl: 3, md: 3, sm: 6, xs: 12 }}>
                <TextField
                  fullWidth
                  label="Review Date"
                  type="date"
                  value={formData.reviews[0].date}
                  onChange={(e) => handleReviewChange('date', e.target.value)}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item size={{ xl: 3, md: 3, sm: 6, xs: 12 }}>
                <TextField
                  fullWidth
                  label="Review Title"
                  value={formData.reviews[0].title}
                  onChange={(e) => handleReviewChange('title', e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item size={{ xl: 12, md: 12, sm: 12, xs: 12 }}>
                <TextField
                  fullWidth
                  label="Review Comment"
                  value={formData.reviews[0].comment}
                  onChange={(e) => handleReviewChange('comment', e.target.value)}
                  multiline
                  rows={3}
                  variant="outlined"
                />
              </Grid>
              <Grid item size={{ xl: 4, md: 4, sm: 6, xs: 12 }}>
                <TextField
                  fullWidth
                  label="Helpful Count"
                  type="number"
                  value={formData.reviews[0].helpful}
                  onChange={(e) => handleReviewChange('helpful', e.target.value)}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt:4 }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            sx={{
              px: { xs: 4, md: 8 },
              py: 2,
             
              borderRadius: 3,
              background: 'linear-gradient(45deg,rgb(232, 119, 236) 30%,rgb(247, 163, 229) 90%)',
            
              fontSize: '1.1rem',
              fontWeight: 'bold',
              minWidth: { xs: '200px', md: '250px' },
              '&:hover': {
                background: 'linear-gradient(45deg,rgb(245, 153, 241) 60%,rgb(206, 83, 255) 100%)',
                transform: 'translateY(-2px)',
                // boxShadow: '0 1px 10px 2px rgba(128, 133, 225, 0.3)',
              },
              '&:disabled': {
                background: 'grey.400',
                color: 'white',
              }
            }}
          >
            {loading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={20} color="inherit" />
                <span>Adding Product...</span>
              </Box>
            ) : (
              'Add Product'
            )}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default DeleteProduct;