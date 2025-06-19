import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  Divider,
  Alert,
  IconButton,
  InputAdornment
} from "@mui/material";
import { Google, Facebook, Visibility, VisibilityOff } from "@mui/icons-material";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import app from "../firebaseConfig"; // Adjust path as needed
import { useNavigate, useSearchParams } from "react-router";
import { notify } from "../component/Notify";

const auth = getAuth(app);

const SignUp = () => {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const role = useSearchParams()[0].get('role') || 'customer';
  const navigate = useNavigate();
  // Validation
  const validate = () => {
    const newErrors = {};
    if (!form.firstName) {
      newErrors.firstName = "First name is required";
    }
    if (!form.lastName) {
      newErrors.lastName = "Last name is required";
    }
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email";
    }
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setSubmitError("");
    setSubmitSuccess("");
  };

  // Email/Password Sign Up
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitError("");
    setSubmitSuccess("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      // Update displayName with first and last name
      await updateProfile(userCredential.user, {
      displayName: `${form.firstName} ${form.lastName}`
      });
      setSubmitSuccess("Sign up successful! You can now log in.");
      setForm({ firstName: "", lastName: "", email: "", password: "" });
      localStorage.setItem('role', role);
     
      notify('success','Success','Sign up successful!');
       navigate('/');
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
      setSubmitError("You already have an account, please login.");
      } else {
      setSubmitError(error.message);
      }
      console.log('Error during sign up:', error.message);
    }
  };

  // Google Sign In
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setSubmitSuccess("Signed up with Google!");
      localStorage.setItem('role', role);
     
      notify('success','Success','Sign up successful!');
       navigate('/');
    } catch (error) {
      setSubmitError(error.message);
    }
  };

  // Facebook Sign In
  const handleFacebookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      localStorage.setItem('role', role);
      setSubmitSuccess("Signed up with Facebook!");
      
      notify('success','Success','Sign up successful!');
      navigate('/');
    } catch (error) {
      setSubmitError(error.message);
    }
  };

  return (
    <Box minHeight="80vh" display="flex" alignItems="center" justifyContent="center" >
      <Paper elevation={6} sx={{ p: 4,maxWidth:500, minWidth: 340, borderRadius: 3, margin:10}}>
        
                  {/* Header */}
                  <Box textAlign="center" mb={3}>
                    <Typography variant="h4" component="h1" gutterBottom>
                      Welcome to Shopy
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Please sign-Up to your account
                    </Typography>
                  </Box>
        
                  {/* Success/Error Messages */}
                  {submitSuccess && (
                    <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>
                      {submitSuccess}
                    </Alert>
                  )}
        
                  {submitError && (
                    <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                      {submitError}
                    </Alert>
                  )}
        <form onSubmit={handleSubmit} noValidate>
          <Stack spacing={2}>
            <Box display="flex" className='gap-2' justifyContent="space-between">
              <TextField
              label="First Name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
            className="w-50"
              autoComplete="given-name"
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
              className="w-50"
              autoComplete="family-name"
            />
            </Box>
            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              autoComplete="email"
            />
            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              fullWidth
              autoComplete="new-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={!showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
           
          </Stack>
           <Button type="submit" className=' shadow-none bg-gradient-to-tl  to-purple-400 from-pink-400 hover:from-pink-500 hover:to-purple-500'
             variant="contained" color="primary" fullWidth sx={{ py: 1.5, marginTop: '30px', marginbottom:'20px'}}>
              Sign Up
            </Button>
        </form>
        <Divider sx={{ my: 2 }}>OR</Divider>
        <Stack spacing={1.5}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Google />}
            onClick={handleGoogleSignIn}
            sx={{ py: 1.5 }}
          >
            Sign up with Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Facebook />}
            onClick={handleFacebookSignIn}
            sx={{ py: 1.5 }}
          >
            Sign up with Facebook
          </Button>
        </Stack>
       
      </Paper>
    </Box>
  );
};

export default SignUp;