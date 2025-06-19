import { useState } from 'react'

import './App.css'
import PWAInstallPrompt from './InstallButton'
import Routing from './Routing'
import Profile from './pages/Profile'


function App() {
  

  return (
   <div className="bg-gradient-to-tl  to-white from-purple-100 ">
    <PWAInstallPrompt/>
    <Routing/>
   </div>
     
      
  
  )
}

export default App
