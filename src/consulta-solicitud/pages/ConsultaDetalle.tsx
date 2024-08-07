import {Avatar, Paper, Grid, Typography, Card, Stack, CardHeader, CardMedia, CardContent, Button, Box, Alert } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useLocation } from 'react-router-dom';
import { Isolicitud } from '../interfaces/Isolicitud';
import { Timestamp } from 'firebase/firestore';
import proceso1 from '../../assets/2.png'
import proceso2 from '../../assets/3.png'
import pdfImage from '../../assets/pdf.png'
import { pdf } from '@react-pdf/renderer'
import CargoPdf from '../../core/components/pdf/CargoPdf'
import { useStateContext } from '../../core/contexts/ContextProvider';
import WestIcon from '@mui/icons-material/West';

export default function ConsultaDetalle() 
{
    const {textos} = useStateContext()
    const location = useLocation()
    const data:Isolicitud[] = location.state?.data || [] 

    
    const descargarPDF = async(item:any) => {
        const obj =  {
            solicitud:item.solicitud,
            creado:item.creado,
            apellidos:item.apellidos,
            nombres:item.nombres,
            dni:item.dni,
            idioma:item.idioma,
            nivel:item.nivel,
            pago: item.pago,
            voucher: item.numero_voucher
        }
        const cargoPdfElement = <CargoPdf textos={textos} obj={obj}/>
        const blobPdf = await pdf(cargoPdfElement).toBlob()
        const blobUrl = URL.createObjectURL(blobPdf);
        // Crear un enlace (hipervínculo) invisible
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = blobUrl
        a.download = `${item.dni}-${item.idioma}-${item.nivel}.pdf`

        // Agregar el enlace al documento y hacer clic para iniciar la descarga
        document.body.appendChild(a);
        a.click();

        // Limpiar el enlace después de la descarga
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);

    }
    
    return (
        <Grid container component="main" sx={{ height: '80vh' }}>
            <CssBaseline />
            <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square sx={{p:3}}>
                {
                    data && (<>
                        <Typography variant='h5'>{data[0].apellidos} {data[0].nombres}</Typography>
                            <Stack spacing={2}>
                            {
                                data.map((item)=>(
                                    <Card key={item.id}>
                                        <CardHeader avatar={
                                            <Avatar>
                                            {
                                                item.estado === 'NUEVO' ? 
                                                    (<HourglassBottomIcon color='info'/>) : 
                                                    item.estado === 'ELABORADO' ?
                                                        (<CheckCircleIcon  color='success'/>) : 
                                                        (<ThumbUpOffAltIcon />)
                                            }
                                            </Avatar>}
                                                title={item.solicitud}
                                                subheader={(new Date((item.creado as Timestamp).seconds * 1000)).toLocaleDateString()}>
                                        </CardHeader>
                                        {
                                            item.estado === 'NUEVO' ? 
                                                (<CardMedia
                                                    component="img"
                                                    //height="170"
                                                    sx={{p:0, minHeight:'50px'}}
                                                    image={proceso1}
                                                    alt="Proceso"
                                                />) : 
                                                item.estado === 'ELABORADO' ?
                                                    (<CardMedia
                                                        component="img"
                                                        //height="170"
                                                        sx={{p:0, minHeight:'50px'}}
                                                        image={proceso2}
                                                        alt="Proceso2"
                                                    />) : null
                                        }
                                        <CardContent>
                                            <Typography variant="h6" color="text.secondary">
                                                Idioma: <b>{item.idioma}</b> Nivel: <b>{item.nivel}</b>
                                            </Typography>
                                            <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', gap: '10px', mt:2}}>
                                                <img src={pdfImage} alt={item.id}  width='50px' style={{margin:'5px', cursor:'pointer'}} onClick={()=>descargarPDF(item)} ></img>
                                                <Button size="large" onClick={()=>descargarPDF(item)}>{`${item.dni}-${item.idioma}-${item.nivel}.PDF`}</Button>
                                                <WestIcon color='error' />
                                                <Typography variant="h6" color="error">
                                                    Puede descargar su cargo aqui!
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                ))
                            }
                                <Alert severity='info' sx={{m:1}}>
                                    {textos.find(objeto=> objeto.titulo === 'texto_ubicacion_5')?.texto}
                                </Alert>
                            </Stack>
                    </>)
                }
            </Grid> 
        </Grid>
    )
}
