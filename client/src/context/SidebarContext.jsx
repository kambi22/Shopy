
import { useMediaQuery, useTheme } from "@mui/material";
import React, { createContext, useEffect, useState } from "react"

export const SideContext = createContext();

const SidebarContext = ({children}) => {
    
        const [open, setOpen] = useState(null);
        const [drawerWidth, setDrawerWidth] = useState(280);
         const theme = useTheme()
        
        
          const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
        
          console.log('is sm screen?', isSmallScreen)
        
          useEffect(()=>{
              if(isSmallScreen){
                setOpen(false)
              }else{
                setOpen(true)
             

              }
             
            
          },[]);


        // use in sidebar navbar
        const collapeDrawer  = () => {//for xl scree
        //   setOpen(true) by default only neet to change drawerwidth
          setDrawerWidth(55)
          
        };
          // use in sidebar sidebar
      const unCollapseDrawer = () => {//for xl scree
        //   setOpen(true) by default only neet to change drawerwidth
          setDrawerWidth(280)
      }
      
        // use in sidebar navbar
      const handleMobile = () => {//for sm scree
          setOpen(!open)//manually close full sidebar
        
        console.log('hadle mobile called')
      }

      // use in sidebar component
      const MobileClose = () => {// for sm
          setOpen(!open)// handle toggle on mobile screen
      }
  return (
 <SideContext.Provider value={{open, setOpen, drawerWidth,setDrawerWidth, collapeDrawer, unCollapseDrawer, handleMobile, MobileClose, isSmallScreen }}>
    {children}
 </SideContext.Provider>
  )
};
export default SidebarContext