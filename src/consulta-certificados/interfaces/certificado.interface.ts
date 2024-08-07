export interface Icertificado{
    id?:string,
    alumno: string,
    tipo: 'virtual' | 'fisico'
    id_solicitud?: string,
    idioma: string,
    nivel: string,
    horas: number,
    fecha_emision: Date,
    numero_registro : string,
    fecha_conclusion: Date,
    creado?: any,
    modificado?: any
}
export interface IcertificadoDetalle{
    id?: string,
    id_certificado: string,
    curso: string,
    ciclo: string,
    modalidad: string
    nota: number,
    isNew: boolean
}