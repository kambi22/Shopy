import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  Stack,
  useTheme,
  useMediaQuery,
  CardMedia,
  Skeleton
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
  Reviews as ReviewsIcon,
  PhotoCamera as PhotoCameraIcon,
  Close as CloseIcon,
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon
} from '@mui/icons-material';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    originalPrice: '',
    discount: '',
    rating: '',
    totalReviews: '',
    category: '',
    subcategory: '',
    inStock: true,
    stockCount: '',
    sku: '',
    description: '',
    features: [''],
    colors: [{ name: '', value: '#000000', available: true }],
    sizes: ['One Size'],
    
  });


  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
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

  // Fetch product data on component mount
   useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BASE_API_URI}/product-detail?id=${id}`)
      .then((res) => {
        setFormData(res.data);
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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

  

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Only send edited form data, no images

      // Send to backend (no image upload)
      const response = await axios.put(`${import.meta.env.VITE_BASE_API_URI}/edit-product/${id}`, formData);

      if (response.status === 201) {
        setMessage('Product updated successfully!');
        setMessageType('success');

        // Reset form
        setFormData({
          name: '',
          brand: '',
          price: '',
          originalPrice: '',
          discount: '',
          rating: '',
          totalReviews: '',
          category: '',
          subcategory: '',
          inStock: true,
          stockCount: '',
          sku: '',
          description: '',
          features: [''],
         
          colors: [{ name: '', value: '#000000', available: true }],
          sizes: ['One Size'],
        });
      }
      setMessageType('success');
      setMessage('Product successfully updated');
    } catch (error) {
      console.error('front-end Error updating product:', error);
      setMessage('Error updating product. Please try again.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  if (!fetchLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 }}}>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Skeleton variant="text" width="60%" height={60} sx={{ mb: 2 }} />
          <Skeleton variant="text" width="40%" height={40} sx={{ mb: 4 }} />
          <Grid container spacing={3}>
            {[...Array(6)].map((_, index) => (
              <Grid item size={{xl:3, md:4, sm:6, xs:12}} key={index}>
                <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 }, marginBottom:'200px'  }}>
      {/* Header */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: { xs: 2, md: 4 }, 
  
          borderRadius: 3,
          background: 'linear-gradient(135deg,rgb(162, 122, 230) 0%,rgb(242, 178, 247) 100%)',
          color: 'white',
          mb: 3
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent:'center' }}>
          {/* <IconButton 
            onClick={() => navigate(-1)} 
            sx={{ color: 'white', mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton> */}
          {/* <EditIcon sx={{ mr: 1 }} /> */}
          <Typography 
            variant={isMobile ? "h4" : "h3"} 
            component="h1" 
            fontWeight="bold"

          >
            Edit Product
          </Typography>
        </Box>
        <Typography 
          variant="subtitle1" 
          sx={{ opacity: 0.9, ml: 7 }}
        >
          Update product information and save changes
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

      <Box component="form" onSubmit={handleSubmit}>
        {/* Basic Information */}
        <Card sx={{ mb: 3, borderRadius: 3, overflow: 'hidden' }}>
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <InventoryIcon className='text-purple-400' sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight="bold">
                Basic Information
              </Typography>
            </Box>
            
            <Grid container spacing={3}>
              <Grid item size={{xl:3, md:4, sm:6, xs:12}}>
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
              
              <Grid item size={{xl:3, md:4, sm:6, xs:12}}>
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
              
              <Grid item size={{xl:3, md:4, sm:6, xs:12}}>
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
              
              <Grid item size={{xl:3, md:4, sm:6, xs:12}}>
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
              
              <Grid item size={{xl:3, md:4, sm:6, xs:12}}>
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
              
              <Grid item size={{xl:3, md:4, sm:6, xs:12}}>
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
              <CategoryIcon className='text-purple-400' sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight="bold">
                Category & Stock
              </Typography>
            </Box>
            
            <Grid container spacing={3}>
              <Grid item size={{xl:3, md:4, sm:6, xs:12}}>
                <FormControl fullWidth className='text-start'>
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
              
              <Grid item size={{xl:3, md:4, sm:6, xs:12}}>
                <FormControl fullWidth className='text-start'>
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
              
              <Grid item size={{xl:3, md:4, sm:6, xs:12}}>
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
              <DescriptionIcon className='text-purple-400' sx={{ mr: 1 }} />
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

    

        {/* Features */}
        <Card sx={{ mb: 3, borderRadius: 3 }}>
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <StarIcon className='text-purple-400' sx={{ mr: 1 }} />
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

       

        {/* Colors */}
        <Card sx={{ mb: 3, borderRadius: 3 }}>
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <PaletteIcon className='text-purple-400' sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight="bold">
                Colors
              </Typography>
            </Box>
            
            <Stack spacing={2}>
              {formData.colors.map((color, index) => (
                <Paper key={index} sx={{ p: 2, backgroundColor: 'grey.50' }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={4}>
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
              <ReviewsIcon className='text-purple-400' sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight="bold">
                Rating & Reviews
              </Typography>
            </Box>
            
            <Grid container spacing={3}>
              <Grid item size={{xl:3, md:4, sm:6, xs:12}}>
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
              <Grid item size={{xl:3, md:4, sm:6, xs:12}}>
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

            {/* <Divider sx={{ my: 3 }} />
            
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
              Sample Review
            </Typography> */}
            {/* <Grid container spacing={3}>
              <Grid item size={{xl:3, md:4, sm:6, xs:12}}>
                <TextField
                  fullWidth
                  label="Reviewer Name"
                  value={formData.reviews[0].user}
                  onChange={(e) => handleReviewChange('user', e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item size={{xl:3, md:4, sm:6, xs:12}}>
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
              <Grid item size={{xl:3, md:4, sm:6, xs:12}}>
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
              <Grid item size={{xl:3, md:4, sm:6, xs:12}}>
                <TextField
                  fullWidth
                  label="Review Title"
                  value={formData.reviews[0].title}
                  onChange={(e) => handleReviewChange('title', e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item size={{xl:12, md:12, sm:12, xs:12}}>
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
              <Grid item size={{xl:3, md:4, sm:6, xs:12}}>
                <TextField
                  fullWidth
                  label="Helpful Count"
                  type="number"
                  value={formData.reviews[0].helpful}
                  onChange={(e) => handleReviewChange('helpful', e.target.value)}
                  variant="outlined"
                />
              </Grid>
            </Grid> */}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate(-1)}
            sx={{
              px: { xs: 3, md: 6 },
              py: 2,
              borderRadius: 3,
              minWidth: { xs: '120px', md: '150px' }
            }}
          >
            Cancel
          </Button>
          
          
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            startIcon={<SaveIcon />}
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
                <span>Updating...</span>
              </Box>
            ) : (
              'Update Product'
            )}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EditProduct;