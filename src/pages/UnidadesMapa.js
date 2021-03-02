import React, { useState } from 'react';

import { useSelector } from "react-redux";

import { Marker, Popup } from 'react-leaflet'

const UnidadesMapa = () => {

    const unidades = useSelector(state => state.unidades.unidades);
    const [unidadesModal] = useState(unidades);
    window.onmessage = function (e) {
        /*
        var msg = e.data;
        if (typeof msg == "string") {
          const eventosJSON = JSON.parse(msg);
          if (eventosJSON.text !== undefined && eventosJSON.text.events !== undefined) {
            const arrayUnidades = [];
            eventosJSON.text.events.forEach(evento => {
              unidades.forEach(unidad => {
                if (evento.i === unidad.id) {
                  if (evento.d.pos !== null) {
                    arrayUnidades.push(evento);
                  }
                }
              });
            });
            const nuevos = [];
            unidades.forEach(unidad => {
                arrayUnidades.forEach(nuevaUnidad => {
                    if (nuevaUnidad.i === unidad.id) {
                        unidad.pos.x = nuevaUnidad.d.pos.x;
                        unidad.pos.y = nuevaUnidad.d.pos.y;
                    }
                });
                nuevos.push(unidad);
            });
            setUnidadesModal(nuevos);
          }
        }
        */
    };
    return ( 
    <>
        {
            unidadesModal.map(unidad => (
                unidad.pos !== null ?
                    (<Marker key={unidad.id + "M"} position={[unidad.pos.y,unidad.pos.x]}>
                    <Popup>
                        <div className='popupMarker'>
                        Unidad: {unidad.nm}
                        <br></br><br></br>
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">Direccion</th>
                                <th scope="col">Fecha</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>direccion</td>
                                <td>00/00/0000</td>
                            </tr>
                            </tbody>
                        </table>
                        programacion
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