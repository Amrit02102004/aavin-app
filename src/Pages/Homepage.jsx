import React from 'react'

import Navbar from '../Components/Common/Navbar'
import SidebarComponent from '../Components/SideBar'
import Profile from '../Components/Profile'
const Homepage = () => {
  return (
    <div>
      <SidebarComponent>
        <Profile/>
      </SidebarComponent>
    </div>
  )
}

export default Homepage
