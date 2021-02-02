import React, { useState, useEffect } from 'react';
import AuthService from "../services/AuthService";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent, SidebarFooter } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FaCog, FaLock, FaWrench, FaSignOutAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../store/actions/usuarioActions";
import { useHistory } from "react-router-dom";
const MenuLateral = () => {

  const history = useHistory();
  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(true);
  
  const outSidebar = () => {
    setCollapsed(true)
  }

  const openSidebar = () => {
    setCollapsed(false)
  }

  const logOut = () => {
    AuthService.logout();
    dispatch( logoutAction() );
    history.push('/login');
  }
  return ( 
    <ProSidebar
      className='sidebarinicio'
      collapsed={collapsed}
      breakPoint="md"
      onMouseLeave={() => outSidebar()}
    >
      <SidebarHeader>
        <div
          style={{
            padding: '24px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: 14,
            letterSpacing: '1px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          <FaLock 
            onClick={() => openSidebar()}
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape="round">
          <MenuItem icon={<FaLock />}>Panel</MenuItem>
          <MenuItem icon={<FaWrench />}>Equipos</MenuItem>
          <MenuItem icon={<FaCog />}>Programción</MenuItem>
        </Menu>
        
      </SidebarContent>
      <SidebarFooter>
          <Menu iconShape="circle">
            <MenuItem onClick={() => logOut()} icon={<FaSignOutAlt />}>Salir</MenuItem>
            <MenuItem icon={<FaCog />}>Editar usuario</MenuItem>
          </Menu>
      </SidebarFooter>
    </ProSidebar>
  );
}
 
export default MenuLateral;