import React, { useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { FaLock, FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { updateUnitsJobsAction } from "../../store/actions/tareasActions";

const VerUnidades = ({setVerunidades,jobId}) => {

    let unidades = useSelector(state => state.unidades.unidades);
    let CMDS = useSelector(staet => staet.CMDS.unidadesCMDS);
    const jobs = useSelector(state => state.tareas.tareas)
    const job = jobs.filter(job => job.id === parseInt(jobId));
    const [unidadesJobs,setUnidadesJobs] = useState(job[0].unidades);
    const dispatch = useDispatch();
    const unidadesFiltradas = () => {
        const currentCMDS = [];
        CMDS.map(unidadcmds => {
            const Ccmds = unidadcmds.cmds.filter(cmd => cmd.n === job[0].comando && cmd.c === job[0].comandoTipo);
            if (Ccmds.length > 0) {
                currentCMDS.push({id:unidadcmds.id,nm:unidadcmds.n});
            }
        })
        console.log(currentCMDS);
        return currentCMDS;
        
    };
    const unidadesFinal = unidadesFiltradas();
    const [unidadesModal,setUnidadesModal] = useState(unidadesFiltradas());
    const wialonObject = useSelector(state => state.usuario.user);

    const buscarUnidadModal = e => {
        e.preventDefault();
        const nombre = e.target.value.toUpperCase();
        let arrayUnidades = [];
        unidadesFinal.map(unidad => {
            if(unidad.nm.toUpperCase().search(nombre) !== -1)
            {
                arrayUnidades.push({
                    id: unidad.id,
                    nm: unidad.nm
                })
            }
        });
        console.log(arrayUnidades);
        setUnidadesModal(arrayUnidades);
    }
    const drag = e => {
        e.dataTransfer.setData("text", e.target.id);
    }
    const allowDrop = e => {
        e.preventDefault();
    }
    const drop = e => {
        e.preventDefault();
        const arrayTemp = [];
        const data = e.dataTransfer.getData("text");
        var repite = unidadesJobs.filter(unidad => parseInt(data) === unidad );
        if (repite.length <= 0) {
            arrayTemp.push(parseInt(data));
        }
        unidades.map(unidadJob => {
            const UC = document.getElementById("checboxUnidad" + unidadJob.id);
            if (parseInt(data) !== unidadJob.id && UC !== null && UC.checked) {
                repite = unidadesJobs.filter(unidad => parseInt(unidadJob.id) === unidad );
                if (repite.length <= 0) {
                    arrayTemp.push(parseInt(unidadJob.id));
                }
            }
        });
        setUnidadesJobs(unidadesJobs.concat(arrayTemp));
    }
    const dropUnidades = e => {
        e.preventDefault();
        const data = e.dataTransfer.getData("text");
        let newGrupo = unidadesJobs.filter(grupo => grupo !== parseInt(data) )
        unidadesJobs.map(unidad => {
            const UC = document.getElementById("checboxUnidadJob" + unidad).checked;
            if (UC) {
                newGrupo = newGrupo.filter(grupo => grupo !== parseInt(unidad) )
            }
        });
        setUnidadesJobs(newGrupo);
    }
    const guardarUnidadesTareas = e => {
        e.preventDefault();
        console.log(unidadesJobs);
        console.log(jobId);
        dispatch( updateUnitsJobsAction( jobId,unidadesJobs.join(),wialonObject ) );
    }
    return (
        <Container className="popoverPanale">
            <Card style={{ width: '55rem', marginTop:"10px" }}>
                <Card.Body>
                    {/** */}
                    <Row>
                        <Col onDrop={(e) => dropUnidades(e)} onDragOver={(e) => allowDrop(e)}>
                            <Card className="cardAsignarUnidadestarea">
                                <Card.Header>Unidades disponibles</Card.Header>
                                <Card.Body style={{ maxHeight:"500px", overflowY:"auto"}} >
                                    <Card.Title><input onChange={ e => buscarUnidadModal(e) } id="inputGroup-sizing-sm" className="inputBlack" /><FaSearch /></Card.Title>
                                    <div id="UnidadesDiv">
                                        {
                                            unidadesModal.map(unidad => (
                                                <div
                                                    key={"Reglas_U" + unidad.id}
                                                    id={unidad.id}
                                                    draggable="true"
                                                    className="unidad"
                                                    onDragStart={e => drag(e)}
                                                >
                                                    <span style={{ float: "left" }} ><FaLock size={20} /> Unidad: {unidad.nm}</span>
                                                    <input className="checbokUnidad white" id={"checboxUnidad"+unidad.id} type="checkbox"  />
                                                    <br></br>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col onDrop={(e) => drop(e)} onDragOver={(e) => allowDrop(e)}>
                            <Card className="cardUnidadestarea" >
                                <Card.Header>Unidades tarea</Card.Header>
                                <Card.Body style={{ maxHeight:"500px", overflowY:"auto"}} >
                                    <div id="GrupoDiv" >
                                        {
                                            unidadesJobs.map(unidad => (
                                                <div
                                                    key={"Reglas_J"+unidad}
                                                    id={unidad}
                                                    draggable="true"
                                                    className="unidad"
                                                    onDragStart={e => drag(e)}
                                                >
                                                    <span style={{ float: "left" }}><FaLock size={20} /> Unidad: 
                                                        {
                                                            unidades.filter(unidadG => (unidadG.id === unidad))[0].nm
                                                        }
                                                    </span>
                                                    <input className="checbokUnidad white" id={"checboxUnidadJob"+unidad} type="checkbox"  />
                                                    <br></br>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    {/** */}
                </Card.Body>
                <Card.Footer>
                        <button className="successButton" style={{float:"right"}} onClick={e => guardarUnidadesTareas(e)}>Guardar</button>
                        <button className="warnigButton" style={{float:"right"}} onClick={() => setVerunidades(false)}>Cancelar</button>
                </Card.Footer>
            </Card>
        </Container>
    );
}
export default VerUnidades;