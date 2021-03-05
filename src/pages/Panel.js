import React, { useState } from 'react';
import Main from './Main';
import { useSelector } from "react-redux";
import MenuAcciones from "./MenuAcciones";
import MapaOSM from "./MapaOSM";
const Panel = () => {
    const CMDSUnidades = useSelector(state => state.CMDS.unidadesCMDS);
    let unidades = useSelector(state => state.unidades.unidades);
    unidades = unidades.map(unidad => {
        const unidadCcmd = CMDSUnidades.find(unidadcmd => unidadcmd.id === unidad.id);
        if (unidadCcmd !== undefined) {
            return unidad;
        }
    });
    unidades= unidades.filter( unidad => unidad !== undefined);
    const [ marketPosition, setMarketPosition] = useState( unidades[0] === undefined ? { lat : 0 ,lng : 0 } : { lat : unidades[0].pos.y,lng : unidades[0].pos.x })
    const grupos = useSelector(state => state.grupos.grupos);
    const [unidadesModal ] = useState(unidades);
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
