import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { ArrowForward, ArrowBack, ArrowForwardIos } from '@mui/icons-material';

const HeroSection = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '400px', md: '500px' },
        maxWidth: '100%',
        minWidth: '300px',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${currentSlideData.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        transition: 'background-image 0.5s ease-in-out',
        margin:'50px',
        borderRadius: '10px',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            maxWidth: { xs: '100%', md: '50%' },
            textAlign: { xs: 'center', md: 'left' }
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontSize: { xs: '2rem', md: '3.5rem' },
              fontWeight: 700,
              mb: 1,
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}
          >
            {currentSlideData.title}
          </Typography>
          
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: '1.2rem', md: '1.8rem' },
              fontWeight: 400,
              mb: 2,
              color: theme.palette.warning.light
            }}
          >
            {currentSlideData.subtitle}
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', md: '1.1rem' },
              mb: 4,
              opacity: 0.9
            }}
          >
            {currentSlideData.description}
          </Typography>
          
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIos />}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              borderRadius: 2,
              backgroundColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            {currentSlideData.buttonText}
          </Button>
        </Box>
      </Container>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <Button
            onClick={prevSlide}
            sx={{
              position: 'absolute',
              left: 20,
              top: '50%',
              transform: 'translateY(-50%)',
              minWidth: 'auto',
              width: 50,
              height: 50,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)'
              }
            }}
          >
            <ArrowBack />
          </Button>
          
          <Button
            onClick={nextSlide}
            sx={{
              position: 'absolute',
              right: 20,
              top: '50%',
              transform: 'translateY(-50%)',
              minWidth: 'auto',
              width: 50,
              height: 50,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)'
              }
            }}
          >
            <ArrowForward />
          </Button>
        </>
      )}

      {/* Slide Indicators */}
      {slides.length > 1 && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 1
          }}
        >
          {slides.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentSlide(index)}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: index === currentSlide ? 'white' : 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default HeroSection;
