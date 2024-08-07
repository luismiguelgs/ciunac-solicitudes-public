import { Box, Card, CardContent, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { MyAppBar } from "../../core/components/mui";
import { useParams } from "react-router-dom";
import React from "react";
import { Icertificado, IcertificadoDetalle } from "../interfaces/certificado.interface";
import CertificadosService from "../services/certificados.service";

export default function HomePage() 
{
    const getData = async(id:string) => {
        const resData = await CertificadosService.selectItem(id)
        const { modificado, creado, ...newObj} = resData as Icertificado
        setData(newObj)
        const resDetail = await CertificadosService.fetchItemsDetail(id)
        setDetail(resDetail)
    }
    
    const {id} = useParams<{id:string}>()
    const [data, setData] = React.useState<Icertificado>()
    const [detail, setDetail] = React.useState<IcertificadoDetalle[]>([])

    React.useEffect(()=>{
        if(id) getData(id as string)
    },[id])

    console.log(data);
    

    return (
        <>
            <Box sx={{flexGrow:1}}>
                <MyAppBar title='CONSULTA - CERTIFICADO CIUNAC' />            
            </Box>
            {
                id? (
                    <Box p={3}>
                        <Card style={{ margin: '20px', padding: '10px' }}>
                            {data && 
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Certificado de {data.alumno}
                                </Typography>
                                <Grid container spacing={3} p={2}>
                                    <Grid item xs={6}>
                                        <Typography variant="body2">Tipo: {data.tipo}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2">Idioma: {data.idioma}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2">Nivel: {data.nivel}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2">Horas: {data.horas}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2">
                                            Fecha de Emisión: {new Date(data.fecha_emision).toLocaleDateString()}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2">
                                            Fecha de Conclusión: {new Date(data.fecha_conclusion).toLocaleDateString()}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2">Número de Registro: {data.numero_registro}</Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        }</Card>
        
                        <Typography variant="h5" gutterBottom>NIVEL {data?.nivel}</Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>CURSO</TableCell>
                                        <TableCell>CICLO</TableCell>
                                        <TableCell>NOTAS</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        detail.map((item,index)=>(
                                            <TableRow key={index}>
                                                <TableCell>{item.curso}</TableCell>
                                                <TableCell>{`${item.ciclo} ${item.modalidad}` }</TableCell>
                                                <TableCell>{item.nota}</TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    
                ):(
                    <Box>
                        No result
                    </Box>
                )
            }
        </>
    )
}
