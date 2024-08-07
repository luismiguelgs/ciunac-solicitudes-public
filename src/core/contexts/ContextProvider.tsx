import React from "react";
import { obtenerPeriodo } from "../../core/libs/util";
import { Icertificado, Icurso, Ifacultad, Itexto } from "../../core/interfaces/Types";
import IsolUbicacion from "../interfaces/ISolicitud";
import uploadLogo from '../../assets/upload.svg'

const AUTH = import.meta.env.VITE_AUTH

type ContextValue = {
    auth: boolean,
    setAuth: React.Dispatch<React.SetStateAction<boolean>>,
    certificados:Icertificado[],
    setCertificados: React.Dispatch<React.SetStateAction<Icertificado[]>>,
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    data: IsolUbicacion,
    setData: React.Dispatch<React.SetStateAction<IsolUbicacion>>,
    facultades: Ifacultad[]
    setFacultades: React.Dispatch<React.SetStateAction<Ifacultad[]>>,
    cursos: Icurso[],
    setCursos: React.Dispatch<React.SetStateAction<Icurso[]>>,
    textos: Itexto[],
    setTextos: React.Dispatch<React.SetStateAction<Itexto[]>>,
    openManual: boolean,
    setOpenManual: React.Dispatch<React.SetStateAction<boolean>>,
    extensiones: Record<string,boolean>,
    setExtensiones: React.Dispatch<React.SetStateAction<Record<string,boolean>>>,
}

const StateContext = React.createContext<ContextValue | undefined>(undefined)

export const ContextProvider = ({children}:React.PropsWithChildren<{}>) => 
{
    const [auth, setAuth] = React.useState<boolean>(AUTH);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [textos, setTextos] = React.useState<Itexto[]>([])
    const [facultades, setFacultades] = React.useState<Ifacultad[]>([])
    const [cursos, setCursos] = React.useState<Icurso[]>([])
    const [certificados, setCertificados] = React.useState<Icertificado[]>([]);
    const [openManual, setOpenManual] = React.useState<boolean>(false);
    const [extensiones, setExtensiones] = React.useState<Record<string,boolean>>({'img_dni':false,'img_voucher':false,'img_cert_estudio':false,'img_cert_trabajo':false})

    const [data, setData] = React.useState<IsolUbicacion>({
        tipo_solicitud: '', //' CERTIFICADO_DE_ESTUDIO',
        periodo: obtenerPeriodo(),
        img_voucher : uploadLogo,
        img_cert_trabajo: uploadLogo,
        img_cert_estudio: uploadLogo,
        img_dni: uploadLogo,
        numero_voucher: '',
        pago: 0, //30
        fecha_pago: '',
        idioma: 'INGLES',
        nivel: 'BASICO',
        dni: '',
        nombres: '',
        apellidos: '',
        telefono: '',
        facultad: 'PAR',
        email: '',
        trabajador: false,
        antiguo: false,
        alumno_ciunac: false
    })

    const contextValue: ContextValue = {
        auth,
        setAuth,
        data,
        setData,
        textos,
        setTextos,
        cursos,
        setCursos,
        facultades,
        setFacultades,
        loading,
        setLoading,
        certificados,
        setCertificados,
        openManual,
        setOpenManual,
        extensiones,
        setExtensiones
    }

    return(
        <StateContext.Provider value={contextValue}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = ():ContextValue => {
    const context = React.useContext(StateContext)

    if(!context){
        throw new Error("useStateContext muy be uded within a ContextProvidewr")
    }
    return context;
}