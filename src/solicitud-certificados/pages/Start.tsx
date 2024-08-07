import { Box, Button, Grid, TextField, InputAdornment, Skeleton } from "@mui/material";
import { useMask } from '@react-input/mask';
import React, { useState } from 'react'
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import TableSimple, { IColumn } from "../../core/components/TableSimple";
import {MySelect, MySnackBar} from "../../core/components/mui";
import Warning from "../components/Start/Warning";
import { IbasicVal } from "../interfaces/Ivalidation";
import { useStateContext } from "../../core/contexts/ContextProvider";
import Manual from "../components/Manual";
import Copyright from "../components/Start/Copyright";
import EmailIcon from '@mui/icons-material/Email';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import * as yup from 'yup'
import { useFormik } from 'formik';

const columns: IColumn[] = [
    { id: 'label', label: 'Certificado', minWidth: 150 },
    { id: 'precio', label: 'Precio S/', minWidth: 120 },
];

const msgReq = 'Campo Requerido'
const msgDni = 'Campo de 8 caracteres'
const emailRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 

let validationSchema = yup.object<IbasicVal>({
    tipo_solicitud: yup.string().required(msgReq).default('CERTIFICADO_DE_ESTUDIO'),    
    dni: yup.string().required(msgReq).trim().min(8, msgDni).max(8, msgDni),
    email: yup.string().required(msgReq).matches(emailRegex, 'Ingrese un correo electrónico válido')
})

type Props = {
    setTitle: React.Dispatch<React.SetStateAction<string>>,
    setAuth: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function Start({ setTitle, setAuth}:Props)
{
    const {certificados, textos, setData} = useStateContext()

    const navigate = useNavigate()
    const captchaRef = React.useRef<ReCAPTCHA>(null)
    const dniRef = useMask({ mask: '________', replacement: { _: /\d/ } });
     
    //estado de snackbar informativo
    const [open, setOpen] = useState<boolean>(false);

    const formik = useFormik<IbasicVal>({
        initialValues:{
            dni: '',
            email: '',
            trabajador: false,
            antiguo: false,
            tipo_solicitud: 'CERTIFICADO_DE_ESTUDIO'
        },
        validationSchema,
        onSubmit:(values)=>{
            
            setData((prevFormData)=>({
                ...prevFormData,
                email: values.email,
                dni: values.dni,
                trabajador: values.trabajador,
                antiguo: values.antiguo,
                tipo_solicitud: values.tipo_solicitud
            }))
            handleClick()
        }
    })

    //iniciar proceso
    const handleClick = () => {
        if(!captchaRef.current?.getValue()){
            setOpen(true)
        }else{
            const _title = formik.values.tipo_solicitud.split('_') 
            setTitle(_title[0] + ' ' + _title[1] + ' ' + _title[2])
            setAuth(true)
            setOpen(false)
            navigate("./proceso")
        }
       
    }

    return (
        <Box component="form" sx={{p:2}} noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} display='flex' justifyContent='center'>
                { 
                    certificados.length > 0 ? (
                    <MySelect 
                        data={certificados}
                        sx={{width:'70%'}}
                        label="Tipo de Solicitud"
                        fullWidth={false}
                        name="tipo_solicitud"
                        value={formik.values.tipo_solicitud}
                        handleChange={formik.handleChange}
                        error={formik.touched.tipo_solicitud && Boolean(formik.errors.tipo_solicitud)}
                        helperText={formik.touched.tipo_solicitud && formik.errors.tipo_solicitud}
                    />):
                    ( <Grid container justifyContent="center">
                    <Skeleton variant="rectangular" width={'70%'} height={60} />
                  </Grid>)
                }
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField      
                        required
                        name='email'
                        fullWidth
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        label="Email"
                        InputProps={{
                            startAdornment: (<InputAdornment position="start"><EmailIcon /></InputAdornment>),
                        }}
                        variant="outlined"
                        helperText={formik.touched.email && formik.errors.email}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        inputRef={dniRef}
                        required
                        fullWidth
                        error={formik.touched.dni && Boolean(formik.errors.dni)}
                        value={formik.values.dni}
                        onChange={formik.handleChange}
                        name="dni"
                        label="DNI"
                        helperText={formik.touched.dni && formik.errors.dni}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Warning
                        texto={textos.find(objeto=> objeto.titulo === 'texto_1_inicio')?.texto}
                        checked={formik.values.trabajador}
                        handleChange={formik.handleChange}
                        label="Trabajador UNAC"
                        mensaje="Hacer click si usted es trabajador."
                        name="trabajador" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Warning
                        texto={textos.find(objeto=> objeto.titulo === 'texto_2_inicio')?.texto}
                        checked={formik.values.antiguo}
                        handleChange={formik.handleChange}
                        label="Matriculado anterior al año 2010"
                        mensaje="Hacer click si usted termino antes del 2010."
                        name="antiguo" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box sx={{ alignContent:'center',alignItems:'center', p:1, display:'flex', flexDirection:'column'}} >
                        <ReCAPTCHA sitekey={import.meta.env.VITE_APP_SITE_KEY} ref={captchaRef} />
                        <Button type="submit" variant="contained" size="large" endIcon={<PlayCircleFilledIcon />} sx={{m:2}}>
                            Avanzar
                        </Button>
                    </Box>
                    <Copyright />
                </Grid>
                <Grid item xs={12}  sm={6}>
                    <TableSimple columns={columns} rows={certificados} action={false} />
                </Grid>
            </Grid>
            <MySnackBar 
                open= {open}
                content="Ingresar los datos solicitados RE-CAPTCHA"
                setOpen={setOpen}
                variant="filled"
                severity="error" />
            <Manual />
        </Box>
    )
}