import React, { useState } from 'react';
import AuthService from "../services/AuthService";
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarContent, SidebarFooter } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FaCog, FaLock, FaWrench, FaSignOutAlt } from 'react-icons/fa';
import { useDispatch } from "react-redux";

import { logoutUsuarioAction } from "../store/actions/usuarioActions";
import { logoutUnidadesAction } from "../store/actions/unidadesActions";
import { logoutTareasAction } from "../store/actions/tareasActions";
import { logoutGruposAction } from "../store/actions/gruposActions";
import { logoutCMDSAction } from "../store/actions/CMDSActions";

import { useHistory } from "react-router-dom";

import { Link } from "react-router-dom";
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
    dispatch( logoutUsuarioAction() );
    dispatch( logoutUnidadesAction() );
    dispatch( logoutTareasAction() );
    dispatch( logoutGruposAction() );
    dispatch( logoutCMDSAction() );
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
          <MenuItem icon={<FaLock />}>
            <Link to={'/panel'} className="text-light">Panel</Link>
          </MenuItem>
          <MenuItem icon={<FaWrench />}>
            <Link to={'/Equipos'} className="text-light">Equipos</Link>
          </MenuItem>
          <MenuItem icon={<FaCog />}>
            <Link to={'/Reglas'} className="text-light">Reglas</Link>
          </MenuItem>
        </Menu>
      </SidebarContent>
      <SidebarFooter>
          <Menu iconShape="circle">
            <MenuItem onClick={() => logOut()} icon={<FaSignOutAlt />}>Salir</MenuItem>
          </Menu>
      </SidebarFooter>
    </ProSidebar>
  );
}
 
export default MenuLateral;