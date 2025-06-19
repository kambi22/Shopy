import React, { useState } from "react";
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
  Divider
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// Example cart items (replace with your state or props)
const initialCart = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    brand: "TechSound",
    price: 89.99,
    originalPrice: 129.99,
    discount: 31,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 128,
    category: "Electronics",
    inStock: true,
    isNew: false,
    isFeatured: true,
      quantity: 1
    
  },
  {
    id: 2,
    name: "Premium Cotton T-Shirt",
    brand: "StyleWear",
    price: 24.99,
    originalPrice: 34.99,
    discount: 29,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    rating: 4.2,
    reviews: 89,
    category: "Fashion",
    inStock: true,
    isNew: true,
    isFeatured: false,
    quantity: 2
  },
];

const AddToCartPage = () => {
  const [cart, setCart] = useState(initialCart);

  const handleRemove = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id, delta) => {
    setCart(cart =>
      cart.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Box sx={{ py: 6, px: { xs: 2, md: 8 }, minHeight: "80vh",}}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Your Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          Your cart is empty.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          <Grid item size={{ xs: 12, sm:12, md: 6, xl:6  }} sx={{ mb: 4 }}>
            {cart.map((item) => (
              <Card
                key={item.id}
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
                  image={item.image}
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
                      onClick={() => handleQuantityChange(item.id, -1)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </Button>
                    <Typography mx={2}>{item.quantity}</Typography>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleQuantityChange(item.id, 1)}
                    >
                      +
                    </Button>
                  </Box>
                </CardContent>
                <CardActions>
                  <IconButton color="error" onClick={() => handleRemove(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            ))}
          </Grid>
          <Grid size={{ xs: 12, sm:12, md: 6, xl:6  }} className=" w-full">
            <Card sx={{ p: 3, width:'100%', borderRadius: 2,  background: "#fff" }}>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Order Summary
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" mb={1}>
                Items: {cart.length}
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
    </Box>
  );
};

export default AddToCartPage;