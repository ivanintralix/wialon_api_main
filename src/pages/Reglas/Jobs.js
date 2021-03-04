import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

const Jobs = ({unitsJobs,jobsModal,editJob,deleteJob,activateJob,deactivateJob}) => {
    return (
        <Container className="">
            <Card style={{overflowY:"auto", maxHeight:"900px"}}>
                <Card.Title>Tareas</Card.Title>
                    {
                    jobsModal.map(job => (
                        <Card.Body key={"Regla"+job.id} >
                            <Card.Text >Tarea: {job.nombre}</Card.Text>
                            <Row>
                                <Col xs lg="8" style={{textAlign:'left'}}>
                                    Hora: {job.hora}<br></br>
                                    {
                                        job.dias.length > 0 ?
                                            <span>
                                                Dias: {job.dias.join()}<br></br>
                                            </span>
                                        :
                                            <span>
                                                Fecha: {job.fecha}<br></br>
                                            </span>
                                    }
                                    Comando: {job.comando}<br></br>
                                </Col>
                                <Col xs lg="4">
                                    {
                                        !job.estado ?
                                        <>
                                            <button disabled >Parar</button><br></br>
                                            <button onClick={ e => activateJob(e,job.id)}>Iniciar</button><br></br>
                                            </>
                                        :
                                            <>
                                            <button onClick={ e => deactivateJob(e,job.id)}>Parar</button><br></br>
                                            <button disabled >Iniciar</button><br></br>
                                            </>
                                    }
                                    <button onClick={ e => deleteJob(e,job.id) }>Eliminar</button>
                                </Col>
                            </Row>
                            <Card.Footer>
                                <button style={{float:'left'}} onClick={ e => unitsJobs(e,job.id) }>Asignar unidades</button>
                                <button style={{float:'right'}} onClick={ e => editJob(e,job.id) }>Ediatr regla</button>
                            </Card.Footer>
                        </Card.Body>
                    ))
                    }
            </Card>
        </Container>
    );
}
export default Jobs;