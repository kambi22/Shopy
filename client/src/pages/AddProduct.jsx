import React, { useEffect, useState } from 'react';
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
  useMediaQuery,
  CardMedia,
  Badge
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
  Close as CloseIcon
} from '@mui/icons-material';
import { getAuth } from 'firebase/auth';
import app from '../firebaseConfig';
import {categories, subcategories} from '../data/sampleData'
const AddProduct = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const auth = getAuth(app)

  const [formData, setFormData] = useState({
    marchantName:'',
    marchantEmail:'',
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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');



  

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        setFormData({marchantName:user.displayName, marchantEmail:user.email})
      });
      return () => unsubscribe(); // Cleanup on unmount
    }, [auth]);

 
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
          name: file.name
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

  const removeImage = (index) => {
    const newSelectedImages = selectedImages.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);

    setSelectedImages(newSelectedImages);
    setImagePreviews(newPreviews);
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
      [arrayName]: Array.isArray(prev[arrayName]) ? [...prev[arrayName], defaultValue] : [defaultValue]
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
        ...(Array.isArray(prev.reviews) && prev.reviews[0] ? prev.reviews[0] : {}),
        [field]: value
      }]
    }));
  };

  

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (!selectedImages.length) {
        setMessage('Please select at least one image.');
        setMessageType('error');
        setLoading(false);
        return;
      }

      // Prepare FormData for multipart/form-data
      const form = new FormData();

      // Append images (as files)
      selectedImages.forEach((img) => {
        // If img is a File object, append directly
        form.append('images', img);
      });

      // Append all other fields (convert objects/arrays to JSON string)
      Object.entries(formData).forEach(([key, value]) => {
        if (
          typeof value === 'object' &&
          value !== null &&
          !(value instanceof File) &&
          key !== 'images'
        ) {
          form.append(key, JSON.stringify(value));
        } else {
          form.append(key, value);
        }
      });

      // Send to backend (make sure backend uses multer or similar to handle files)
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_API_URI}/add-product`,form);

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

        setSelectedImages([]);
        setImagePreviews([]);
      }
    } catch (error) {
      console.error('front-end Error adding product:', error);
      setMessage('Error adding product. Please try again.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 }, marginBottom:'200px' }}>
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
              <Grid item size={{ xl: 3, md: 4, sm: 6, xs: 12 }}>
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

              <Grid item size={{ xl: 3, md: 4, sm: 6, xs: 12 }}>
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

              <Grid item size={{ xl: 3, md: 4, sm: 6, xs: 12 }}>
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

              <Grid item size={{ xl: 3, md: 4, sm: 6, xs: 12 }}>
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

              <Grid item size={{ xl: 3, md: 4, sm: 6, xs: 12 }}>
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
                    required
                  >
                    {/* Access the array of subcategories based on the selected main category */}
                    {(subcategories[formData.category] || []).map((cat, i) => (
                      <MenuItem key={i} value={cat}>
                        {cat}
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
                     className='text-purple-400' 
                      name="inStock"
                      checked={formData.inStock}
                      onChange={handleInputChange}
                     
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
              <DescriptionIcon  className='text-purple-400' sx={{ mr: 1 }} />
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

        {/* Images Upload */}
        <Card sx={{ mb: 3, borderRadius: 3 }}>
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <CloudUploadIcon className='text-purple-400' sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight="bold">
                Product Images
              </Typography>
            </Box>

            {/* Upload Button */}
            <Box sx={{ mb: 3 }}>
              <input
               className='text-purple-400' 
                accept="image/*"
                style={{ display: 'none' }}
                id="image-upload"
                multiple
                type="file"
                onChange={handleImageUpload}
              />
              <label htmlFor="image-upload">
                <Button
                className='text-purple-400' 
                  variant="outlined"
                  component="span"
                  startIcon={<PhotoCameraIcon className='text-purple-400' />}
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
                  Choose Images
                </Button>
              </label>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Select multiple images (JPEG, PNG, GIF, WebP) - Max 5MB each
              </Typography>
            </Box>

            {/* Image Previews */}
            {imagePreviews.length > 0 && (
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
                  Selected Images ({imagePreviews.length})
                </Typography>
                 
<Box className='imges-scroll' sx={{width:'100%',padding:'5px', display:'flex', overflowX:'scroll', height:'250px'}}>
  {imagePreviews.map((preview, index) => (
    <Card
      key={index} // Added key prop for list items
      className=''
      sx={{
        position: 'relative',
        borderRadius: 2,
        height:'190px',
        width:'250px',
        flex: '0 0 250px', // Prevent shrinking and set basis
        marginRight: '10px' // Add some spacing between cards (optional, but good for scrolling)
      }}
    >
      <CardMedia
        className=''
        component="img"
        image={preview.url}
        alt={preview.name}
        sx={{ objectFit: 'cover', height: '150px' }} // Added height for the image
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
          onClick={() => removeImage(index)}
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
  ))}
</Box>

              </Box>
            )}
          </CardContent>
        </Card>

        {/* Features */}
        <Card sx={{ mb: 3, borderRadius: 3 }}>
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <StarIcon   className='text-purple-400' sx={{ mr: 1 }}  />
              <Typography variant="h6" fontWeight="bold">
                Features
              </Typography>
            </Box>

            <Stack spacing={2}>
              {(formData.features || []).map((feature, index) => (
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
              <PaletteIcon className='text-purple-400' sx={{ mr: 1 }}/>
              <Typography variant="h6" fontWeight="bold">
                Colors
              </Typography>
            </Box>

            <Stack spacing={2}>
              {(formData.colors || []).map((color, index) => (
                <Paper key={index} sx={{ p: 2, backgroundColor: 'grey.50' }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item size={{ xl: 4, md: 4, sm: 6, xs: 12 }}>
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
              <Grid item size={{ xl: 3, md: 4, sm: 6, xs: 12 }}>
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
              <Grid item size={{ xl: 3, md: 4, sm: 6, xs: 12 }}>
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
              <Grid item size={{ xl: 3, md: 4, sm: 6, xs: 12 }}>
                <TextField
                  fullWidth
                  label="Reviewer Name"
                  value={Array.isArray(formData.reviews) && formData.reviews[0] ? formData.reviews[0].user : ''}
                  onChange={(e) => handleReviewChange('user', e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item size={{ xl: 3, md: 4, sm: 6, xs: 12 }}>
                <TextField
                  fullWidth
                  label="Review Rating (1-5)"
                  type="number"
                  inputProps={{ min: 1, max: 5 }}
                      value={Array.isArray(formData.reviews) && formData.reviews[0] ? formData.reviews[0].rating : ''}
                  onChange={(e) => handleReviewChange('rating', e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item size={{ xl: 3, md: 4, sm: 6, xs: 12 }}>
                <TextField
                  fullWidth
                  label="Review Date"
                  type="date"
                      value={Array.isArray(formData.reviews) && formData.reviews[0] ? formData.reviews[0].data : ''}
                  onChange={(e) => handleReviewChange('date', e.target.value)}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item size={{ xl: 3, md: 4, sm: 6, xs: 12 }}>
                <TextField
                  fullWidth
                  label="Review Title"
                      value={Array.isArray(formData.reviews) && formData.reviews[0] ? formData.reviews[0].title : ''}
                  onChange={(e) => handleReviewChange('title', e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item size={{ xl: 12, md: 12, sm: 12, xs: 12 }}>
                <TextField
                  fullWidth
                  label="Review Comment"
                      value={Array.isArray(formData.reviews) && formData.reviews[0] ? formData.reviews[0].comment : ''}
                  onChange={(e) => handleReviewChange('comment', e.target.value)}
                  multiline
                  rows={3}
                  variant="outlined"
                />
              </Grid>
              <Grid item size={{ xl: 3, md: 4, sm: 6, xs: 12 }}>
                <TextField
                  fullWidth
                  label="Helpful Count"
                  type="number"
                     value={Array.isArray(formData.reviews) && formData.reviews[0] ? formData.reviews[0].helpful : ''}
                  onChange={(e) => handleReviewChange('helpful', e.target.value)}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
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

export default AddProduct;