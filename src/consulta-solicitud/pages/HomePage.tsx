import * as React from 'react';
import {Avatar, Button, TextField, Paper, Box, Grid, Typography, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { MyDialog } from '../../core/components/mui';
import ReCAPTCHA from "react-google-recaptcha";
import { useMask } from '@react-input/mask';
import SolicitudesService from '../services/SolicitudesService';
import { Isolicitud } from '../interfaces/Isolicitud';
import { useNavigate } from 'react-router-dom';
import Copyright from '../components/Copyright';
import * as yup from 'yup'
import { useFormik } from 'formik';

const dniRequired = 'DNI es un campo requerido'
const dniLength = 'DNI debe ser de 8 digitos' 

let validationSchema = yup.object({
    dni: yup.string().required(dniRequired).trim().min(8, dniLength).max(8, dniLength),
})

type Props = {
    setAuth: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function HomePage({setAuth}:Props) 
{
    const navigate = useNavigate()
    const captchaRef = React.useRef<ReCAPTCHA>(null)
    const dniRef = useMask({ mask: '________', replacement: { _: /\d/ } });
    const [disabled, setDisabled] = React.useState<boolean>(false)
    const [errorMsg, setErrorMsg] = React.useState<string>('') //Error Message
    const [open, setOpen] = React.useState<boolean>(false) //Alert

    const formik = useFormik({
        initialValues:{
            dni: '',
        },
        validationSchema,
        onSubmit: async(values)=> {
            setDisabled(true)
            if(!captchaRef.current?.getValue()){
                setErrorMsg('Captcha es un campo requerido')
                setOpen(true)
                setDisabled(false)
            }else{
                const result = await SolicitudesService.getItem(values.dni) as Isolicitud[];
                if(result.length > 0){   
                    setAuth(true)  
                    navigate('./detalle',{state:{data:result}})
                }else{
                    setOpen(true)
                    setDisabled(false)
                    setErrorMsg('No tiene solicitudes resgistradas')
                }
            }
        }
    })
    
    return (
        <Grid container component="main" sx={{ 
            height: '100vh', 
            width: '100%',
            backgroundImage: 'url(unsplash.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
        }}>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{
                margin: { xs: '0 auto', md: '0' }, // Center on mobile
                marginLeft: { md: '5%' },
                marginTop: {md: '2%'},
                marginBottom: {md: '2%'}, // Float to the left on larger screens
                width: { xs: '90%', sm: '80%', md: 'auto' }, // Responsive width
            }}>
                    <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Buscar mi solicitud
                    </Typography>
                    <Alert severity="info" aria-haspopup="true">
                        Ingresar su DNI, y verficar si esta listo para recoger su certificado
                    </Alert>
                    <Box component="form" noValidate onSubmit={formik.handleSubmit} >
                        <TextField
                            margin="normal"
                            inputRef={dniRef}
                            required
                            fullWidth
                            value={formik.values.dni}
                            label="DNI"
                            name="dni"
                            error={formik.touched.dni && Boolean(formik.errors.dni)}
                            autoComplete="dni"
                            autoFocus
                            onChange={formik.handleChange}
                            helperText={formik.touched.dni && formik.errors.dni}
                        />
                        <ReCAPTCHA sitekey={import.meta.env.VITE_APP_SITE_KEY} ref={captchaRef} />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={disabled}>Buscar</Button>
                        <Copyright />
                    </Box>
                </Box>
            </Grid>
            <MyDialog 
                content={errorMsg}
                open={open}
                setOpen={setOpen}
                title='Error'
                type='SIMPLE'
            />
        </Grid>
    )
}
