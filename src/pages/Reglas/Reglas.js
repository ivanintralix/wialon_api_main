import React, { useState } from 'react';
import { Accordion, Card, Button, Container, Row, Col } from 'react-bootstrap';
import { FaLock, FaSearch, FaArrowAltCircleDown, FaTasks } from 'react-icons/fa';
import { useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";

import NuevaRegla from "./NuevaRegla";
import Jobs from "./Jobs";
import VerUnidades from "./VerUnidades";
import EditarRegla from "./EditarRegla";
import Main from '../Main';

const Reglas = () => {
    
    const usuario =  useSelector(state => state.usuario);
    let unidades = useSelector(state => state.unidades.unidades);
    let grupos = useSelector(state => state.grupos.grupos);
    grupos = grupos.filter(grupo => grupo.d.u.length > 0);
    const [gruposModal, setGruposModal] = useState(grupos);
    const [nuevaRegla, setNuevaRegla] = useState(false);
    const jobs = useSelector(state => state.tareas.tareas)
    const [jobsModal, setJobsModal] = useState([]); 
    const [verUnidades, setVerunidades] = useState(false);
    //const [unidadesJob, setUnidadesJob] = useState([]);
    const [jobId,setJobId] = useState(0);
    const [editarRegla, setEditarRegla] = useState(false);
    
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
    const confirmNuevaRegla = e => {
        e.preventDefault();
        /*
        const arrayU = [];
        const arrayUID = [];
        let stringU = "";
        unidades.forEach(unidad => {
            const chek = document.getElementById(unidad.id+"checkbox");
            if (chek !== null) {
                //console.log(chek.checked)
                if (chek.checked) {
                    arrayUID.push(unidad.id);
                    arrayU.push(unidad.nm);
                    stringU +=unidad.nm+"<br/>"
                }    
            }
            
        });*/
        setNuevaRegla(true);
    }
    const showJobsUnit = (e,unidad) => {
        e.preventDefault();
        console.log(unidad)
        let jobsModalTemp = [];
        jobs.forEach(job => {
            let flag = false;
            job.unidades.forEach(unidadJob => {
                if (unidadJob === unidad) {
                    flag = true;
                }
            });
            if (flag) {
                jobsModalTemp.push(job);
            }
        });
        console.log(jobsModalTemp);
        setJobsModal(jobsModalTemp);
    }
    const showJobsGroup = (e,groupId) => {
        e.preventDefault();
        const currentGroup = grupos.filter(grupo => (grupo.d.id === groupId));
        console.log(currentGroup);
        let jobsModalTemp = [];
        jobs.forEach(job => {
            let flag = false;
            job.unidades.forEach(unidadJob => {
                currentGroup[0].d.u.forEach(unidadesG => {
                    if (unidadJob === unidadesG) {
                        flag = true;
                    } 
                });
            });
            if (flag) {
                jobsModalTemp.push(job);
            }
        });
        console.log(jobsModalTemp);
        setJobsModal(jobsModalTemp);
    }
    const unitsJobs = (e,jobId) => {
        e.preventDefault();
        console.log(jobId);
        const unidadesJob = [];
        jobsModal.forEach(job => {
            if (job.id === jobId) {
                job.unidades.forEach(jobU => {
                    const unidad = unidades.filter(unidad => jobU === unidad.id);
                    console.log(unidad)
                    unidadesJob.push({id: unidad[0].id,nm: unidad[0].nm});
                });
            }
        });
        console.log(unidadesJob);
        setJobId(jobId);
        //setUnidadesJob(unidadesJob);
        setVerunidades(true);
    }
    const editJob = (e,jobId) => {
        e.preventDefault();
        setJobId(jobId);
        setEditarRegla(true);
    }
    return ( 
        <Main>
            <Container className="containerReglas">
                <Row>
                    <Col xs lg="6">
                        {
                            !verUnidades ?    
                                <Card>
                                    <Card.Body style={{overflowY:"auto"}} >
                                        <Card.Title style={{ margin:"10px 0 10px 0", textAlign:"-webkit-right"}}>
                                            <button onClick={ e => confirmNuevaRegla(e) }>Nueva regla</button>
                                        </Card.Title>
                                        <Card.Title style={{ margin:"10px 0 10px 0" }}>
                                            <input onChange={ e => buscarUnidad(e) } id="inputGroup-sizing-sm" className="inputBlack" /><FaSearch />
                                        </Card.Title>
                                        <div style={{overflowY:"auto",height: "800px"}}>
                                        {
                                            gruposModal.length > 0 ?
                                                gruposModal.map(grupo => (
                                                    grupo.d.u.length > 0 ? 
                                                    (
                                                        <Accordion key={grupo.d.id + "G"} defaultActiveKey="0">
                                                        <Card>
                                                            <Card.Header style={{textAlign:"left"}}>
                                                                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                                                    <FaArrowAltCircleDown />{grupo.d.nm}
                                                                </Accordion.Toggle>
                                                                <span><FaTasks onClick={e => showJobsGroup(e,grupo.d.id)}></FaTasks></span>
                                                                <input className="checbokGroup" type="checkbox" id={grupo.d.id + "checkbox"} onChange={ (e) => addAllDevices(e,grupo) } />
                                                            </Card.Header>
                                                            <Accordion.Collapse eventKey="1">
                                                                {/**Todas las unidades del grupo */}
                                                                <Card.Body style={{padding: "10px 10px 10px 45px", color: "#000000", textAlign:"left" }}>
                                                                    {
                                                                        grupo.d.u.map(unidad => (
                                                                            <span key={unidad + "MA"} style={{cursor: "pointer"}} >
                                                                            <span><FaLock size={20} /> Unidad: 
                                                                            {  
                                                                                (unidades.filter(unidad2 => unidad === unidad2.id))[0].nm 
                                                                            }</span>
                                                                            <FaTasks onClick={e => showJobsUnit(e,unidad)}></FaTasks>
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
                                            :
                                                null
                                        }
                                        </div>
                                    </Card.Body>
                                </Card>
                            :
                                null
                        }
                    </Col>
                    <Col xs lg="6">
                    {
                        nuevaRegla ? 
                            <NuevaRegla 
                                setNuevaRegla={setNuevaRegla}
                            />
                        :
                            null
                    }
                    {   
                        jobsModal.length > 0 ?
                            <Jobs 
                                unitsJobs={unitsJobs}
                                jobsModal={jobsModal}
                                editJob={editJob}
                            />
                        :
                            null
                    }
                    {
                        verUnidades ? 
                            <VerUnidades 
                                setVerunidades={setVerunidades}
                                jobId={jobId}
                            />
                        :
                            null
                    }
                    {
                        editarRegla ?
                        <EditarRegla 
                            jobId={jobId}
                            setEditarRegla={setEditarRegla}
                        />
                        :
                        null
                    }
                    </Col>
                </Row>
            </Container>
            
        </Main>
    );
}
 
export default Reglas;