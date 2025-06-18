import React, { useState } from 'react';


import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Link,
  Divider,
  CircularProgress
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Google,
  Facebook
} from '@mui/icons-material';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import app from '../firebaseConfig'; // Adjust the import path as needed
import { notify } from '../component/Notify';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const navigate = useNavigate();
  const role = useSearchParams()[0].get('role') || 'customer'; // Get role from URL paramsq
  // const { role } = useParams(); // If using URL params instead of search params
  console.log("Role from URL:", role); // Debugging line


  // Login.jsx (simplified logic)
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  // Optional: Add custom scopes or parameters
  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  // Login.jsx (simplified logic)

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      console.log("Google Sign-In User:", user);
      // Check if user is already in Firestore

       

      // Save role in localStorage or app state
      localStorage.setItem("userRole", role);
      localStorage.setItem("uid", user.uid);

      // Navigate to dashboard based on role
      if (role === "merchant") {
        navigate("/");
      } else {
        navigate("/");
      }

    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  // Add this function for Facebook sign-in
  const signInWithFacebook = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      // Save role in localStorage or app state
      localStorage.setItem("userRole", role);
      localStorage.setItem("uid", user.uid);
      // Navigate to dashboard based on role
      navigate("/");
    } catch (error) {
      console.error("Facebook Sign-In Error:", error);
      setSubmitError("Facebook Sign-In failed. Please try again.");
    }
  };

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Real-time validation
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!emailRegex.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;

      case 'password':
        if (!value) {
          error = 'Password is required';
        } else if (value.length < 6) {
          error = 'Password must be at least 6 characters long';
        }
        break;

      default:
        break;
    }

    return error;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear previous errors and validate
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    // Clear submit errors when user starts typing
    if (submitError) setSubmitError('');
    if (submitSuccess) setSubmitSuccess('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    // If there are errors, don't submit
    if (Object.keys(newErrors).length > 0) {
      setSubmitError('Please fix the errors above');
      return;
    }

    setLoading(true);
    setSubmitError('');
    setSubmitSuccess('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock authentication logic
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed in:", user);
     
      
        // Redirect after success
        localStorage.setItem("userRole", role);

        
          navigate('/');
          notify('success', 'Login Successful', `Welcome back, ${user.displayName || 'User'}!`);
      })
      
      
    } catch (error) {
      setSubmitError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle social login
  const handleSocialLogin = (provider) => {
    setSubmitError('');
    setSubmitSuccess(`${provider} login will be implemented here`);
  };

  // Toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      className=""
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        padding: 5
      }}
    >

      <Card
        sx={{
          maxWidth: 500,
        
          minWidth:'320px',
          boxShadow: 3,
          borderRadius: '15px',
          // background:'transparent'


        }}
        className=''
      >
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box textAlign="center" mb={3}>
            <Typography variant="h4" component="h1" gutterBottom>
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please sign in to your account
            </Typography>
          </Box>

          {/* Success/Error Messages */}
          {submitSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {submitSuccess}
            </Alert>
          )}

          {submitError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {submitError}
            </Alert>
          )}

          {/* Login Form */}
          <Box component="form" onSubmit={handleSubmit} noValidate>
            {/* Email Field */}
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              margin="normal"
              required
              autoComplete="email"
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color={errors.email ? 'error' : 'action'} />
                  </InputAdornment>
                ),
              }}
            />

            {/* Password Field */}
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              margin="normal"
              required
              autoComplete="current-password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color={errors.password ? 'error' : 'action'} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePassword}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Forgot Password Link */}
            <Box textAlign="right" mt={1} mb={2}>
              <Link
                href="#"
                variant="body2"
                onClick={(e) => {
                  e.preventDefault();
                  setSubmitSuccess('Password reset link will be sent to your email');
                }}
              >
                Forgot password?
              </Link>
            </Box>

            {/* Submit Button */}
            <Button
              className='shadow-none bg-gradient-to-tl  to-purple-400 from-pink-400 hover:from-pink-500 hover:to-purple-500'
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}

              sx={{ mt: 2, mb: 2, py: 1.5, backgroundColor: 'purple', color: 'white' }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Sign In'
              )}
            </Button>

            {/* Divider */}
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </Divider>

            {/* Social Login Buttons */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Google />}
                onClick={signInWithGoogle}
                sx={{ py: 1.5 }}
              >
                Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Facebook />}
                onClick={signInWithFacebook}
                sx={{ py: 1.5 }}
              >
                Facebook
              </Button>
            </Box>

            {/* Sign Up Link */}
            <Box textAlign="center">
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/register');
                  }}
                >
                  Sign up here
                </Link>
              </Typography>
            </Box>
          </Box>

        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
