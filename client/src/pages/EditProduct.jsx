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
    images: [],
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

  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
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
    const fetchProduct = async () => {
      try {
        setFetchLoading(true);
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        const product = response.data;
        
        setFormData({
          name: product.name || '',
          brand: product.brand || '',
          price: product.price?.toString() || '',
          originalPrice: product.originalPrice?.toString() || '',
          discount: product.discount?.toString() || '',
          images: product.images || [],
          rating: product.rating?.toString() || '',
          totalReviews: product.totalReviews?.toString() || '',
          category: product.category || '',
          subcategory: product.subcategory || '',
          inStock: product.inStock !== undefined ? product.inStock : true,
          stockCount: product.stockCount?.toString() || '',
          sku: product.sku || '',
          description: product.description || '',
          features: product.features?.length > 0 ? product.features : [''],
          specifications: {
            'Driver Size': product.specifications?.['Driver Size'] || '',
            'Frequency Response': product.specifications?.['Frequency Response'] || '',
            'Impedance': product.specifications?.['Impedance'] || '',
            'Battery Life': product.specifications?.['Battery Life'] || '',
            'Charging Time': product.specifications?.['Charging Time'] || '',
            'Weight': product.specifications?.['Weight'] || '',
            'Connectivity': product.specifications?.['Connectivity'] || '',
            'Warranty': product.specifications?.['Warranty'] || ''
          },
          colors: product.colors?.length > 0 ? product.colors : [{ name: '', value: '#000000', available: true }],
          sizes: product.sizes || ['One Size'],
          reviews: product.reviews?.length > 0 ? product.reviews : [{
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

        // Set existing images for display
        setExistingImages(product.images || []);
        
      } catch (error) {
        console.error('Error fetching product:', error);
        setMessage('Error loading product data. Please try again.');
        setMessageType('error');
      } finally {
        setFetchLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    
    if (files.length === 0) return;

    // Validate file types
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const invalidFiles = files.filter(file => !validTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      setMessage('Please select only image files (JPEG, PNG, GIF, WebP)');
      setMessageType('error');
      return;
    }

    // Validate file sizes (max 5MB per file)
    // const maxSize = 5 * 1024 * 1024; // 5MB
    // const oversizedFiles = files.filter(file => file.size > maxSize);
    
    // if (oversizedFiles.length > 0) {
    //   setMessage('Please select images smaller than 5MB');
    //   setMessageType('error');
    //   return;
    // }

    // Add new files to existing ones
    const newSelectedImages = [...selectedImages, ...files];
    setSelectedImages(newSelectedImages);

    // Create previews for new files
    const newPreviews = [];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newPreviews.push({
          file: file,
          url: e.target.result,
          name: file.name,
          isNew: true
        });
        
        if (newPreviews.length === files.length) {
          setImagePreviews(prev => [...prev, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });

    // Clear the input
    event.target.value = '';
  };

  const removeExistingImage = (index) => {
    const newExistingImages = existingImages.filter((_, i) => i !== index);
    setExistingImages(newExistingImages);
  };

  const removeNewImage = (index) => {
    const newSelectedImages = selectedImages.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    
    setSelectedImages(newSelectedImages);
    setImagePreviews(newPreviews);
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

  const uploadImagesToCloudinary = async (images) => {
    const uploadedUrls = [];
    
    for (const image of images) {
      const formDataUpload = new FormData();
      formDataUpload.append('file', image);
      formDataUpload.append('upload_preset', 'your_upload_preset'); // Replace with your Cloudinary upload preset
      
      try {
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', // Replace with your Cloudinary cloud name
          formDataUpload
        );
        uploadedUrls.push(response.data.secure_url);
      } catch (error) {
        console.error('Error uploading image:', error);
        throw new Error('Failed to upload images');
      }
    }
    
    return uploadedUrls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Upload new images if any
      let newImageUrls = [];
      if (selectedImages.length > 0) {
        newImageUrls = await uploadImagesToCloudinary(selectedImages);
      }

      // Combine existing images with new uploaded images
      const allImages = [...existingImages, ...newImageUrls];

      const productData = {
        ...formData,
        images: allImages,
        price: parseFloat(formData.price),
        originalPrice: parseFloat(formData.originalPrice),
        discount: parseFloat(formData.discount),
        rating: parseFloat(formData.rating),
        totalReviews: parseInt(formData.totalReviews),
        stockCount: parseInt(formData.stockCount),
        reviews: [{
          ...formData.reviews[0],
          id: formData.reviews[0].id || 1,
          rating: parseInt(formData.reviews[0].rating),
          helpful: parseInt(formData.reviews[0].helpful)
        }]
      };

      const response = await axios.put(`http://localhost:5000/api/products/${id}`, productData);
      
      if (response.status === 200) {
        setMessage('Product updated successfully!');
        setMessageType('success');
        
        // Reset new images
        setSelectedImages([]);
        setImagePreviews([]);
        
        // Optionally redirect after successful update
        setTimeout(() => {
          navigate('/products');
        }, 2000);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      setMessage('Error updating product. Please try again.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  if (!fetchLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
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
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
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
              
              <Grid item size={{xl:3, md:4, sm:6, xs:12}}>
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

        {/* Images Management */}
        <Card sx={{ mb: 3, borderRadius: 3 }}>
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <CloudUploadIcon className='text-purple-400' sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight="bold">
                Product Images
              </Typography>
            </Box>
            
            {/* Existing Images */}
            {existingImages.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
                  Current Images ({existingImages.length})
                </Typography>
                <Grid container spacing={2}>
                  {existingImages.map((imageUrl, index) => (
                    <Grid item xs={6} sm={4} md={3} key={index}>
                      <Card sx={{ position: 'relative', borderRadius: 2 }}>
                        <CardMedia
                          component="img"
                          height="150"
                          image={imageUrl}
                          alt={`Product image ${index + 1}`}
                          sx={{ objectFit: 'cover' }}
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            borderRadius: '50%',
                            p: 0.5
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={() => removeExistingImage(index)}
                            sx={{ color: 'white', p: 0.5 }}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {/* Upload New Images */}
            <Box sx={{ mb: 3 }}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="image-upload"
                multiple
                type="file"
                onChange={handleImageUpload}
              />
              <label htmlFor="image-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<PhotoCameraIcon />}
                  sx={{
                    borderStyle: 'dashed',
                    borderWidth: 2,
                    py: 2,
                    px: 4,
                    borderRadius: 2,
                    '&:hover': {
                      borderStyle: 'dashed',
                      borderWidth: 2,
                    }
                  }}
                >
                  Add More Images
                </Button>
              </label>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Select additional images (JPEG, PNG, GIF, WebP) - Max 5MB each
              </Typography>
            </Box>

            {/* New Image Previews */}
            {imagePreviews.length > 0 && (
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
                  New Images ({imagePreviews.length})
                </Typography>
                <Grid container spacing={2}>
                  {imagePreviews.map((preview, index) => (
                    <Grid item xs={6} sm={4} md={3} key={index}>
                      <Card sx={{ position: 'relative', borderRadius: 2 }}>
                        <CardMedia
                          component="img"
                          height="150"
                          image={preview.url}
                          alt={preview.name}
                          sx={{ objectFit: 'cover' }}
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            borderRadius: '50%',
                            p: 0.5
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={() => removeNewImage(index)}
                            sx={{ color: 'white', p: 0.5 }}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </Box>
                        <Box sx={{ p: 1 }}>
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              display: 'block',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {preview.name}
                          </Typography>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
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

        {/* Specifications */}
        <Card sx={{ mb: 3, borderRadius: 3 }}>
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
              Specifications
            </Typography>
            
            <Grid container spacing={3}>
              {Object.entries(formData.specifications).map(([key, value]) => (
                <Grid item size={{xl:3, md:4, sm:6, xs:12}} key={key}>
                  <TextField
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

            <Divider sx={{ my: 3 }} />
            
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
              Sample Review
            </Typography>
            <Grid container spacing={3}>
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
            </Grid>
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