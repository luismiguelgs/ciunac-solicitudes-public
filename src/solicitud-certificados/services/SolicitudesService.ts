import { firestore } from '../../core/services/firebase.service';
import { collection, query, where, getDocs ,serverTimestamp, addDoc, orderBy} from 'firebase/firestore'
import { changeDate, obtenerPeriodo } from '../../core/libs/util';
import  ISolicitud  from '../../core/interfaces/ISolicitud';
import { Irow } from '../../core/interfaces/Types';

export default class SolicitudesService
{
    private static db = collection(firestore, 'solicitudes')
    private static db_2010 = collection(firestore, 'solicitudes_2010')

    public static async fetchItemsQuery(setData:React.Dispatch<React.SetStateAction<ISolicitud[]>>,setTempData:React.Dispatch<React.SetStateAction<ISolicitud[]>>){
      const itemQuery =  query(this.db, where('estado',"==","ELABORADO"), orderBy('creado'))
          const d = await getDocs(itemQuery);
          
          setData(d.docs.map((item)=>{
              return { ...item.data(), id: item.id, creado: changeDate(item.data().creado) } as unknown as ISolicitud
          }));
          setTempData(d.docs.map((item)=>{
            return { ...item.data(), id: item.id, creado: changeDate(item.data().creado) } as unknown as ISolicitud
        }));
    }

    public static async getItem(dni:string)
    {
        const q = query(
            this.db,
            where('dni','==',dni) , 
            orderBy('creado','desc')
        )
        // Obtenemos los documentos que cumplen la consulta
        const  querySnapshot = await getDocs(q)

        // Devolvemos un array con los datos de los documentos, incluyendo el ID
        return querySnapshot.docs.map((doc) => {
            const data = doc.data();
            // Agregamos el campo 'id' al objeto data
            data.id = doc.id;
            return data;
        });
    }
    public static async fetchRecord(idioma:string,nivel:string,dni:string,solicitud:string){
        const q = query(
            this.db,
            where('dni','==',dni),
            where("idioma","==",idioma),
            where("nivel","==",nivel),
            where('solicitud','==',solicitud),
            where('estado','!=','ENTREGADO')
        )
        // Obtenemos los documentos que cumplen la consulta
        const querySnapshot = await getDocs(q)
    
        // Devolvemos un array con los datos de los documentos, incluyendo el ID
        return querySnapshot.docs.map((doc) => {
          const data = doc.data();
          // Agregamos el campo 'id' al objeto data
          data.id = doc.id;
          return data;
        });
    }
    public static async newItem(data:ISolicitud, constancia:string, data2010:Irow[]){
        //console.log(data, constancia);
        
        const dataS = {
            solicitud:data.tipo_solicitud,
            estado:'NUEVO',
            pago:+data.pago,
            dni:data.dni,
            email:data.email,
            trabajador:data.trabajador,
            antiguo:data.antiguo,
            nombres:data.nombres,
            apellidos:data.apellidos,
            celular:data.telefono,
            idioma:data.idioma,
            nivel:data.nivel,
            facultad:data.facultad,
            codigo:data.codigo,
            certificado_trabajo:constancia,
            voucher:data.img_voucher as string,
            numero_voucher:data.numero_voucher,
            fecha_pago: data.fecha_pago,
            manual:false,
            periodo: obtenerPeriodo(),
            creado:serverTimestamp(),
            modificado:serverTimestamp()
        }
        let docRef = null
        try{
          docRef = await addDoc(this.db, dataS)
        }catch(err){
          console.log(err);
        }
        let newID = null
        if(docRef) newID = docRef.id;
        if(data2010){
          for (let index = 0; index < data2010.length; index++) {
            const data = {
              documento:newID,
              ciclo:data2010[index].ciclo,
              anno: data2010[index].anno,
              mes: data2010[index].mes,
              profesor: data2010[index].profesor
            }
            try{
              let docRef1 = await addDoc(this.db_2010, data)
              console.log(docRef1);              
            }catch(err){
              console.log(err);
            }            
          } 
        }
    }
}