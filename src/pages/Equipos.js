import React, { useState, useEffect } from 'react';
import Main from './Main';
import { useDispatch, useSelector } from "react-redux";
import { Card, Container, Row, Col, Form } from 'react-bootstrap';
import { FaLock, FaArrowAltCircleDown, FaSearch } from 'react-icons/fa';
import { drop } from 'lodash';

const Equipos = () => {
    const unidades = useSelector(state => state.usuario.user.unidades);
    console.log(unidades);
    const grupos = useSelector(state => state.grupos.grupos);

    const [ unidadesGrupo, setUnidadesGrupo ] = useState(grupos[0].unidades);

    useEffect(() => {
    },[])
    const drag = e => {
        e.dataTransfer.setData("text", e.target.id);
    }
    const drop = e => {
        e.preventDefault();
        const data = e.dataTransfer.getData("text");
        var repite = unidadesGrupo.filter(unidad => data === "drag_"+unidad );
        if (repite.length <= 0) {
            const clone = document.getElementById(data).cloneNode(true);
            delete clone.id;
            document.getElementById("GrupoDiv").appendChild(clone);
        }
    }
    const dropUnidades = e => {
        e.preventDefault();
        const data = e.dataTransfer.getData("text");
        console.log(data);
        console.log(document.getElementById("GrupoDiv"))
        const unidadGrupo = document.getElementById("GrupoDiv").querySelector("#"+data);
        
        unidadGrupo.parentNode.removeChild(unidadGrupo);
    }
    const allowDrop = e => {
        e.preventDefault();
    }
    const selectGrupo = e => {
        const se = document.getElementById(e.target.id);
        const idGrupo = se.options[se.selectedIndex].id;
        const newGrupo = grupos.filter(grupo => grupo.id == idGrupo )
        setUnidadesGrupo(newGrupo[0].unidades);
    }
    return (
        <Main>
            <Card className="text-center">
                <Card.Header>Grupos</Card.Header>
                <Card.Body>
                    <Card.Title>Grupo tacos</Card.Title>
                    <Card.Text>
                    <Container>
                        <Row>
                            <Col>
                            <Form>
                                <Form.Group controlId="exampleForm.SelectCustom">
                                    <Form.Label>Custom select</Form.Label>
                                    <Form.Control as="select" custom
                                        onChange={e => selectGrupo(e)}
                                    >
                                    {
                                        grupos.map(grupo => (
                                            <option id={grupo.id} >{grupo.nombre}</option>
                                        ))
                                    }
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                            </Col>
                            <Col>
                                <button>Eliminar grupo</button>
                            </Col>
                            <Col>
                                <button>Crear Grupo</button>
                            </Col>
                        </Row>
                        <Row>
                            <Col onDrop={(e) => dropUnidades(e)} onDragOver={(e) => allowDrop(e)}>
                                <Card>
                                    <Card.Header>Unidades Disponibles</Card.Header>
                                    <Card.Body>
                                        <Card.Title><input id="inputGroup-sizing-sm"/><FaSearch /></Card.Title>
                                        <div id="UnidadesDiv">
                                            {
                                                unidades.map(unidad => (
                                                    <div id={"drag_" + unidad.id} draggable="true" style={{cursor: "pointer", borderStyle:"outset", marginTop:"5px"}} onDragStart={e => drag(e)} >
                                                        <span><FaLock size={20} /> Unidad: {unidad.id}</span>
                                                        <input className="checbokUnidad" type="checkbox"  />
                                                        <br></br>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col onDrop={(e) => drop(e)} onDragOver={(e) => allowDrop(e)}>
                                <Card >
                                    <Card.Header>Unidades Grupo</Card.Header>
                                    <Card.Body>
                                        <Card.Title>Special title treatment</Card.Title>
                                        <div id="GrupoDiv" >
                                            {
                                                unidadesGrupo.map(unidad => (
                                                    <div id={"drag_" + unidad} draggable="true" style={{cursor: "pointer", borderStyle:"outset", marginTop:"5px"}} onDragStart={e => drag(e)} >
                                                        <span><FaLock size={20} /> Unidad: {unidad}</span>
                                                        <input className="checbokUnidad" type="checkbox"  />
                                                        <br></br>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        </Container>
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">Intralix</Card.Footer>
            </Card>
        </Main>
    );
}
 
export default Equipos;
