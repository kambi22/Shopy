import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Material-UI Components
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Chip,
  Rating,
  CircularProgress,
  Alert,
  CardActions,
  Tooltip,
  Paper,
} from '@mui/material';

// Material-UI Icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAuth } from 'firebase/auth';
import app from '../firebaseConfig';
import { notifyconfirm } from '../component/Notify';

// Demo data to showcase the component structure without a live backend.

const MarchantProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const auth = getAuth(app)

  

useEffect(() => {
    // Set initial loading state when the effect runs.
    setLoading(true);

    // onAuthStateChanged returns an unsubscribe function, which we'll use for cleanup.
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      // If a user is logged in, fetch their products.
      if (user) {
        try {
          setError(null);
          const response = await axios.get(`${import.meta.env.VITE_BASE_API_URI}/marchant-product-list/${user.email}`);
          setProducts(response.data);
          console.log('response', response.data)
      
        } catch (err) {
          setError('Failed to fetch products. Please try again later.');
          console.error('Error fetching products:', err);
          setProducts([]); // Clear products on error
        } finally {
          // Stop loading once the fetch attempt is complete (success or fail).
          setLoading(false);
        }
      } else {
        // If no user is logged in, clear products and stop loading.
        setProducts([]);
        setLoading(false);
      }
    });

    // The cleanup function returned by useEffect will run when the component unmounts.
    return () => unsubscribe();
  }, [auth]); // Dependency array ensures this effect runs only when the auth object changes.




  const handleDelete = async (product) => {
       
           notifyconfirm('warning', `Delete ${product.name}`, `Are you sure you want to delete ${product.name} product?`, true, true)
             .then((result) => {
               if (result.isConfirmed) {
                 console.log('User clicked OK');
                //  axios.delete(`${import.meta.env.VITE_BASE_API_URI}//delete-product/${product._id}`)
                //    .then((result) => {
                //      console.log('result', result.data),
                //        toast('success', 'Project sucessfully Deleted', 'bottom-left', true)
                     
       
                  //  })
                  //  .catch((error) => console.error("error to delete project", error))
               } else if (result.isDismissed) {
                 console.log('User clicked Cancel');
               }
             });
  };

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="p-4">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box className="p-4 md:p-8 bg-gray-50 min-h-screen">
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
            <h3 className='text-2xl sm:text-4xl sm:font-bold'>My product list</h3>
           
          </Paper>
    
      {products.length > 0? ( products.map((product, i)=>(
        <Card sx={{borderRadius: 3,}} key={i} className=" h-full m-3   hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden">
                <Grid container spacing={4}>
                  {/* --- IMAGE SECTION --- */}
                  <Grid item size={{ xs: 12, sm: 12, md: 4, xl: 4}}>
                    <Box className="relative" >
                      <CardMedia
                        component="img"
                        className=" w-full object-cover h-full"
                        image={product.images[0]}
                        alt={product.name}
                        
                      />
         
                      <Chip
                        label={product.inStock ? 'In Stock' : 'Out of Stock'}
                        color={product.inStock ? 'success' : 'error'}
                        size="small"
                        className="!absolute top-2 left-2 !font-semibold"
                      />
                    </Box>
                  </Grid>

                  {/* --- CONTENT & ACTIONS SECTION --- */}
                 <Grid item size={{ xs: 12, sm: 12, md: 8, xl: 8 }}>
                    <CardContent className="flex-grow p-6  text-start " sx={{height:'80%'}}>
                    
                      <Typography variant="h5" component="h2" className="font-bold text-gray-900 truncate" title={product.name}>
                        {product.name}
                      </Typography>
                        <Typography variant="caption" color="text.secondary" className="block">
                        {product.brand}
                      </Typography>
                      <Box className="flex items-center my-2">
                        <Rating value={product.rating} precision={0.5} readOnly />
                        <Typography variant="body2" color="text.secondary" className="ml-2">
                          ({product.reviews} reviews)
                        </Typography>
                      </Box>
                      <Box className="flex items-baseline gap-2 mb-4">
                        <Typography variant="h4" color="primary" className="font-bold">
                          ${product.price.toFixed(2)}
                        </Typography>
                        <Typography variant="h6" className="line-through text-gray-500">
                          ${product.originalPrice.toFixed(2)}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" className="hidden md:block text-start   overflow-ellipsis">
                        {product.description}
                      </Typography>
                    </CardContent>
                   {/* This will now be at the bottom of the card */}
                    <CardActions className="justify-end pt-5 ">
                      <Tooltip title="Edit Product">
                        <IconButton onClick={() => navigate(`/edit-product/${product._id}`)} color="primary">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Product">
                        <IconButton onClick={() => handleDelete(product)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </CardActions>
                  </Grid>
                </Grid>
              </Card>
       ))
      ):(
       <Alert severity="info">You have not added any products yet. Start by adding a new product!</Alert>
      )}
    </Box>
  );
};

export default MarchantProductsList;
