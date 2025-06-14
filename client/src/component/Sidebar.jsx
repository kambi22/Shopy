import React, { useContext, useState } from 'react';
import { easing, styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import DevicesIcon from '@mui/icons-material/Devices';
import KitchenIcon from '@mui/icons-material/Kitchen';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import BookIcon from '@mui/icons-material/Book';
import { SideContext } from '../context/SidebarContext';
import { Link } from 'react-router-dom';
import { ChevronRight } from '@mui/icons-material';

const GradientDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiPaper-root': {
    background: 'linear-gradient(90deg, #a18cd1 0%, #fbc2eb 100%)',
    color: '#fff',
   
    transition: 'width 0.1s',
    easing: easing.easeInOut,
   
  },
}));

const categories = [
  { label: 'Clothes', icon: <CheckroomIcon />, path: '/products?cat=clothes' },
  { label: 'Fashion', icon: <LocalMallIcon />, path: '/products?cat=fashion' },
  { label: 'Electronics', icon: <DevicesIcon />, path: '/products?cat=electronics' },
  { label: 'Home Stuff', icon: <KitchenIcon />, path: '/products?cat=home' },
  { label: 'Sports', icon: <SportsSoccerIcon />, path: '/products?cat=sports' },
  { label: 'Kids', icon: <ChildCareIcon />, path: '/products?cat=kids' },
  { label: 'Books', icon: <BookIcon />, path: '/products?cat=books' },
];

export default function Sidebar() {
  const [unCollapse, setunCollapse] = useState(false);
  const { open, setOpen, drawerWidth, collapeDrawer, setDrawerWidth, unCollapseDrawer, MobileClose, isSmallScreen } = useContext(SideContext);

  const setOpenImportant = () => {
    unCollapseDrawer();
    setunCollapse(true);
  };
  const setCollapseImportant = () => {
 
    collapeDrawer();
    setunCollapse(false);
    
  
  };

  console.log('collaps', collapeDrawer, 'unCollapseDrawer', unCollapseDrawer);

  return (
    <GradientDrawer
      className="transition-all ease-in duration:3000"
      onMouseEnter={!unCollapse? unCollapseDrawer:null}
       onMouseLeave={unCollapse? unCollapseDrawer:collapeDrawer}   
        variant={isSmallScreen? 'temporary': 'persistent'}  
        sx={{width:drawerWidth}} open={open} onClose={MobileClose}
      
    >
      <Divider />
     
      <List sx={{ width: drawerWidth }} onClick={unCollapse ? null : setOpenImportant }
       className="transition-all ease-in duration:3000">
        <ListItemButton  onClick={unCollapse ? setCollapseImportant : null }>
          <ListItemIcon sx={{ color: "#fff" }}>
            {drawerWidth===280 ? <ChevronLeftIcon /> : <ChevronRight  />}
          </ListItemIcon>
          <ListItemText primary="Category" />
        </ListItemButton>
      
        <Divider />
        {categories.map((cat) => (
          <ListItemButton
            key={cat.label}
            component={Link}
            to={cat.path}
            sx={{
              color: "#fff",
              '&:hover': {
                background: 'rgba(255,255,255,0.08)',
              },
            }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>{cat.icon}</ListItemIcon>
            <ListItemText primary={cat.label} />
          </ListItemButton>
        ))}
      </List>
    </GradientDrawer>
  );
}
