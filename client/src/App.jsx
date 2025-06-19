import { useState } from 'react'

import './App.css'
import PWAInstallPrompt from './InstallButton'
import Routing from './Routing'
import Profile from './pages/Profile'
import AddProduct from './pages/AddProduct'


function App() {
  

  return (
   <div className="bg-gradient-to-t  to-gray-100 from-white h-full " >
    <PWAInstallPrompt/>
    <Routing/>
   </div>
     
      
  
  )
}

export default App
