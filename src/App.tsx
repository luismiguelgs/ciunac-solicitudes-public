import './App.css'
import CssBaseline from '@mui/material/CssBaseline';
import { useStateContext } from './core/contexts/ContextProvider.tsx';
import Preloader from './core/components/Preloader.tsx';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Inicio from './solicitud-ubicacion/pages/Inicio';
import PrivateRoutes from './solicitud-ubicacion/pages/PrivateRoutes';
import {default as FinalUbicacion} from './solicitud-ubicacion/pages/Finish';
import {default as FinalCertificado} from './solicitud-certificados/pages/Finish.tsx'
import TestPage from './core/pages/TestPage';
import Home from './core/pages/HomePage';
import {default as ProcesoUbicacion} from './solicitud-ubicacion/pages/Proceso';
import { default as ProcesoCertificado } from './solicitud-certificados/pages/Proceso.tsx'
import {default as ConsultaSolicitud} from './consulta-solicitud/pages/HomePage';
import {default as ConsultaCertificado} from './consulta-certificados/pages/HomePage';
import {default as LayoutUbicacion} from './solicitud-ubicacion/pages/Layout';
import {default as LayoutCertificado} from './solicitud-certificados/pages/Layout'
import ConsultaDetalle from './consulta-solicitud/pages/ConsultaDetalle';
import React from 'react';
import Start from './solicitud-certificados/pages/Start';
import Cargo from './solicitud-certificados/pages/Cargo.tsx';

function App() 
{
    const {auth, loading, setAuth} = useStateContext()
    const [title, setTitle] = React.useState<string>('CIUNAC - Solicitudes')

    return (
        <>
            <CssBaseline />
            {
                loading ? (
                    <Preloader />
                ):(
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            {/** CONSULTA SOLICITUD */}
                            <Route path='/consulta-solicitud' element={<ConsultaSolicitud setAuth={setAuth}/>} />
                            <Route element={<PrivateRoutes auth={auth}/>}>
                                <Route path='/consulta-solicitud/detalle' element={<ConsultaDetalle />} />
                            </Route>
                            {/** CONSULTA CERTIFICADO */}
                            <Route path='/consulta-certificado' element={<ConsultaCertificado />} />
                            <Route path='/consulta-certificado/:id' element={<ConsultaCertificado />} />
                            {/** SOLICITUD CERTIFICADO */}
                            <Route path='/solicitud-certificados' element={<LayoutCertificado title={title}/>}>
                                <Route index element={<Start setAuth={setAuth} setTitle={setTitle} /> } /> 
                                <Route element={<PrivateRoutes auth={auth}/>}>
                                    <Route path='proceso' element={<ProcesoCertificado />} />
                                    <Route path='cargo' element={<Cargo />} />
                                    <Route path='final' element={<FinalCertificado />} />
                                </Route>
                            </Route>
                            {/** SOLICITUD UBICACION */}
                            <Route path='/solicitud-ubicacion' element={<LayoutUbicacion />}>
                                <Route index element={<Inicio />} />
                                <Route element={<PrivateRoutes auth={auth}/>}>
                                    <Route path='proceso' element={<ProcesoUbicacion />} />
                                    <Route path='final' element={<FinalUbicacion />} />
                                </Route>
                            </Route>
                            <Route path="*" element={<div><p>Página no disponible: 404!</p><Link to={'/'} >Inicio</Link></div>} />
                            {/** PAGINA DE PRUEBA */}
                            <Route path='/test' element={<TestPage />} />
                        </Routes>
                    </BrowserRouter>
                )
            }
        </>
    )
}

export default App
