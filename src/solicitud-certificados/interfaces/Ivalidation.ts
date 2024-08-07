export interface IbasicVal{
    tipo_solicitud: string,
    email:string,
    dni:string,
    trabajador: boolean,
    antiguo: boolean
}
export interface IfinVal{
    //imagen:boolean,
    numero_voucher:string,
    pago:number
    fecha_pago:boolean
}
export interface IstudentVal{
    apellidos:string,
    nombres:string,
    telefono:string
    idioma:string,
    nivel:string,
    codigo:string,
    alumno?: boolean,
    facultad:string
}
export interface IdocumentVal{
    cert_trabajador:boolean,
    cert_ciunac: boolean
}