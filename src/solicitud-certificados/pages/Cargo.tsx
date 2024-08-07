import { Alert, Box, Button } from '@mui/material';
import { useLocation } from 'react-router-dom'
import pdfImage from '../../assets/pdf.png'
import { pdf } from '@react-pdf/renderer'
import { useStateContext } from '../../core/contexts/ContextProvider';
import Disclamer from '../components/Finish/Disclamer';
import CargoPdf from '../../core/components/pdf/CargoPdf';

export default function Cargo() 
{
    const {textos} = useStateContext()
    const location = useLocation()
    const data = location.state?.data || []

    const obj = {
        solicitud:data.solicitud,
        creado:data.creado,
        apellidos:data.apellidos,
        nombres:data.nombres,
        dni:data.dni,
        idioma:data.idioma,
        nivel:data.nivel,
        pago: data.pago,
        voucher: data.numero_voucher
    }

    const descargarPDF = async() =>{
        const cargoPdfElement = <CargoPdf textos={textos} obj={obj}/>
        const blobPDF = await pdf(cargoPdfElement).toBlob()
        const blobUrl = URL.createObjectURL(blobPDF);

        // Crear un enlace (hipervínculo) invisible
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = blobUrl
        a.download = `${data.dni}-${data.idioma}-${data.nivel}.pdf`

        // Agregar el enlace al documento y hacer clic para iniciar la descarga
        document.body.appendChild(a);
        a.click();

        // Limpiar el enlace después de la descarga
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
    }
    
    return (
        <Box sx={{m:3}}>
            <Alert sx={{mt:2, mb:2}}  severity="success">Se ha completado el procedimiento puede descargar su cargo!</Alert>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                {data.map((item:any)=>(
                    <div key={item.id}  style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img src={pdfImage} alt={item.id}  width='50px' style={{margin:'5px', cursor:'pointer'}} onClick={()=>descargarPDF()} ></img>
                        <Button size="large" onClick={()=>descargarPDF()}>{`${item.dni}-${item.idioma}-${item.nivel}.PDF`}</Button>
                    </div>
                ))}
            </Box>
            <Disclamer textoFinal={true} />
        </Box>
    )
}
