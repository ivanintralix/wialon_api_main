import React, { useState } from 'react';
import { Card, Container, Row, Col, Table, Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { CMDSDefault } from "../../config/CMDS";

const NuevaRegla = ({setNuevaRegla, filtrarUnidadesComando, addUnitNewJob}) => {

    const [startDateHora, setStartDateHora] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());
    const [toggleDate, setToggleDate] = useState(true);
    const inputNombreNuevaRegla = React.createRef();
    const selectComandoNuevaRegla = React.createRef();
    const checkboxDiaLunes = React.createRef();
    const checkboxDiaMartes = React.createRef();
    const checkboxDiaMiercoles = React.createRef();
    const checkboxDiaJueves = React.createRef();
    const checkboxDiaViernes = React.createRef();
    const checkboxDiaSabado = React.createRef();
    const checkboxDiaDomingo = React.createRef();

    const guardarNuevaTarea = e => {
        e.preventDefault();
        const Hora = addZero(startDateHora.getHours())+":"+addZero(startDateHora.getMinutes())
        const nuevaTarea = {
            nombreTarea : inputNombreNuevaRegla.current.value,
            Hora,
            cmd : selectComandoNuevaRegla.current.value,
            arrayNuevosDias:[],
            fecha:null,
            unidades: []
        }
        if (toggleDate) {
            if(checkboxDiaLunes.current.checked) nuevaTarea.arrayNuevosDias.push("Lunes");
            if(checkboxDiaMartes.current.checked) nuevaTarea.arrayNuevosDias.push("Martes");
            if(checkboxDiaMiercoles.current.checked) nuevaTarea.arrayNuevosDias.push("Miercoles");
            if(checkboxDiaJueves.current.checked) nuevaTarea.arrayNuevosDias.push("Jueves");
            if(checkboxDiaViernes.current.checked) nuevaTarea.arrayNuevosDias.push("Viernes");
            if(checkboxDiaSabado.current.checked) nuevaTarea.arrayNuevosDias.push("Sabado");
            if(checkboxDiaDomingo.current.checked) nuevaTarea.arrayNuevosDias.push("Domingo");
            nuevaTarea.fecha = parseInt(new Date().getTime()/1000);
        }else{
            nuevaTarea.fecha = startDate.getTime()/1000;
        }
        console.log(nuevaTarea);
        addUnitNewJob(nuevaTarea);
    }
    function addZero(i){
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
    return (
        <Container className="">
            <Card>
                <Card.Body>
                    <Card.Text>Nueva regla</Card.Text>
                    <Row>
                        <Col xs lg="4">
                            <input ref={inputNombreNuevaRegla} style={{inlineSize:"inherit"}} className="inputBlack" placeholder="Nombre" />
                        </Col>
                        <Col xs lg="4">
                            <DatePicker
                                className="inputBlack"
                                selected={startDateHora}
                                onChange={date => setStartDateHora(date)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="HH:mm"
                            />
                        </Col>
                        <Col xs lg="4">
                            <Form>
                                <Form.Group controlId="exampleForm.SelectCustom" onChange={ e => filtrarUnidadesComando(e,e.target.value) } >
                                    <Form.Control ref={selectComandoNuevaRegla} as="select" custom>
                                        {
                                            CMDSDefault.map( cmd => (<option key={cmd.cmd_name} >{cmd.cmd_name}</option>))
                                        }
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <label className="switch">
                        <input type="checkbox" onChange={ () => setToggleDate(!toggleDate) } />
                        <span className="slider round"></span>
                    </label>
                    <br></br>
                    {
                        toggleDate ?
                            <Table responsive="sm">
                                <thead>
                                    <tr>
                                        <th>Lun</th>
                                        <th>Mar</th>
                                        <th>Mie</th>
                                        <th>Jue</th>
                                        <th>Vie</th>
                                        <th>Sab</th>
                                        <th>Dom</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><input ref={checkboxDiaLunes} className="checbokDias" type="checkbox" id="checkboxLunes"  /></td>
                                        <td><input ref={checkboxDiaMartes} className="checbokDias" type="checkbox" id="checkboxMartes"  /></td>
                                        <td><input ref={checkboxDiaMiercoles} className="checbokDias" type="checkbox" id="checkboxMiercoles"  /></td>
                                        <td><input ref={checkboxDiaJueves} className="checbokDias" type="checkbox" id="checkboxJueves"  /></td>
                                        <td><input ref={checkboxDiaViernes} className="checbokDias" type="checkbox" id="checkboxViernes"  /></td>
                                        <td><input ref={checkboxDiaSabado} className="checbokDias" type="checkbox" id="checkboxSabado"  /></td>
                                        <td><input ref={checkboxDiaDomingo} className="checbokDias" type="checkbox" id="checkboxDomingo"  /></td>
                                    </tr>
                                </tbody>
                            </Table>
                        :
                            <DatePicker
                                className="inputBlack"
                                selected={startDate}
                                onChange={date => setStartDate(date)}
                            />
                    }
                    <br></br><br></br><br></br>
                    <button className="dangerButton" onClick={ () => setNuevaRegla(false) } style={{float:"left"}} >Cancelar</button>
                    <button className="successButton" onClick={ e => guardarNuevaTarea(e) } style={{float:"right"}} >Agregar</button>
                </Card.Body>
            </Card>
        </Container>
    );
}
export default NuevaRegla;