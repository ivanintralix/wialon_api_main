import React, { useState } from 'react';
import Main from './Main';
import { useSelector } from "react-redux";
import MenuAcciones from "./MenuAcciones";
import MapaOSM from "./MapaOSM";
const Panel = () => {
    const unidades = useSelector(state => state.unidades.unidades);
    const [ marketPosition, setMarketPosition] = useState( unidades[0] === undefined ? { lat : 0 ,lng : 0 } : { lat : unidades[0].pos.y,lng : unidades[0].pos.x })
    const grupos = useSelector(state => state.grupos.grupos);
    const [unidadesModal ] = useState(unidades);
    window.onmessage = function (e) {
        /*var msg = e.data;
        if (typeof msg == "string") {
          const eventosJSON = JSON.parse(msg);
          if (eventosJSON.text !== undefined && eventosJSON.text.events !== undefined) {
            const arrayUnidades = [];
            eventosJSON.text.events.forEach(evento => {
              unidades.forEach(unidad => {
                if (evento.i === unidad.id) {
                  if (evento.d.pos !== null) {
                    console.log(evento)
                    arrayUnidades.push(evento);
                  }
                }
              });
            });
            const nuevos = [];
            console.log(arrayUnidades);
            
            unidades.forEach(unidad => {
                arrayUnidades.forEach(nuevaUnidad => {
                    if (nuevaUnidad.i === unidad.id) {
                        unidad.pos.x = nuevaUnidad.d.pos.x;
                        unidad.pos.y = nuevaUnidad.d.pos.y;
                        console.log(unidad);
                    }
                });
                nuevos.push(unidad);
            });
            setUnidadesModal(nuevos);
          }
        }*/
    };
    const positionCurrentMarket = id => {
        const unidad = unidadesModal.filter( unidad => unidad.id === id);
        const { x, y } = unidad[0].pos;
        setMarketPosition({lat:y,lng:x});
    }
    return (
        <Main>
            <div className='mapaInicio'>
                <MapaOSM
                    marketPosition={marketPosition}
                />
            </div>
            <MenuAcciones
                unidades={unidades}
                grupos={grupos}
                positionCurrentMarket={ positionCurrentMarket }
            />
        </Main>
    );
}
 
export default Panel;
