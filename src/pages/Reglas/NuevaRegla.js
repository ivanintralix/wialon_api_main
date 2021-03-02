import React, { useState } from 'react';
import { Card, Container, Row, Col, Table, Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";

const NuevaRegla = ({setNuevaRegla, setComandoNuevaRegla}) => {

    const [startDate, setStartDate] = useState(new Date());
    const [toggleDate, setToggleDate] = useState(true);
    return (
        <Container className="">
            <Card >
                <Card.Body>
                    <Card.Text>Nueva regla</Card.Text>
                    <Row>
                        <Col xs lg="4">
                            <input id="" style={{inlineSize:"inherit"}} className="inputBlack" placeholder="Nombre" />
                        </Col>
                        <Col xs lg="4">
                            <DatePicker
                                className="inputBlack"
                                selected={startDate}
                                onChange={date => setStartDate(date)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="HH:mm"
                            />
                        </Col>
                        <Col xs lg="4">
                            <Form>
                                <Form.Group controlId="exampleForm.SelectCustom" onChange={ e => setComandoNuevaRegla(e.target.value) } >
                                    <Form.Control as="select" custom>
                                        <option>Abrir</option>
                                        <option>Cerrar</option>
                                        <option>Restablecer</option>
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
                                        <td><input className="checbokDias" type="checkbox" id="checkboxLunes"  /></td>
                                        <td><input className="checbokDias" type="checkbox" id="checkboxMartes"  /></td>
                                        <td><input className="checbokDias" type="checkbox" id="checkboxMiercoles"  /></td>
                                        <td><input className="checbokDias" type="checkbox" id="checkboxJueves"  /></td>
                                        <td><input className="checbokDias" type="checkbox" id="checkboxViernes"  /></td>
                                        <td><input className="checbokDias" type="checkbox" id="checkboxSabado"  /></td>
                                        <td><input className="checbokDias" type="checkbox" id="checkboxDomingo"  /></td>
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
                    <button onClick={ () => setNuevaRegla(false) } style={{float:"left"}} >Cancelar</button>
                    <button onClick={ () => setNuevaRegla(false) } style={{float:"right"}} >Agregar</button>
                </Card.Body>
            </Card>
        </Container>
    );
}
export default NuevaRegla;