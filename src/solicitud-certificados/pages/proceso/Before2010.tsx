import { Box, TextField, Button, Alert } from "@mui/material"
import React from "react"
import { MES, CICLOS }  from '../../../core/libs/constants'
import { useMask } from '@react-input/mask';
import {MySnackBar, MySelect} from "../../../core/components/mui";
import TableSimple, { IColumn } from "../../../core/components/TableSimple";
import { IformData, Irow } from "../../../core/interfaces/Types";
import { useStateContext } from "../../../core/contexts/ContextProvider";
import ControlStepper from "./ControlStepper";
import { useFormik } from "formik";

const columns: IColumn[] = [
    { id: 'ciclo', label: 'CICLO', minWidth: 150 },
    { id: 'mes', label: 'MES', minWidth: 120 },
    { id: 'anno', label: 'AÑO', minWidth: 120 },
    { id: 'profesor', label: 'PROFESOR', minWidth: 120 },
];

type Props = {
    rows: Irow[],
    setRows: React.Dispatch<React.SetStateAction<Irow[]>>
    onSubmit : (values:any) => void
    handleBack : () => void
    activeStep: number
}

export default function Before2010({ rows, setRows, onSubmit, handleBack, activeStep}:Props)
{   
    const { textos, data } = useStateContext()
    const [open, setOpen] = React.useState<boolean>(false)

    const formik = useFormik({
        initialValues: {
            ciclo: '',
            anno: '',
            mes: '',
            profesor: ''
        },
        onSubmit: (values) => {
            if(rows.length === 0){
                console.log(values);
            }else{
                console.log(rows)
                onSubmit({})
            }
        }
    })

    //variables de prueba
    let niveles: any[] = []
    let annos: any[] = []

    
    //************************Poblar Selects ******************************************************************************* */
    const poblarAnnos = () =>{
        for (let index = 2000; index < 2010; index++) {
           annos.push({value:index, label:index.toString()})
        }
    }
    const poblarArreglo = (ciclos:number):void =>{
        for (let index = 1; index <= ciclos; index++) {
            niveles.push({value:data.nivel + ' ' + index,label:data.nivel + ' ' + index})                
        }
    }
    const agregarCiclo = ():void =>{
        setIndex(new Date().getTime())
        let row:Irow = {
            id:index,
            ciclo:formData.ciclo,
            anno:formData.anno,
            mes:formData.mes,
            profesor:formData.profesor
        }
        setRows([...rows,row])
        setFormData((prevFormData)=>({...prevFormData, profesor:''}))
    }
    const eliminarCiclo = (id:number | undefined):void =>{
        setRows(rows.filter(r=>r.id !== id))
    }
    const obtenerNumeroCiclos = (idioma: string, nivel: string): number => {
        const tupla = CICLOS.find(([i, n]) => i === idioma && n === nivel);
        return tupla ? tupla[2] : 0; // Devolver 0 si no se encuentra la combinación
    };
    
    poblarArreglo(obtenerNumeroCiclos(data.idioma, data.nivel))
    poblarAnnos()

    const [formData, setFormData] = React.useState<IformData>({
        ciclo:niveles[0].value,
        mes:'ENERO',
        anno:'2009',
        profesor:''
    })
    const handleChange = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target
        setFormData((prevFormData)=>({...prevFormData, [name]:value}))
    }
    const profesorRef = useMask({ mask: '______________________________', replacement: { _: /^[a-zA-Z \u00C0-\u00FF]*$/ } });

    const [index,setIndex] = React.useState<number>(0)

    return(
        <Box sx={{m:1}} component='form' onSubmit={formik.handleSubmit}>
            <Alert sx={{m:1}} severity="warning">
                {textos.find(objeto=> objeto.titulo === 'texto_1_2010')?.texto}<b>{` IDIOMA: ${data.idioma}`}</b> 
            </Alert>
            <MySelect 
                name="ciclo"
                label="Ciclo"
                sx={{m:1}}
                value={formData.ciclo}
                handleChange={e=>handleChange(e)}
                helperText="Seleccionar ciclo"
                data={niveles}
                fullWidth={false}
            />
            <MySelect 
                name="mes"
                label="Mes"
                sx={{m:1}}
                value={formData.mes}
                handleChange={e=>handleChange(e)}
                helperText="Seleccionar mes"
                data={MES}
                fullWidth={false}
            />
            <MySelect 
                name="anno"
                sx={{m:1}}
                handleChange={e=>handleChange(e)}
                helperText="Seleccionar año"
                label="Año"
                value={formData.anno}
                data={annos}
                fullWidth={false}
            />
            <TextField
                inputRef={profesorRef}
                sx={{m:1}}
                name="profesor"
                label="Nombre Profesor"
                value={formData.profesor}
                onChange={e=>handleChange(e)}
            />
            <Button sx={{m:1}} variant="contained" size="large" onClick={()=>agregarCiclo()} disabled={rows.length>8}>
                Agregar
            </Button>
            <TableSimple 
                columns={columns} 
                action={true}
                del={true}
                rows={rows}
                handleDelete={eliminarCiclo}
            />
            <Alert sx={{m:1}} severity="info">
                En caso usted no tenga una matrícula antes del año 2010 puede omitir este paso.
            </Alert>
            <ControlStepper activeStep={activeStep} handleBack={handleBack} steps={4} />
            <MySnackBar 
                open={open}
                setOpen={setOpen}
                severity="error"
                content="Ingresar los datos solicitados de ciclo, mes, año" />
        </Box>
    )
}