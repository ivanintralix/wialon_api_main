import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Card, Container, Row, Col, Table, Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { updateJobAction } from "../../store/actions/tareasActions";

const EditarRegla = ({jobId,setEditarRegla}) => {
    const dispatch = useDispatch();
    const jobs = useSelector(state => state.tareas.tareas);
    const job = jobs.filter(job => job.id === parseInt(jobId))[0];
    const [nombreTarea, setNombreRegla] = useState("")
    const [startDateHora, setStartDateHora] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());
    const [toggleDate, setToggleDate] = useState(true);
    const wialonObject = useSelector(state => state.usuario.user);
    useEffect(() => {
        if (job !== undefined && job !== null) {
            setNombreRegla(job.nombre);
            setStartDateHora(new Date("0 "+job.hora));

            document.getElementById("SelectComandoEditarRegla").value  = "Cerrar";
            if (job.dias.length > 0) {
                setToggleDate(true);
                job.dias.forEach(dia => {
                    document.getElementById("EditarReglaCheckbox"+dia).checked = true;
                });
            }else{
                setToggleDate(false);
                setStartDate(new Date(job.fecha));
            }
        }
    }, []);
    const updateJob = (e) => {
        e.preventDefault();
        const Hora = addZero(startDateHora.getHours())+":"+addZero(startDateHora.getMinutes())
        const nuevaTarea = {
            jobId,
            nombreTarea,
            Hora,
            arrayNuevosDias:null,
            fecha:null
        }
        console.log(jobId);
        console.log(nombreTarea);
        console.log(addZero(startDateHora.getHours())+":"+addZero(startDateHora.getMinutes()));
        console.log(toggleDate);
        if (toggleDate) {
            //dias
            const arrayNuevosDias = [];
            if(document.getElementById("EditarReglaCheckboxLunes").checked)  arrayNuevosDias.push("Lunes");
            if(document.getElementById("EditarReglaCheckboxMartes").checked)  arrayNuevosDias.push("Martes");
            if(document.getElementById("EditarReglaCheckboxMiercoles").checked)  arrayNuevosDias.push("Miercoles");
            if(document.getElementById("EditarReglaCheckboxJueves").checked)  arrayNuevosDias.push("Jueves");
            if(document.getElementById("EditarReglaCheckboxViernes").checked)  arrayNuevosDias.push("Viernes");
            if(document.getElementById("EditarReglaCheckboxSabado").checked)  arrayNuevosDias.push("Sabado");
            if(document.getElementById("EditarReglaCheckboxDomingo").checked)  arrayNuevosDias.push("Domingo");
            console.log(arrayNuevosDias);
            nuevaTarea.arrayNuevosDias=arrayNuevosDias;
        } else {
            //fecha exacta
            console.log(startDate)
            const fecha  = startDate.getTime()/1000;
            console.log(fecha);
            nuevaTarea.fecha = fecha;
        }
        console.log(nuevaTarea);
        dispatch( updateJobAction(jobId,nuevaTarea,wialonObject) );
    }
    function addZero(i){
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
    return (
        <>
            {
                job !== undefined && job !== null ?
                    <Container className="">
                        <Card >
                            <Card.Body>
                                <Card.Text>{job.nombre}</Card.Text>
                                <Row>
                                    <Col xs lg="4">
                                        <input id="" style={{inlineSize:"inherit"}} className="inputBlack" placeholder="Nombre" onChange={e => setNombreRegla(e.target.value)} value={nombreTarea} />
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
                                            <Form.Group controlId="SelectComandoEditarRegla">
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
                                                <td><input className="checbokDias" type="checkbox" id="EditarReglaCheckboxLunes"  /></td>
                                                <td><input className="checbokDias" type="checkbox" id="EditarReglaCheckboxMartes"  /></td>
                                                <td><input className="checbokDias" type="checkbox" id="EditarReglaCheckboxMiercoles"  /></td>
                                                <td><input className="checbokDias" type="checkbox" id="EditarReglaCheckboxJueves"  /></td>
                                                <td><input className="checbokDias" type="checkbox" id="EditarReglaCheckboxViernes"  /></td>
                                                <td><input className="checbokDias" type="checkbox" id="EditarReglaCheckboxSabado"  /></td>
                                                <td><input className="checbokDias" type="checkbox" id="EditarReglaCheckboxDomingo"  /></td>
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
                                <button onClick={ () => setEditarRegla(false) } style={{float:"left"}} >Cancelar</button>
                                <button onClick={ (e) => updateJob(e) } style={{float:"right"}} >Agregar</button>
                            </Card.Body>
                        </Card>
                    </Container>
                :
                    null
            }
        </>
    );
}

export default EditarRegla;