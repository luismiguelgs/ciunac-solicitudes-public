import { Box, Step, StepLabel, Stepper } from '@mui/material'
import React from 'react'
import DatosBasicos from './proceso/DatosBasicos'
import DatosFinancieros from './proceso/DatosFinancieros'
import IsolUbicacion from '../interfaces/IsolUbicacion'
import { useStateContext } from '../../core/contexts/ContextProvider'
import Documentos from './proceso/Documentos'
import Final from './proceso/Final'
import { IdocumentVal } from '../interfaces/Ivalidation'

export default function Proceso() 
{
    //hooks ***
    const { data, setData } = useStateContext()
    const [activeStep, setActiveStep] = React.useState<number>(0)
    //página de documentos
    const [docsVal, setDocsVal] = React.useState<IdocumentVal>({cert_trabajador: false, cert_ciunac: false})

    React.useEffect(()=>{
        const precio = 30//certificados.filter((cer)=> cer.value === data.solicitud)[0].precio
        if(data.trabajador){
          setData((prevData)=>({...prevData, pago:(precio-precio*0.8)}))
        }else{
          setData((prevData)=>({...prevData, pago:precio}))
        }
    },[data.trabajador])

    //functions ***
    const handleBack = ():void =>{
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }
    const handleNext = (values:IsolUbicacion):void => { 
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
            case 2:
                console.log(values);
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
            label: 'Información De pago', 
            component: (<DatosFinancieros onSubmit={handleNext} handleBack={handleBack} activeStep={activeStep} />), 
        },
    ]
    if(data.alumno_ciunac || data.trabajador){
        steps.push({
            label:"Certificados", 
            component:(<Documentos activeStep={activeStep} validation={docsVal} setValidation={setDocsVal} handleBack={handleBack} onSubmit={handleNext}/>), 
        }, {
            label:'Paso final',
            component:(<Final data={data} handleBack={handleBack} />),
        })
    }else{
        steps.push({
            label:'Paso final',
            component:(<Final data={data} handleBack={handleBack}/>),
        })
    }

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
