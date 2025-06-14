import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  IconButton,
  Chip,
  Rating,
  Badge
} from '@mui/material';
import {
  FavoriteOutlined,
  Favorite,
  ShoppingCartOutlined,
  Visibility
} from '@mui/icons-material';

const ProductCard = ({ product, onAddToCart, onAddToWishlist, onQuickView }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleWishlistClick = () => {
    setIsWishlisted(!isWishlisted);
    onAddToWishlist?.(product);
  };

  const handleAddToCart = () => {
    onAddToCart?.(product);
  };

  const handleQuickView = () => {
    onQuickView?.(product);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card 
      sx={{ 
        height: '100%',
        width: '100%',
        display: 'flex',
        cursor: 'pointer',
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
          '& .product-actions': {
            opacity: 1,
            transform: 'translateY(0)'
          }
        }
      }}
    >
      {/* Product Badges */}
      <Box sx={{ position: 'absolute', top: 8, left: 8, zIndex: 2 }}>
        {product.isNew && (
          <Chip 
            label="New" 
            size="small" 
            color="success" 
            sx={{ mb: 0.5, display: 'block' }}
          />
        )}
        {discountPercentage > 0 && (
          <Chip 
            label={`-${discountPercentage}%`} 
            size="small" 
            color="error"
          />
        )}
      </Box>

      {/* Wishlist Button */}
      <IconButton
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 1)'
          }
        }}
        onClick={handleWishlistClick}
      >
        {isWishlisted ? (
          <Favorite color="error" />
        ) : (
          <FavoriteOutlined />
        )}
      </IconButton>

      {/* Product Image */}
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          height="250"
          image={product.image}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          sx={{
            objectFit: 'cover',
            transition: 'transform 0.3s ease-in-out',
            opacity: imageLoaded ? 1 : 0,
            '&:hover': {
              transform: 'scale(1.05)'
            }
          }}
        />
        
        {/* Loading placeholder */}
        {!imageLoaded && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Loading...
            </Typography>
          </Box>
        )}

        {/* Quick Actions Overlay */}
        <Box
          className="product-actions"
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
            p: 1,
            opacity: 0,
            transform: 'translateY(100%)',
            transition: 'all 0.3s ease-in-out'
          }}
        >
          <Button
            variant="outlined"
            size="small"
            startIcon={<ShoppingCartOutlined />}
            onClick={handleAddToCart}
            disabled={!product.inStock}
            sx={{ color: 'white', width:'100%' }}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
          <IconButton
            size="small"
            onClick={handleQuickView}
            sx={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)'
              }
            }}
          >
            <Visibility />
          </IconButton>
        </Box>
      </Box>

      {/* Product Info */}
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Brand */}
        <Typography 
          variant="caption" 
          color="text.secondary" 
          sx={{ textTransform: 'uppercase', letterSpacing: 0.5, mb: 0.5 }}
        >
          {product.brand}
        </Typography>

        {/* Product Name */}
        <Typography 
          variant="h6" 
          component="h3"
          sx={{ 
            mb: 1,
            fontSize: '1rem',
            fontWeight: 500,
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {product.name}
        </Typography>

        {/* Rating */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating 
            value={product.rating} 
            precision={0.1} 
            size="small" 
            readOnly 
          />
          <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
            ({product.reviews})
          </Typography>
        </Box>

        {/* Price */}
        <Box sx={{ mt: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography 
              variant="h6" 
              color="primary" 
              sx={{ fontWeight: 600 }}
            >
              ${product.price}
            </Typography>
            {product.originalPrice && product.originalPrice > product.price && (
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ textDecoration: 'line-through' }}
              >
                ${product.originalPrice}
              </Typography>
            )}
          </Box>
          
          {/* Stock Status */}
          <Typography 
            variant="caption" 
            color={product.inStock ? 'success.main' : 'error.main'}
            sx={{ fontWeight: 500 }}
          >
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
