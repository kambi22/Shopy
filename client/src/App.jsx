import { useState } from 'react'

import './App.css'
import PWAInstallPrompt from './InstallButton'
import Routing from './Routing'
import Profile from './pages/Profile'


function App() {
  

  return (
   <div className="bg-gradient-to-tl  to-purple-100 from-white">
    <PWAInstallPrompt/>
    <Routing/>
   </div>
     
      
  
  )
}

export default App
