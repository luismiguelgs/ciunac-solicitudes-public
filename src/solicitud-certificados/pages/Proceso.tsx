import { Box, Step, StepLabel, Stepper } from "@mui/material"
import DatosBasicos from "./proceso/DatosBasicos"
import { useStateContext } from "../../core/contexts/ContextProvider"
import React from "react"
import ISolicitud from "../../core/interfaces/ISolicitud"
import Before2010 from "./proceso/Before2010"
import { Irow } from "../../core/interfaces/Types"
import DatosFinancieros from "./proceso/DatosFinancieros"
import Final from "./proceso/Final"
import Documentos from "./proceso/Documentos"
import { IdocumentVal } from "../interfaces/Ivalidation"

export default function Proceso()
{
    //hooks ***
    const { data, setData, certificados } = useStateContext()
    const [activeStep, setActiveStep] = React.useState<number>(0)

    //página de documentos
    const [docsVal, setDocsVal] = React.useState<IdocumentVal>({cert_trabajador: false, cert_ciunac: false})
    
    //arreglo de cursos con fechas antes del 2010 (opcional) **********************************************
    const [rows, setRows] = React.useState<Irow[]>([])
    

    //información de pago *****
    React.useEffect(()=>{
        const precio = certificados.filter((cer)=> cer.value === data.tipo_solicitud)[0].precio
        if(data.trabajador){
            setData((prevData)=>({...prevData, pago:(precio-precio*0.8)}))
        }else{
            setData((prevData)=>({...prevData, pago:precio}))
        }
    },[data.tipo_solicitud, data.trabajador])

    //functions ***
    const handleBack = ():void =>{
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const handleNext = (values:ISolicitud):void =>{
        switch(activeStep){
            case 0:
                setData((prevFormData)=>({
                    ...prevFormData, 
                    apellidos:values.apellidos,
                    nombres: values.nombres,
                    codigo: values.codigo,
                    facultad: values.facultad as string,
                    idioma: values.idioma,
                    nivel: values.nivel,
                    telefono: values.telefono
                }))
                break
            case 1:
                setData((prevFormData)=>({
                    ...prevFormData, 
                    numero_voucher: values.numero_voucher,
                    pago: values.pago,
                    fecha_pago: values.fecha_pago
                }))
                break
            default:
                break
        }
        if(activeStep < steps.length - 1){
            setActiveStep((prevActiveStep) => prevActiveStep + 1)
        }
        else{
            console.log('final');
        }
    }
    
    const steps = [
        {
            label:'Información Básica', 
            component: (<DatosBasicos onSubmit={handleNext} handleBack={handleBack} activeStep={activeStep} />), 
        },
        {
            label: 'Infomación de Pago',
            component: (<DatosFinancieros onSubmit={handleNext} handleBack={handleBack} activeStep={activeStep} />)
        }

    ]
    if (data.antiguo){
        steps.push({
            label:'Matricula anterior al 2010', 
            component: (<Before2010 rows={rows} setRows={setRows} activeStep={activeStep} handleBack={handleBack} onSubmit={handleNext}/>)
        })
    }
    if (data.trabajador){
        steps.push({
            label:'Constancia de trabajo',
            component:(<Documentos validation={docsVal} setValidation={setDocsVal} activeStep={activeStep} handleBack={handleBack} onSubmit={handleNext}/>)
        })
    }
    steps.push({
        label:'Finalizar', 
        component: (<Final constancia={data.img_cert_trabajo as string} data={data} handleBack={handleBack} data2010={rows} />)
    })


    return (
        <Box width='100%' p={2}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {
                    steps.map((item, index)=>(
                        <Step key={index}>
                            <StepLabel>{item.label}</StepLabel>
                        </Step>
                    ))
                }
            </Stepper>
            <Box>
                {
                    activeStep === steps.length ? (
                        steps[steps.length-1].component
                    ):(
                        steps[activeStep].component
                    )
                }
            </Box>
        </Box>
    )
        
}