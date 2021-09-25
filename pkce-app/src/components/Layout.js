import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useAuth } from 'react-oauth2-pkce'

import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

import { FaHome, FaUserAlt, FaSignOutAlt } from "react-icons/fa";

import './Layout.css'

const Layout = (props) => {
  const history = useHistory()
  const location = useLocation()
  const { pathname } = location

  const menu = [
    {
      name: 'Home',
      icon: <FaHome />,
      path: '/home',
    },
    {
      name: 'Profile',
      icon: <FaUserAlt />,
      path: '/profile',
    },
    {
      name: 'Logout',
      icon: <FaSignOutAlt />,
      path: '/',
    },
  ]
  
  const { authService } = useAuth();
  const logout = async () => authService.logout();

  const onMenuItem = (item) => {
    if(item.name !== 'Logout'){
      history.push(item.path)
    }
    else{
      logout()
    }
  }

  return (
    <div className="layout">
      <div className="menu">
        <ProSidebar>
          <Menu iconShape="square">
            {
              menu.map((item, index) => (
                <MenuItem key={index} icon={item.icon} onClick={()=>onMenuItem(item)}>{item.name}</MenuItem>
              ))
            }
          </Menu>
        </ProSidebar>
      </div>

      <div className="body">{props.children}</div>
    </div>
  )
}

export default Layout