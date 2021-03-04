import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { Marker, Popup } from 'react-leaflet'

const UnidadesMapa = () => {

    const jobs = useSelector(state => state.tareas.tareas);
    const temp = jobs.find(job => job.id === 20);
    console.log(temp)
    //3657
    const CMDSUnidades = useSelector(state => state.CMDS.unidadesCMDS);
    let unidades = useSelector(state => state.unidades.unidades);
    unidades = unidades.map(unidad => {
        const unidadCcmd = CMDSUnidades.find(unidadcmd => unidadcmd.id === unidad.id);
        if (unidadCcmd !== undefined) {
            return unidad;
        }
    });
    unidades= unidades.filter( unidad => unidad !== undefined);
    const [unidadesModal] = useState(CMDSUnidades);
    return (
    <>
        {
            unidadesModal.map(unidad => (
                unidad.pos !== null ?
                    (<Marker key={unidad.id + "M"} position={[unidad.pos.y,unidad.pos.x]}>
                        <Popup className="popupContainer" >
                            <div className='popupMarker'>
                                Unidad: {unidad.n}
                                <br></br><br></br>
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th scope="col">Dirección</th>
                                        <th scope="col">Fecha</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>direccion</td>
                                        <td>{unidad.fecha}</td>
                                    </tr>
                                    </tbody>
                                </table>
                                Tareas
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Hora</th>
                                        <th scope="col">Recurrencia</th>
                                        <th scope="col">Comando</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        jobs.map( job => {
                                            return (
                                                job.unidades.find(unidadJob => unidad.id === unidadJob) !== undefined ?
                                                    <tr>
                                                        <td>{job.nombre}</td>
                                                        <td>{job.hora}</td>
                                                        {
                                                            job.dias.length > 0 ?
                                                            <td>{job.dias.join(", ")}</td>
                                                            :
                                                            <td>fechas</td>
                                                        }
                                                        <td>{job.comando}</td>
                                                    </tr>
                                                :
                                                    null
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </Popup>
                    </Marker>)
                :
                    null
            ))
        }
    </>
    );
}
export default UnidadesMapa;