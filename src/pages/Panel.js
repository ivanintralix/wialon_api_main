import React, { useState, useEffect } from 'react';
import Main from './Main';
import { useDispatch, useSelector } from "react-redux";
//import MapaOSM from "./MapaOSM";
import MenuAcciones from "./MenuAcciones";
import MapaOSM from "./MapaOSM";
import "../index.css";
import wialon from "../wialon/session";

const Panel = () => {

    const [token, setToken] = useState(useSelector(state => state.usuario.token));
    const [unidades, setUnidades] = useState(useSelector(state => state.usuario.user.unidades))
    const [ marketPosition, setMarketPosition] = useState({ lat: '37.5456690788', lng: '55.748730663' })
    console.log(unidades)
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



const unidades2 = [
    {
        id : 25789,
        informacion : {
            lat : '20.745675621278505',
            lng : '-103.34453047338549',
            direccion : 'casa',
            fecha : '00/00/0000'
        },
        reglas : [
            {
                tipo : 'recurrente',    //recurrente,exacta
                nombre : 'regla 1',
                hora : '8:30 AM',
                comando : 'abrir',      //abrir, cerrar
                fecha : '',
                dias : ['DOM','LUN','MAR','MIE','JUE','SAB'],
                activo : true
            }
        ]
    },{
        id : 25760,
        informacion : {
            lat : '20.6425581900204',
            lng : '-103.43760089237433',
            direccion : 'intralix',
            fecha : '00/00/0000'
        },
        reglas : [
            {
                tipo : 'recurrente',    //recurrente,exacta
                nombre : 'regla 1',
                hora : '8:30 AM',
                comando : 'abrir',      //abrir, cerrar
                fecha : '',
                dias : ['DOM','LUN','MAR','MIE','JUE','SAB'],
                activo : true
            }
        ]
    }
];


const grupos = [
    {
        id: 1,
        nombre: 'Tacos',
        unidades : [ 6581056, 6582603, 11736062 ]
    },{
        id: 2,
        nombre: 'Taco',
        unidades : [ 6582603, 11736062 ]
    }
];