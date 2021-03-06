import React, { useState, useEffect } from 'react';
import { Accordion, Card, Button, Container, Row, Col } from 'react-bootstrap';
import { FaLock, FaSearch, FaArrowAltCircleDown, FaTasks } from 'react-icons/fa';
import { useSelector, useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";

import NuevaRegla from "./NuevaRegla";
import Jobs from "./Jobs";
import VerUnidades from "./VerUnidades";
import EditarRegla from "./EditarRegla";
import Main from '../Main';

import { CMDSDefault } from "../../config/CMDS";
import { createJobAction, deleteJobAction, activateJobsAction, deactivateJobsAction } from "../../store/actions/tareasActions";
import preloader from "../../img/preloader.svg";
const Reglas = () => {

    const dispatch = useDispatch();

    const loading = useSelector(state => state.tareas.loadingData)
    const usuario =  useSelector(state => state.usuario);
    let unidades = useSelector(state => state.unidades.unidades);
    const CMDSUnidades = useSelector(state => state.CMDS.unidadesCMDS)
    let grupos = useSelector(state => state.grupos.grupos);
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
    console.log(grupos);
    const [gruposModal, setGruposModal] = useState(grupos);
    const [nuevaRegla, setNuevaRegla] = useState(false);
    const jobs = useSelector(state => state.tareas.tareas)
    const [jobsModal, setJobsModal] = useState([]);
    const [verUnidades, setVerunidades] = useState(false);
    //const [unidadesJob, setUnidadesJob] = useState([]);
    const [jobId,setJobId] = useState(0);
    const [editarRegla, setEditarRegla] = useState(false);
    const [comandoNuevaRegla, setComandoNuevaRegla] = useState(CMDSDefault[0].cmd_name);
    const [unidadesCheck,setUnidadesCheck] = useState([]);
    const wialonObject = useSelector(state => state.usuario.user);
    useEffect(() => {
        jobsModal.forEach(jobModal => {
            const found = jobs.find(job => job.id === jobModal.id );
            if (!found) {
                setJobsModal(jobsModal.filter(jobModal2 => jobModal.id !== jobModal2.id));
            }
        });
    }, [jobs]);
    const addUnitNewJob = (tarea) => {
        console.log(tarea);
        tarea.unidades = unidadesCheck;
        const CurrentCMD = CMDSDefault.find(cmd => cmd.cmd_name === tarea.cmd);
        tarea.cmd = CurrentCMD;
        //wialonObject.createNewJob(tarea);
        dispatch(createJobAction(tarea,wialonObject));
    }
    const filtrarUnidadesComando = (e,comando) => {
        const CurrentCMD = CMDSDefault.find(cmd => cmd.cmd_name === comando);
        console.log(CurrentCMD)
        grupos.forEach(grupo => {
            grupo.d.u.forEach(unidad => {
                var total = document.getElementsByName(unidad + "SpanGrupoTareas").length;
                for(var i=0;i<total;i++){
                    const domElement = document.getElementsByName(unidad + "SpanGrupoTareas")[i];
                    domElement.style.color = "#1269b3";
                }
                var total = document.getElementsByName(unidad + "checkbox").length;
                for(var i=0;i<total;i++){
                    document.getElementsByName(unidad + "checkbox")[i].disabled = false;
                }
            });
        });

        let arrayUnidadesCBF = unidadesCheck;
        grupos.forEach(grupo => {
            grupo.d.u.forEach(unidad => {
                const foundUnidadCMDS = CMDSUnidades.find(cmdsunidad => cmdsunidad.id === unidad);
                if (foundUnidadCMDS) {
                    console.log(foundUnidadCMDS);
                    const found = foundUnidadCMDS.cmds.find(cmd => cmd.n === CurrentCMD.cmd_name && CurrentCMD.cmd_type === cmd.c);
                    if (!found) {
                        arrayUnidadesCBF = arrayUnidadesCBF.filter( unidadCB => unidadCB !== foundUnidadCMDS.id)
                        var total = document.getElementsByName(unidad + "SpanGrupoTareas").length;
                        for(var i=0;i<total;i++){
                            const domElement = document.getElementsByName(unidad + "SpanGrupoTareas")[i];
                            domElement.style.color = "#dc3545";
                        }
                        var total = document.getElementsByName(unidad + "checkbox").length;
                        for(var i=0;i<total;i++){
                            document.getElementsByName(unidad + "checkbox")[i].checked = false;
                            document.getElementsByName(unidad + "checkbox")[i].disabled = true;
                        }
                    }
                }
            });
        });
        setUnidadesCheck(arrayUnidadesCBF);
        setComandoNuevaRegla(CurrentCMD);
    }
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
        var total = document.getElementsByName(e.target.id).length;
        for(var i=0;i<total;i++){
            document.getElementsByName(e.target.id)[i].checked = e.target.checked;
        }
        const CCB = document.getElementById(e.target.id);
        console.log(e.target.id);
        console.log(e.target.id.replace("checkbox", ""))
        const NUC = parseInt(e.target.id.replace("checkbox", ""));
        if (CCB.checked) {
            setUnidadesCheck([...unidadesCheck,NUC]);
        }else{
            setUnidadesCheck(unidadesCheck.filter( unidadCB => unidadCB !== NUC))
        }
        //agregar unidades
    }
    const addAllDevices = (e,grupo) => {
        console.log(grupo);
        let arrayUnidadesCB = [];
        grupo.d.u.map(unidad => {
            var total=document.getElementsByName(unidad + "checkbox").length;
            for(var i=0;i<total;i++){
                if(!document.getElementsByName(unidad + "checkbox")[i].disabled){
                    document.getElementsByName(unidad + "checkbox")[i].checked = e.target.checked;
                }
            }
            const VCB = unidadesCheck.filter(unidadCB => unidad === unidadCB );
            if (VCB.length <= 0) {
                if(!document.getElementsByName(unidad + "checkbox")[0].disabled){
                    arrayUnidadesCB.push(unidad);
                }
            }
        })
        if (e.target.checked) {
            arrayUnidadesCB = unidadesCheck.concat(arrayUnidadesCB);
            setUnidadesCheck(arrayUnidadesCB);
        }else{
            arrayUnidadesCB = unidadesCheck;
            grupo.d.u.forEach(unidad => {
                arrayUnidadesCB = arrayUnidadesCB.filter( unidadCB => unidadCB !== unidad)
            });
            console.log(arrayUnidadesCB);
            setUnidadesCheck(arrayUnidadesCB);
        }
    }
    const confirmNuevaRegla = e => {
        e.preventDefault();
        setJobsModal([]);
        filtrarUnidadesComando(null,CMDSDefault[0].cmd_name);
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
    const deleteJob = (e,jobId) => {
        e.preventDefault();
        console.log(jobId);
        dispatch( deleteJobAction(jobId,wialonObject) );
    }
    const activateJob = (e,jobId) => {
        e.preventDefault();
        console.log(jobId);
        dispatch( activateJobsAction(jobId, wialonObject) )
    }
    const deactivateJob = (e,jobId) => {
        e.preventDefault();
        console.log(jobId);
        dispatch( deactivateJobsAction(jobId, wialonObject) )
    }
    return (
        <Main>
            <Container className="reglasBody">
                <Row>
                    <Col xs lg="6">
                        {
                            !verUnidades ?
                                <Card>
                                    <Card.Body style={{overflowY:"auto"}} >
                                        <Card.Title style={{ margin:"10px 0 10px 0", textAlign:"-webkit-right"}}>
                                            <button className="successButton" onClick={ e => confirmNuevaRegla(e) }>Nueva regla</button>
                                        </Card.Title>
                                        <Card.Title style={{ margin:"10px 0 10px 0" }}>
                                            <input onChange={ e => buscarUnidad(e) } id="inputGroup-sizing-sm" className="inputBlack" /><FaSearch />
                                        </Card.Title>
                                        <div className="divGruposReglas">
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
                                                                <span>
                                                                    <FaTasks onClick={e => showJobsGroup(e,grupo.d.id)}></FaTasks>
                                                                    <input className="checboxGroup" type="checkbox" id={grupo.d.id + "checkbox"} onChange={ (e) => addAllDevices(e,grupo) } />
                                                                </span>
                                                            </Card.Header>
                                                            <Accordion.Collapse eventKey="1">
                                                                {/**Todas las unidades del grupo */}
                                                                <Card.Body style={{padding: "10px 10px 10px 45px", color: "#000000", textAlign:"left" }}>
                                                                    {
                                                                        grupo.d.u.map(unidad => (
                                                                            <span key={unidad + "MA"} style={{cursor: "pointer"}} >
                                                                            <span onClick={e => showJobsUnit(e,unidad)} name={unidad+"SpanGrupoTareas"} ><FaLock size={20} /> Unidad:
                                                                                {
                                                                                    (unidades.filter(unidad2 => unidad === unidad2.id))[0].nm
                                                                                }
                                                                            </span>
                                                                            
                                                                            <input className="checbokUnidad" type="checkbox" id={unidad + "checkbox"} name={unidad + "checkbox"} onChange={ e => addDevice(e) } />
                                                                            {/*<FaTasks onClick={e => showJobsUnit(e,unidad)}></FaTasks>*/}
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
                    <Col xs lg="6" >
                    {
                        nuevaRegla ?
                            <NuevaRegla
                                setNuevaRegla={setNuevaRegla}
                                filtrarUnidadesComando={filtrarUnidadesComando}
                                addUnitNewJob={addUnitNewJob}
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
                                deleteJob={deleteJob}
                                activateJob={activateJob}
                                deactivateJob={deactivateJob}
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
                    {
                        loading ?
                        <Container className="popoverPanale">
                            <img src={preloader} />
                        </Container>
                        :null
                    }
                    </Col>
                </Row>
            </Container>
        </Main>
    );
}
export default Reglas;