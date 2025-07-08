import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Divider,
  Paper,
  Alert,
  Snackbar,
  CircularProgress
} from "@mui/material";
import { Delete, ShoppingCart } from "@mui/icons-material";
import { removeFromCart } from "../reduxToolkit/action";

const AddToCartPage = () => {
  const cart = useSelector(state => state.cart.cart); // array of product IDs
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchCartProducts = async () => {
      if (cart.length === 0) {
        setCartProducts([]);
        setLoading(false);
        return;
      }
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_API_URI}/cart-items`,
          cart
        );
        // Add quantity: 1 by default if not present
        const productsWithQty = response.data.map(prod => ({
          ...prod,
          quantity: 1,
        }));
        setCartProducts(productsWithQty);
      } catch (error) {
        setCartProducts([]);
      }
      setLoading(false);
    };
    fetchCartProducts();
  }, [cart]);

  const handleRemove = (id) => {
    // Remove from Redux cart here (dispatch removeFromCart)
    dispatch(removeFromCart(id));
    setCartProducts(cartProducts.filter((item) => item._id !== id));
    setSnackbar({
      open: true,
      message: `Item removed from cart!`,
      severity: 'success'
    });
  };

  const handleQuantityChange = (id, delta) => {
    setCartProducts(cartProducts =>
      cartProducts.map(item =>
        item._id === id
          ? { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) }
          : item
      )
    );
  };

  const total = cartProducts.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);

  if (loading) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
         
        }}
      >
        <CircularProgress size={48} />
      </Box>
    );
  }

  return (
    <Box sx={{ py: 6, px: { xs: 2, md: 8 }, maxHeight: "100vh" }}>
        <Paper
            elevation={3}
            className='shadow-none'
            
            sx={{
              display:'flex',
              
              justifyContent:'center',
              p: { xs: 2, md: 4 },
              borderRadius: 3,
              background: 'linear-gradient(135deg,rgb(162, 122, 230) 0%,rgb(242, 178, 247) 100%)',
              color: 'white',
              mb: 3
            }}
          >
           
              <ShoppingCart style={{height:'31px', width:'31px'}} className="mt-1 me-2"/>
            <h3 className='text-2xl sm:text-3xl sm:font-bold'>Your Cart Items </h3>

         
            
           
          </Paper>
      {cartProducts.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          Your cart is empty.
        </Typography>
      ) : (
        <Grid container spacing={4} sx={{marginTop:'80px'}}>
          <Grid item size={{xl:6, md:6, sm:12, xs:12}} sx={{ mb: 4 }}>
            {cartProducts.map((item) => (
              <Card
                key={item._id}
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  mb: 3,
                  borderRadius: 2,
                  boxShadow: 2,
                  background: "#fff",
                }}
              >
                <CardMedia
                  component="img"
                  image={item.images?.[0]}
                  alt={item.name}
                  sx={{ width: 120, height: 120, objectFit: "cover", borderRadius: 2, m: 2 }}
                />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {item.brand}
                  </Typography>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body1" fontWeight="bold" color="primary">
                    ${item.price}
                  </Typography>
                  <Box display="flex" alignItems="center" mt={2}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleQuantityChange(item._id, -1)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </Button>
                    <Typography mx={2}>{item.quantity}</Typography>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleQuantityChange(item._id, 1)}
                    >
                      +
                    </Button>
                  </Box>
                </CardContent>
                <CardActions>
                  <IconButton color="primary" onClick={() => handleRemove(item._id)}>
                   <Delete/>
                  </IconButton>
                </CardActions>
              </Card>
            ))}
          </Grid>
          <Grid item size={{xl:6, md:6, sm:12, xs:12}} className=" ">
            <Card sx={{ p: 3, width: '100%', borderRadius: 2, background: "#fff" }}>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Order Summary
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" mb={1}>
                Items: {cartProducts.length}
              </Typography>
              <Typography variant="body1" mb={2}>
                Total: <b>${total.toFixed(2)}</b>
              </Typography>
              <Button variant="contained" color="primary" fullWidth>
                Proceed to Checkout
              </Button>
            </Card>
          </Grid>
        </Grid>
      )}
       {/* Snackbar */}
            <Snackbar
              open={snackbar.open}
              autoHideDuration={5000}
              onClose={() => setSnackbar({ ...snackbar, open: false })}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <Alert
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                severity={snackbar.severity}
                sx={{ width: '100%' }}
              >
                {snackbar.message}
              </Alert>
            </Snackbar>
    </Box>
  );
};

export default AddToCartPage;