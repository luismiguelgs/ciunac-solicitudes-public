import React from 'react'
import TypesService from '../services/types.service';
import { useStateContext } from '../contexts/ContextProvider';
import { Box, CircularProgress } from '@mui/material';


export default function Preloader() 
{
    const { setTextos, setFacultades, setCursos, setLoading, setCertificados } = useStateContext()
    
    React.useEffect(()=>{
      const getData = async()=>{
            const textos = await TypesService.fetchTextos()
            const facultades = await TypesService.fetchFacultades()
            const cursos = await TypesService.fetchCursos()
            const tipo_certificados = await TypesService.fetchTipoCertificados()
            setTextos(textos)
            setCursos(cursos)
            setFacultades(facultades)
            setCertificados(tipo_certificados)
            setLoading(false)
      }
      getData()
      
    },[])
    
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
        </Box>
    )
}
