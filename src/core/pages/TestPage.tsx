import { PDFViewer } from "@react-pdf/renderer";
import CargoPdf from "../../solicitud-ubicacion/components/CargoPdf";
import { useStateContext } from "../contexts/ContextProvider";

const obj = {
    solicitud: 'EXAMEN_DE_UBICACION',
    creado: new Date().toLocaleString(),
    apellidos: 'Prueba prueba',
    nombres: 'Prueba Uno',
    dni: '01422355',
    idioma: 'INGLES',
    nivel: 'BASICO',
    pago: 50,
    numero_voucher: '4582496321'
}

export default function TestPage() 
{
    const { textos } = useStateContext()
    return (
        <div>
            <PDFViewer width={800} height={600}>
                <CargoPdf textos={textos} obj={obj}/>
            </PDFViewer>
        </div>
    )
}
