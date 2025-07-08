import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Paper,
  Chip,
  Stack,
  useTheme,
  useMediaQuery,
  Divider
} from '@mui/material';
import {
  Store as StoreIcon,
  LocalShipping as ShippingIcon,
  Security as SecurityIcon,
  Support as SupportIcon,
  Star as StarIcon,
  Timeline as TimelineIcon,
  Group as GroupIcon,
  Verified as VerifiedIcon
} from '@mui/icons-material';

const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const features = [
    {
      icon: <StoreIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Wide Product Range',
      description: 'Discover thousands of products across multiple categories with the latest trends and best quality items.'
    },
    {
      icon: <ShippingIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Fast Delivery',
      description: 'Get your orders delivered quickly with our efficient logistics network and same-day delivery options.'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Secure Shopping',
      description: 'Shop with confidence using our secure payment gateway and advanced encryption technology.'
    },
    {
      icon: <SupportIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: '24/7 Support',
      description: 'Our dedicated customer support team is available round the clock to assist you with any queries.'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Happy Customers' },
    { number: '10K+', label: 'Products' },
    { number: '100+', label: 'Brands' },
    { number: '99%', label: 'Satisfaction Rate' }
  ];

  const teamMembers = [
    {
      name: 'Satnam Singh',
      role: 'CEO & Founder',
      image: 'https://res.cloudinary.com/dr5ziuzrg/image/upload/v1751882786/My_profile_sjdhtr.jpg',
      description: 'Visionary leader with 15+ years in e-commerce'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      description: 'Tech expert driving innovation and platform development'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Marketing',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      description: 'Creative strategist building brand connections'
    },
    {
      name: 'David Kim',
      role: 'Operations Manager',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      description: 'Logistics expert ensuring smooth operations'
    }
  ];

  const milestones = [
    { year: '2020', event: 'Shopy was founded with a vision to revolutionize online shopping' },
    { year: '2021', event: 'Reached 10,000 customers and expanded product categories' },
    { year: '2022', event: 'Launched mobile app and introduced same-day delivery' },
    { year: '2023', event: 'Achieved 50,000+ satisfied customers and 99% satisfaction rate' },
    { year: '2024', event: 'Expanding internationally and introducing AI-powered recommendations' }
  ];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant={isMobile ? 'h3' : 'h2'}
                component="h1"
                fontWeight="bold"
                sx={{ mb: 3 }}
              >
                About Shopy
              </Typography>
              <Typography
                variant="h6"
                sx={{ mb: 4, opacity: 0.9, lineHeight: 1.6 }}
              >
                Your trusted partner in online shopping, delivering quality products 
                and exceptional experiences since 2020.
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap">
                <Chip
                  icon={<VerifiedIcon />}
                  label="Trusted Platform"
                  sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
                />
                <Chip
                  icon={<StarIcon />}
                  label="5-Star Rated"
                  sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
                />
                <Chip
                  icon={<GroupIcon />}
                  label="50K+ Customers"
                  sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Paper
                  elevation={10}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{ mb: 2 }}>
                    Our Mission
                  </Typography>
                  <Typography variant="body1" textAlign="center" sx={{ opacity: 0.9 }}>
                    To make online shopping accessible, enjoyable, and trustworthy for everyone, 
                    while supporting businesses and communities worldwide.
                  </Typography>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  color: 'white',
                  transform: 'translateY(0)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)'
                  }
                }}
              >
                <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }}>
                  {stat.number}
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  {stat.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ backgroundColor: 'white', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            textAlign="center"
            fontWeight="bold"
            sx={{ mb: 2, color: 'text.primary' }}
          >
            Why Choose Shopy?
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            color="text.secondary"
            sx={{ mb: 6, maxWidth: '600px', mx: 'auto' }}
          >
            We're committed to providing you with the best online shopping experience 
            through our innovative features and dedicated service.
          </Typography>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card
                  elevation={2}
                  sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      elevation: 8,
                      transform: 'translateY(-5px)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          backgroundColor: 'primary.light',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                          {feature.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {feature.description}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Our Story Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              component="h2"
              fontWeight="bold"
              sx={{ mb: 3, color: 'text.primary' }}
            >
              Our Story
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 3, lineHeight: 1.8, color: 'text.secondary' }}
            >
              Founded in 2020, Shopy began as a small startup with a big dream: to create 
              an online shopping platform that truly puts customers first. What started as 
              a team of five passionate individuals has grown into a thriving company serving 
              thousands of customers worldwide.
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 3, lineHeight: 1.8, color: 'text.secondary' }}
            >
              We believe that shopping should be more than just a transaction – it should be 
              an experience that brings joy, convenience, and value to your life. That's why 
              we've built our platform with cutting-edge technology, partnered with trusted 
              brands, and assembled a team of dedicated professionals who share our vision.
            </Typography>
            <Typography
              variant="body1"
              sx={{ lineHeight: 1.8, color: 'text.secondary' }}
            >
              Today, we're proud to be a trusted name in e-commerce, but we're just getting 
              started. Our commitment to innovation, quality, and customer satisfaction drives 
              us to continuously improve and expand our offerings.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={4}
              sx={{
                p: 4,
                borderRadius: 4,
                background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <TimelineIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Typography variant="h5" fontWeight="bold">
                  Our Journey
                </Typography>
              </Box>
              <Stack spacing={3}>
                {milestones.map((milestone, index) => (
                  <Box key={index} sx={{ display: 'flex', gap: 2 }}>
                    <Chip
                      label={milestone.year}
                      size="small"
                      sx={{
                        backgroundColor: 'primary.main',
                        color: 'white',
                        fontWeight: 'bold',
                        minWidth: '60px'
                      }}
                    />
                    <Typography variant="body2" sx={{ flex: 1, pt: 0.5 }}>
                      {milestone.event}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Team Section */}
      <Box sx={{ backgroundColor: 'white', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            textAlign="center"
            fontWeight="bold"
            sx={{ mb: 2, color: 'text.primary' }}
          >
            Meet Our Team
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            color="text.secondary"
            sx={{ mb: 6, maxWidth: '600px', mx: 'auto' }}
          >
            The passionate individuals behind Shopy who work tirelessly to bring you 
            the best shopping experience.
          </Typography>

          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  elevation={3}
                  sx={{
                    textAlign: 'center',
                    borderRadius: 3,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: theme.shadows[10]
                    }
                  }}
                >
                  <Box
                    sx={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      p: 3,
                      color: 'white'
                    }}
                  >
                    <Avatar
                      src={member.image}
                      alt={member.name}
                      sx={{
                        width: 100,
                        height: 100,
                        mx: 'auto',
                        mb: 2,
                        border: '4px solid white'
                      }}
                    />
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                      {member.name}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      {member.role}
                    </Typography>
                  </Box>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {member.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Values Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          fontWeight="bold"
          sx={{ mb: 6, color: 'text.primary' }}
        >
          Our Values
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                textAlign: 'center',
                borderRadius: 3,
                height: '100%',
                background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
              }}
            >
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, color: 'white' }}>
                Customer First
              </Typography>
              <Typography variant="body1" sx={{ color: 'white', opacity: 0.9 }}>
                Every decision we make is guided by what's best for our customers. 
                Your satisfaction is our top priority.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                textAlign: 'center',
                borderRadius: 3,
                height: '100%',
                background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
              }}
            >
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, color: 'white' }}>
                Innovation
              </Typography>
              <Typography variant="body1" sx={{ color: 'white', opacity: 0.9 }}>
                We continuously innovate to improve our platform and provide you with 
                cutting-edge shopping experiences.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                textAlign: 'center',
                borderRadius: 3,
                height: '100%',
                background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
              }}
            >
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, color: 'white' }}>
                Integrity
              </Typography>
              <Typography variant="body1" sx={{ color: 'white', opacity: 0.9 }}>
                We conduct business with honesty, transparency, and ethical practices 
                in everything we do.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Contact CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 6, md: 8 },
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
            Ready to Start Shopping?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of satisfied customers and discover amazing products at great prices.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Paper
              sx={{
                px: 3,
                py: 1,
                backgroundColor: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: 2
              }}
            >
              <Typography variant="body1" sx={{ color: 'white' }}>
                📧 support@shopy.com
              </Typography>
            </Paper>
            <Paper
              sx={{
                px: 3,
                py: 1,
                backgroundColor: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: 2
              }}
            >
              <Typography variant="body1" sx={{ color: 'white' }}>
                📞 1-800-SHOPY-24
              </Typography>
            </Paper>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default About;