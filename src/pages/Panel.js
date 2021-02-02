import React, { useState, useEffect } from 'react';
import Main from './Main';
import { useDispatch, useSelector } from "react-redux";
import MenuAcciones from "./MenuAcciones";
import MapaOSM from "./MapaOSM";
const Panel = () => {
    const unidades = useSelector(state => state.usuario.user.unidades);
    const [ marketPosition, setMarketPosition] = useState({ lat: '37.5456690788', lng: '55.748730663' })
    const grupos = useSelector(state => state.grupos.grupos);
    useEffect(() => {
    },[])

    const positionCurrentMarket = id => {
        const unidad = unidades.filter( unidad => unidad.id === id);
        const { x, y } = unidad[0].pos;
        setMarketPosition({lat:x,lng:y});
    }
    return (
        <Main>
            <div className='mapaInicio'>
                <MapaOSM
                    unidades={unidades}
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
