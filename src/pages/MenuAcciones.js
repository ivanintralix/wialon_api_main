import React, { useState } from 'react';
import { ProSidebar, SidebarHeader, SidebarContent, SidebarFooter } from 'react-pro-sidebar';
import { FaLock, FaArrowAltCircleDown, FaSearch } from 'react-icons/fa';
import { Accordion, Card, Button, InputGroup, FormControl } from 'react-bootstrap';
import 'react-pro-sidebar/dist/css/styles.css';
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';

const MenuAcciones = ({grupos, positionCurrentMarket}) => {
  grupos = grupos.filter(grupo => grupo.d.u.length > 0);
  const CMDSUnidades = useSelector(state => state.CMDS.unidadesCMDS);

  const gruposFiltrados = grupos => {
    const newGR = grupos.map( grupo => {
        let nuevasUnidades = grupo.d.u.map(Uni => {
            const unidadCcmd = CMDSUnidades.find(unidad => Uni === unidad.id);
            if (unidadCcmd !== undefined) {
                return Uni;
            }
        });
        nuevasUnidades = nuevasUnidades.filter( uni => uni !== undefined);
        //console.log(nuevasUnidades);
        if (nuevasUnidades.length > 0) {
            grupo.d.u = nuevasUnidades;
            return grupo;
        }
    });
    //console.log(newGR);
    const gruposFiltrados = newGR.filter(grupo => grupo !== undefined)
    return gruposFiltrados;
  };
  grupos = gruposFiltrados(grupos);
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });
  let unidades = useSelector(state => state.unidades.unidades);
  const [gruposModal, setGruposModal] = useState(grupos);
  const wialonObject = useSelector(state => state.usuario.user);

  const buscarUnidad = e => {
    e.preventDefault();
    const nombre = e.target.value.toUpperCase();
    const arrayGrupos = [];
    let tempGrupos = grupos;
    tempGrupos.forEach(grupo => {
      const arrayunidades = [];
      grupo.d.u.forEach(unidadGrupo => {
        unidades.forEach(unidad => {
          if (unidadGrupo === unidad.id) {
            if(unidad.nm.toUpperCase().search(nombre) !== -1){
              arrayunidades.push(unidadGrupo);
            }
          }
        });
      });
      arrayGrupos.push({
        f: grupo.f,
        i: grupo.i,
        d:{
          cls: grupo.d.cls,
          id:grupo.d.id,
          mu: grupo.d.mu,
          nm: grupo.d.nm,
          u:arrayunidades
        }
      });
    });
    setGruposModal(arrayGrupos);
  }
  const addDevice = e => {
    var total=document.getElementsByName(e.target.id).length;
    for(var i=0;i<total;i++){
      document.getElementsByName(e.target.id)[i].checked = e.target.checked;
    }
    //agregar unidades
  }
  const addAllDevices = (e,grupo) => {
    console.log(grupo);
    grupo.d.u.map(unidad => {
      var total=document.getElementsByName(unidad + "checkbox").length;
      for(var i=0;i<total;i++){
        document.getElementsByName(unidad + "checkbox")[i].checked = e.target.checked;
      }
    })
  }

  const cmdAlert = (e,comandoString) => {
    e.preventDefault();
    console.log(comandoString);
    const arrayU = [];
    const arrayUID = [];
    let stringU = "";
    unidades.forEach(unidad => {
      const chek = document.getElementById(unidad.id+"checkbox").checked;
      console.log(chek)
      if (chek) {
        arrayUID.push(unidad.id);
        arrayU.push(unidad.nm);
        stringU +=unidad.nm+"<br/>"
      }
    });
    console.log(arrayU);
    if (arrayU.length > 0) {
      Swal.fire({
        title: `Quieres enviar el comando ${comandoString}?`,
        html: `${stringU}`,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonColor: '#cc3300',
        focusConfirm: false,
        confirmButtonText: `Enviar`,
      }).then((result) => {
        console.log(result)
        if (result.value) {
          //Swal.fire('Comando enviado!', '', 'success')
          Swal.fire('Enviando comando', '', '')
          cmd(arrayUID,comandoString);
          Swal.showLoading();
        } else if (result.dismiss) {
          Swal.fire(`No se envio el comando ${comandoString}`, '', 'info')
        }
      })
    }else{
      Toast.fire({
        type: 'warning',
        title: 'Seleccione al menos una unidad'
      })
    }
    
  }
  const cmd = (arrayUID,comandoString) => {
    wialonObject.enviarComando(arrayUID,comandoString,function(data,arrayError) {
      console.log(data);
      if (data.error) {
        Swal.fire('No se envio el comando', '', 'warning')
      } else {
        if (arrayError.length) {
          let unidadesError = "";
          arrayError.forEach(unidad => {
            unidadesError +=unidad+"<br/>"
          });
          Swal.fire('No se envio el comando a las unidades', unidadesError, 'warning')
        } else {
          Swal.fire('Comando enviado', '', 'success')
        }
      }
    });
  }
  return (
      <>
      <ProSidebar className='sidebaracciones' >
        <SidebarHeader className="sidebarHeader">
          <div className='sidebarMNHeader' >
            <button className="successButton" onClick={ e => cmdAlert(e,"Posición") } >Abrir</button>{' '}
            <button className="warnigButton" onClick={ e => cmdAlert(e,"Posición") } >Restablecer</button>{' '}
            <button className="dangerButton" onClick={ e => cmdAlert(e,"Posición") } >Cerrar</button>{' '}
            <br></br><br></br>
            <InputGroup onChange={ buscarUnidad } size="sm" className="mb-3">
              <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-sm" className="iconBuscar" ><FaSearch /></InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl className="inputWhite"  aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
            </InputGroup>
          </div>
        </SidebarHeader>
        <SidebarContent className="sidebarBody">
          {/**Acordeon que me acumula todo un grupo */}
          {
            gruposModal.map(grupo => (
                grupo.d.u.length > 0 ?
                  (
                    <Accordion key={grupo.d.id + "G"} defaultActiveKey="0">
                      <Card>
                          <Card.Header >
                              <Accordion.Toggle as={Button} variant="" eventKey="1">
                                  <FaArrowAltCircleDown />{grupo.d.nm}
                              </Accordion.Toggle>
                              <input className="checboxGroup" type="checkbox" id={grupo.d.id + "checkbox"} onChange={ (e) => addAllDevices(e,grupo) } />
                          </Card.Header>
                          <Accordion.Collapse eventKey="1">
                              {/**Todas las unidades del grupo */}
                              <Card.Body style={{padding: "10px 10px 10px 20px", color: "#000000"}}>
                                {
                                  grupo.d.u.map(unidad => (
                                    <span key={unidad + "MA"} style={{cursor: "pointer"}} onClick={ () => positionCurrentMarket(unidad)}>
                                      <span><FaLock size={20} /> Unidad: {  (unidades.filter(unidad2 => unidad === unidad2.id))[0].nm  }</span>
                                      <input className="checbokUnidad" type="checkbox" id={unidad + "checkbox"} name={unidad + "checkbox"} onChange={ e => addDevice(e) } />
                                      <br></br>
                                    </span>
                                  ))
                                }
                              </Card.Body>
                          </Accordion.Collapse>
                      </Card>
                    </Accordion>
                  )
                  :
                    null
            ))
          }
        </SidebarContent>
        <SidebarFooter className="sidebarFooter">
          <div className="sidebar-btn-wrapper sidebarMNFooter" >
            <h2>Alertas</h2>
            <p style={{color: "red"}}>Unidad: 25789  Sistema violado</p>
            <p style={{color: "green"}}>Unidad: 25789  Chapa abierta</p>
            <p style={{color: "orange"}}>unidad: 25789  Chapa cerrada</p>
          </div>
        </SidebarFooter>
      </ProSidebar>
      </>
    );
}
export default MenuAcciones;