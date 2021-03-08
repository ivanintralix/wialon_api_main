import React, { useState, useEffect } from 'react';
import Main from './Main';
import { useDispatch, useSelector } from "react-redux";
import { Card, Container, Row, Col, Form, Spinner } from 'react-bootstrap';
import { FaLock, FaSearch } from 'react-icons/fa';
import { addUnitsGroupAction, createGroupAction, deleteGroupAction } from "../store/actions/gruposActions";
import Swal from 'sweetalert2';

const Equipos = () => {
    const dispatch = useDispatch();
    const unidades = useSelector(state => state.usuario.user.unidades);
    const [unidadesModal,setUnidadesModal] = useState(useSelector(state => state.usuario.user.unidades)) 
    const grupos = useSelector(state => state.grupos.grupos);
    const loadingEquipos = useSelector(state => state.grupos.loadingEquipos);
    const wialonObject = useSelector(state => state.usuario.user);
    const [ unidadesGrupo, setUnidadesGrupo ] = useState(grupos[0] === undefined ? [] : grupos[0].d.u);
    const [ tituloGrupo, setTituloGrupo ] = useState(grupos[0] === undefined ? "" : grupos[0].d.nm);
    const [ idGroup, setIdGroup] = useState(grupos[0] === undefined ? null : grupos[0].d.id);
    const [ flagCreateGroup, setFlagCreateGroup ] = useState(false);
    const [ cofirmDelete, setCofirmDelete ] = useState(false);
    //console.log(unidades.find(unidad2 => 133 === unidad2.id));
    useEffect(() => {
        if (!loadingEquipos) {
            setFlagCreateGroup(false);
        }
        if(!cofirmDelete){
            setCofirmDelete(false);
            //setTituloGrupo(grupos[0].d.nm);
            //setUnidadesGrupo(grupos[0].d.u);
        }
    }, [grupos]);
    const drag = e => {
        e.dataTransfer.setData("text", e.target.id);
    }
    const drop = e => {
        e.preventDefault();
        const arrayTemp = [];
        const data = e.dataTransfer.getData("text");
        var repite = unidadesGrupo.filter(unidad => parseInt(data) === unidad );
        if (repite.length <= 0) {
            arrayTemp.push(parseInt(data));
        }
        unidades.map(unidadGrupo => {
            const UC = document.getElementById("checbokUnidadGrupo" + unidadGrupo.id);
            if (parseInt(data) !== unidadGrupo.id && UC !== null && UC.checked) {
                repite = unidadesGrupo.filter(unidad => parseInt(unidadGrupo.id) === unidad );
                if (repite.length <= 0) {
                    arrayTemp.push(parseInt(unidadGrupo.id));
                }
            }
        });
        setUnidadesGrupo(unidadesGrupo.concat(arrayTemp));
    }
    const dropUnidades = e => {
        e.preventDefault();
        const data = e.dataTransfer.getData("text");
        let newGrupo = unidadesGrupo.filter(grupo => grupo !== parseInt(data) )
        unidadesGrupo.map(unidad => {
            const UC = document.getElementById("checbokUnidadGrupo" + unidad).checked;
            console.log(UC);
            if (UC) {
                newGrupo = newGrupo.filter(grupo => grupo !== parseInt(unidad) )
            }
        });
        setUnidadesGrupo(newGrupo);
    }
    const allowDrop = e => {
        e.preventDefault();
    }
    const selectGrupo = e => {
        const se = document.getElementById(e.target.id);
        const idGrupo = se.options[se.selectedIndex].id;
        const newGrupo = grupos.filter(grupo => grupo.d.id === parseInt(idGrupo) )
        setUnidadesGrupo(newGrupo[0].d.u);
        setTituloGrupo(newGrupo[0].d.nm);
        setIdGroup(newGrupo[0].d.id);
    };
    const addUnitsGroup = e => {
        e.preventDefault();
        dispatch(addUnitsGroupAction(unidadesGrupo,idGroup,wialonObject));
    }
    const addGroupModal = e => {
        e.preventDefault();
        setFlagCreateGroup(true);
        setTituloGrupo("");
        setUnidadesGrupo([]);
    }
    const cancelGroup = e => {
        e.preventDefault();
        setFlagCreateGroup(false);
        setTituloGrupo(grupos[0].d.nm);
        setUnidadesGrupo(grupos[0].d.u);
    }
    const nameGroupChange = e => {
        e.preventDefault();
        setTituloGrupo(e.target.value);
    }
    const addGroup = e => {
        e.preventDefault();
        dispatch(createGroupAction(unidadesGrupo,tituloGrupo,wialonObject));
    }
    const confirmDelete = e => {
        e.preventDefault();
        Swal.fire({
            title: `Se eliminara el grupo ${tituloGrupo}`,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#ffc107',
            confirmButtonText: `Eliminar`,
        }).then((result) => {
            console.log(result)
            if (result.value) {
                //Swal.fire('Comando enviado!', '', 'success')
                Swal.fire('Enviando comando', '', '')
                //cmd(arrayUID,comandoString);
                dispatch(deleteGroupAction(idGroup,wialonObject));
                Swal.showLoading();
            } else if (result.dismiss) {
                Swal.close()
            }
        })
        //setCofirmDelete(true);
    }
    const cancelDelete = e => {
        e.preventDefault();
        setCofirmDelete(false);
    }
    const deleteGroup = e => {
        e.preventDefault();
        dispatch(deleteGroupAction(idGroup,wialonObject));
        setCofirmDelete(false);
    }
    const buscarUnidad = e => {
        e.preventDefault();
        const nombre = e.target.value.toUpperCase();
        let arrayUnidades = [];
        let tempUnidades = unidades;
        arrayUnidades = tempUnidades.map(unidad => 
            {
                if(unidad.nm.toUpperCase().search(nombre) !== -1){
                    return{
                        id: unidad.id,
                        nm: unidad.nm
                    };
                }
            }
        );
        arrayUnidades = arrayUnidades.filter(unidad => unidad !== undefined);
        setUnidadesModal(arrayUnidades);
    }
    return (
        <Main>
            <Card className="text-center equiposBody">
                <Card.Body>
                    <Card.Title>
                        {
                            tituloGrupo
                        }
                    </Card.Title>
                    <Container>
                        <Row style={{marginBottom:"20px"}}>
                            <Col>
                                {
                                    flagCreateGroup ?
                                        <input
                                            id="inputGroup-sizing-sm"
                                            placeholder="Nombre del grupo"
                                            className="inputBlack"
                                            onChange={ e => nameGroupChange(e) }
                                        />
                                    :
                                        (<Form>
                                            <Form.Group controlId="exampleForm.SelectCustom">
                                                <Form.Label>Grupos</Form.Label>
                                                <Form.Control as="select" custom
                                                    onChange={ e => selectGrupo(e) }
                                                >
                                                {
                                                    grupos.map(grupo => (
                                                        <option key={grupo.d.id} id={grupo.d.id} >{grupo.d.nm}</option>
                                                    ))
                                                }
                                                </Form.Control>
                                            </Form.Group>
                                        </Form>)
                                }
                            </Col>
                            <Col>
                                {
                                    flagCreateGroup ?
                                        null
                                    :
                                        <button className="dangerButton" onClick={ e => confirmDelete(e) }>Eliminar grupo</button>
                                }
                            </Col>
                            <Col>
                                {
                                    flagCreateGroup ?
                                        <button className="warnigButton" onClick={e => cancelGroup(e) }>Cancelar</button>
                                    :
                                        <button className="successButton" onClick={ e => addGroupModal(e) }>Crear Grupo</button>
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col onDrop={(e) => dropUnidades(e)} onDragOver={(e) => allowDrop(e)}>
                                <Card className="cardUnidadesGrupos" >
                                    <Card.Header>Unidades Disponibles</Card.Header>
                                    <Card.Body style={{ maxHeight:"500px", overflowY:"auto"}} >
                                        <Card.Title><input onChange={ e => buscarUnidad(e) } id="inputGroup-sizing-sm" className="inputBlack" /><FaSearch /></Card.Title>
                                        <div id="UnidadesDiv" >
                                            {
                                                unidadesModal.map(unidad => (
                                                        <div 
                                                            key={"UGrupo" + unidad.id}
                                                            id={unidad.id}
                                                            draggable="true"
                                                            className="unidad"
                                                            onDragStart={e => drag(e)}
                                                        >
                                                            <span><FaLock size={20} /> Unidad: {unidad.nm}</span>
                                                            <input className="checbokUnidad white" id={"checbokUnidadGrupo"+unidad.id} type="checkbox"  />
                                                            <br></br>
                                                        </div>
                                                ))
                                            }
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col onDrop={(e) => drop(e)} onDragOver={(e) => allowDrop(e)}>
                                <Card className="cardUnidadesDisponibles" >
                                    <Card.Header>Unidades Grupo: {tituloGrupo}</Card.Header>
                                    <Card.Body style={{ maxHeight:"500px", overflowY:"auto"}} >
                                        <div id="GrupoDiv" >
                                            {
                                                unidadesGrupo.map(unidad => (
                                                    <div
                                                        key={"G"+unidad}
                                                        id={unidad}
                                                        draggable="true"
                                                        className="unidad"
                                                        onDragStart={e => drag(e)}
                                                    >
                                                        <span><FaLock size={20} /> Unidad: {(unidades.find(unidad2 => unidad === unidad2.id)).nm}</span>
                                                        <input className="checbokUnidad white" id={"checbokUnidadGrupo"+unidad} type="checkbox"  />
                                                        <br></br>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </Card.Body>
                                    <Card.Footer>
                                        {
                                            flagCreateGroup ?
                                                <button className="successButton" style={{float:"right"}} onClick={e => addGroup(e)}>Guardar grupo</button>
                                            :
                                                <button className="successButton" style={{float:"right"}} onClick={e => addUnitsGroup(e)}>Guardar</button>
                                        }
                                    </Card.Footer>
                                </Card>
                            </Col>
                        </Row>
                        </Container>
                </Card.Body>
                <Card.Footer className="text-muted">Intralix</Card.Footer>
            </Card>
            {
                loadingEquipos ?
                    <Container className="popoverPanale">
                        <Spinner animation="border" role="status" style={{margin: "50px"}}>
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </Container>
                :
                    null
            }
            {
                cofirmDelete ?
                    <Container className="popoverPanale">
                        <Card style={{ width: '18rem', marginTop:"10px" }}>
                            <Card.Body>
                                <Card.Text>Se eliminara el grupo <b>{tituloGrupo}</b></Card.Text>
                                <button className="dangerButton" style={{float:"right"}} onClick={ e => deleteGroup(e) } >Confirmar</button>
                                <button className="warnigButton" style={{float:"left"}} onClick={ e => cancelDelete(e) }>Cancelar</button>
                            </Card.Body>
                        </Card>
                    </Container>
                :
                    null
            }
        </Main>
    );
}
export default Equipos;
