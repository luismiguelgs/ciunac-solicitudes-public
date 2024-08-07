import React from 'react'
import { useStateContext } from '../../core/contexts/ContextProvider'
import { useNavigate } from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha'
import Formulario from '../components/inicio/Formulario'
import { MySnackBar } from '../../core/components/mui'

export default function Inicio() 
{
    const {setAuth} = useStateContext()
    const navigate = useNavigate()
    const captchaRef = React.useRef<ReCAPTCHA>(null)
    

    //estado de snackbar informativo
    const [open, setOpen] = React.useState<boolean>(false);
    
    //iniciar proceso
    const handleClick = () => {
        if(!captchaRef.current?.getValue()){
            setOpen(true)
        }
        else{
            setAuth(true) 
            setOpen(false)
            navigate("./proceso")
        }
    }
    
    return (
       <>
            <Formulario handleClick={handleClick} captchaRef={captchaRef} />
            <MySnackBar 
                open= {open}
                content="Ingresar los datos solicitados RE-CAPTCHA"
                setOpen={setOpen}
                variant='filled'
                severity="error" /> 
       </>
    )
}
