import React, { useState } from 'react';
import AuthService from "../services/AuthService";
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarContent, SidebarFooter } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FaCog, FaLock, FaWrench, FaSignOutAlt, FaClipboardCheck, FaDesktop, FaSatelliteDish } from 'react-icons/fa';
import { useDispatch } from "react-redux";

import { logoutUsuarioAction } from "../store/actions/usuarioActions";
import { logoutUnidadesAction } from "../store/actions/unidadesActions";
import { logoutTareasAction } from "../store/actions/tareasActions";
import { logoutGruposAction } from "../store/actions/gruposActions";
import { logoutCMDSAction } from "../store/actions/CMDSActions";

import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import logo_escudo_intralix_blanco from "../img/logo-escudo-intralix-1.png";
import logo_chico_blanco from "../img/logo-chico-blanco.png";


const MenuLateral = () => {

  const history = useHistory();
  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(true);
  const [imgHeader, setImgHeader] = useState(logo_escudo_intralix_blanco);
  const outSidebar = () => {
    setCollapsed(true)
  }

  const openSidebar = () => {
    setCollapsed(false);
    let newImg = null;
    if(collapsed){
      newImg = logo_escudo_intralix_blanco;
    }else{
      newImg=logo_chico_blanco;
    }
    setImgHeader(newImg);
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
  return(
    <>
      <div className="topnav">
        <img src={logo_chico_blanco} width="150" />
        <div>
          <Link to={'/panel'} >
            <FaDesktop size="20" />
            Panel
          </Link>
            <Link to={'/Equipos'} >
              <FaSatelliteDish size="20" />
              Equipos
            </Link>
            <Link to={'/Reglas'} >
              <FaClipboardCheck size="20" />
              Reglas
            </Link>
            <Link className="salir" onClick={() => logOut()}>
              <FaSignOutAlt size="25" />
            </Link>
        </div>
      </div>
    </>
  )
  /*
  return (
    <ProSidebar
      className='sidebarinicio'
      collapsed={collapsed}
      breakPoint="md"
      onMouseLeave={() => outSidebar()}
    >
      <SidebarHeader className="sidebarHeader">
        <div
          style={{
            padding: '15px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: 18,
            letterSpacing: '1px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            textAlign: "-webkit-center"
          }}
        >
          {
            collapsed ?
            <img src={logo_escudo_intralix_blanco} width="50" onClick={() => openSidebar()} />
            :
            <img src={logo_chico_blanco} width="150" onClick={() => openSidebar()} />
          }
        </div>
      </SidebarHeader>
      <SidebarContent className="sidebarBody">
        <Menu iconShape="round">
          <MenuItem icon={<FaDesktop size="20" />}>
            <Link to={'/panel'} className="text-light">Panel</Link>
          </MenuItem>
          <MenuItem icon={<FaSatelliteDish size="20" />}>
            <Link to={'/Equipos'} className="text-light">Equipos</Link>
          </MenuItem>
          <MenuItem icon={<FaClipboardCheck size="20" />}>
            <Link to={'/Reglas'} className="text-light">Reglas</Link>
          </MenuItem>
        </Menu>
      </SidebarContent>
      <SidebarFooter className="sidebarFooter">
          <Menu iconShape="circle">
            <MenuItem onClick={() => logOut()} icon={<FaSignOutAlt size="20" />}>Salir</MenuItem>
          </Menu>
      </SidebarFooter>
    </ProSidebar>
  );
  */
}
export default MenuLateral;