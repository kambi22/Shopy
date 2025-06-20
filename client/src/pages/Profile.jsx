import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Divider,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Person,
  Add,
  Edit,
  Delete,
  Logout,
  Dashboard,
  Inventory,
  Settings,
  AddShoppingCart,
  AddToPhotos
} from '@mui/icons-material';
import { SideContext } from '../context/SidebarContext';
import { getAuth } from 'firebase/auth';
import app from '../firebaseConfig';
import Swal from 'sweetalert2';
import { notify } from '../component/Notify';
import { useNavigate } from 'react-router';

const Profile = ({handleClose, currentUser, anchorEl}) => {
   
  const open = Boolean(anchorEl);
  const role = localStorage.getItem('userRole')
  const auth = getAuth(app)
  const navigate = useNavigate();

  

  // Render nothing or loading state while checking auth
  if (currentUser === null) {
    return null
  }

  // If not logged in
  // if (!currentUser) {
  //   return <div>Please sign in</div>;
  // }

  const LogoutConfirm = () => {
    Swal.fire({
      icon: 'warning',
      title: 'Logout',
      text: 'Are you sure you want to Logout',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes, Logout',
    }).then((resp) => {
      if (resp.isConfirmed) {
       console.log('Logout confirmed');
        auth.signOut().then(() => {
          console.log('User signed out successfully');
          localStorage.removeItem('userRole'); // Clear user role from local storage
          localStorage.removeItem('userId'); // Clear user ID from local storage
          localStorage.removeItem('userName'); // Clear user name from local storage
          localStorage.removeItem('userEmail'); // Clear user email from local storage
          notify('success', 'Logout Successful', 'You have been logged out successfully');
          handleClose(); // Close the menu
         navigate('/'); // Redirect to home page
        }).catch((error) => {
          console.error('Error signing out:', error);
        });
      }
    }).catch((error) => console.error('error', error));
  }


  const handleMenuAction = (action) => {
    console.log(`Action: ${action}`);
    handleClose();
    // Add your navigation logic here
  };

  return (
    <Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              p: 5,
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.32))',
              borderRadius: '10px',
              padding: '8px',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 50, // Increased width
                height: 50, // Increased height
                ml: -0.5,
                mr: 3,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center',p: 2 }}>
          {currentUser && currentUser.photoURL && currentUser.displayName ? (
            <Avatar
              alt={currentUser.displayName}
              src={currentUser.photoURL}
              sx={{ width: 50, height: 50,  }}
            />
          ) : currentUser && currentUser.displayName ? (
            <Avatar
              sizes="large"
              alt="Profile"
              sx={{ width: 50, height: 50, }}
            >
              {currentUser.displayName[0]}
            </Avatar>
          ) : (
            <Avatar
              sizes="large"
              alt="Profile"
              sx={{ width: 50, height: 50,  }}
            >
              U
            </Avatar>
          )}
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {currentUser.displayName || "User"}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {currentUser.email}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <MenuItem className="rounded-3" onClick={() => handleMenuAction('dashboard')}>
            <ListItemIcon>
              <Dashboard fontSize="small" />
            </ListItemIcon>
            <ListItemText>Dashboard</ListItemText>
          </MenuItem>

          {role === 'customer' ? (
            <MenuItem className="rounded-3" onClick={() => handleMenuAction('add-product')}>
              <ListItemIcon>
                <AddShoppingCart fontSize="small" />
              </ListItemIcon>
              <ListItemText>Cart Items</ListItemText>
            </MenuItem>
          ) : (
            <>
              <MenuItem className="rounded-3" onClick={() => navigate('/add-product')}>
                <ListItemIcon>
                  <AddToPhotos fontSize="small" />
                </ListItemIcon>
                <ListItemText>Add Product</ListItemText>
              </MenuItem>

              <MenuItem className="rounded-3" onClick={() => navigate('/edit-product')}>
                <ListItemIcon>
                  <Edit fontSize="small" />
                </ListItemIcon>
                <ListItemText>Edit Product</ListItemText>
              </MenuItem>
              <MenuItem className="rounded-3" onClick={() => handleMenuAction('edit-product')}>
                <ListItemIcon>
                  <Delete fontSize="small" />
                </ListItemIcon>
                <ListItemText>Delete Product</ListItemText>
              </MenuItem>
            </>
          )}

          <MenuItem className="rounded-3" onClick={() => handleMenuAction('settings')}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </MenuItem>

          <Divider />

          <MenuItem
            className="rounded-3"
            onClick={() => LogoutConfirm()}
            sx={{ color: 'error.main' }}
          >
            <ListItemIcon>
              <Logout fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
