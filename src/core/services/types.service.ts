import { Icertificado, Icurso, Ifacultad, Itexto } from "../interfaces/Types";
import { firestore } from './firebase.service';
import { collection, getDocs } from 'firebase/firestore';

export default class TypesService
{
    private static textosDB = collection(firestore, 'textos');
    private static facultadesDB = collection(firestore, 'facultades');
    private static cursosDB = collection(firestore, 'cursos');
    private static tipo_certificadosDB = collection(firestore, 'certificados');
  
    public static async fetchTextos():Promise<Itexto[]>{
        try{
            const data = await getDocs(this.textosDB)
            const result: Itexto[] = []
            data.forEach((doc)=>{
                result.push({...doc.data(), id:doc.id } as Itexto)
            })
            return result
        } catch(error){
            console.error("Error al obtener documentos", error)
            throw error
        }
    }
    public static async fetchFacultades():Promise<Ifacultad[]>{
        try{
            const data = await getDocs(this.facultadesDB)
            const result: Ifacultad[] = []
            data.forEach((doc)=>{
                result.push({...doc.data(), id:doc.id } as Ifacultad)
            })
            return result
        } catch(error){
            console.error("Error al obtener documentos", error)
            throw error
        }
    }
    public static async fetchCursos():Promise<Icurso[]>{
        try{
            const data = await getDocs(this.cursosDB)
            const result: Icurso[] = []
            data.forEach((doc)=>{
                result.push({...doc.data(), id:doc.id } as Icurso)
            })
            return result
        } catch(error){
            console.error("Error al obtener documentos", error)
            throw error
        }
    }
    public static async fetchTipoCertificados():Promise<Icertificado[]>{
        try{
            const data = await getDocs(this.tipo_certificadosDB)
            const result: Icertificado[] = []
            data.forEach((doc)=>{
                result.push({...doc.data(), id:doc.id } as Icertificado)
            })
            return result
        } catch(error){
            console.error("Error al obtener documentos", error)
            throw error
        }
    }
}