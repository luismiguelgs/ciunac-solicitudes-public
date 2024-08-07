import { Document, Page, StyleSheet, Image, Text } from "@react-pdf/renderer"
import logoCiunac from '/logo_ciunac.jpg'
import React from "react"
import { Itexto } from "../../core/interfaces/Types"

const styles = StyleSheet.create({
    page:{
        paddingTop:45,
        paddingBottom:65,
        paddingHorizontal: 45
    },
    image:{
		marginBottom: 50,
		marginHorizontal: 10,
		width: 200,
	},
    title:{
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 15
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
    },
    data: {
        marginHorizontal:12,
        marginVertical:5,
        fontSize: 13,
        textAlign: 'justify'
    }
})

type Props = {
    textos: Itexto[],
    obj: any
}
const CargoPdf:React.FC<Props> = ({textos,obj}) => (
    <Document>
            <Page size='A4' style={styles.page}>
                <Image style={styles.image} src={logoCiunac}/>
                <Text style={styles.title}>CARGO PARA EXAMEN DE UBICACIÓN</Text>
                <Text style={styles.text}>SE HA COMPLETADO EL PROCEDIMIENTO!</Text>
                <Text style={styles.text}>
                    {message('texto_ubicacion_3',textos)}
                </Text>
                <Text style={styles.data}>{`Tipo de Documento: ${obj.solicitud.toLocaleUpperCase()}`}</Text>
                <Text style={styles.data}>{`Fecha de Ingreso: ${obj.creado}`}</Text>
                <Text style={styles.data}>{`Apellidos: ${obj.apellidos.toLocaleUpperCase()}`}</Text>
                <Text style={styles.data}>{`Nombres: ${obj.nombres.toLocaleUpperCase()}`}</Text>
                <Text style={styles.data}>{`DNI: ${obj.dni.toLocaleUpperCase()}`}</Text>
                <Text style={styles.data}>{`Idioma: ${obj.idioma.toLocaleUpperCase()}`}</Text>
                <Text style={styles.data}>{`Nivel: ${obj.nivel.toLocaleUpperCase()}`}</Text>
                <Text style={styles.data}>{`Pago: S/${obj.pago}`}</Text>
                <Text style={styles.data}>{`Número de Voucher: ${obj.voucher}`}</Text>
                <Text style={styles.text}>
                    {message('texto_ubicacion_4',textos)}
                </Text>
            </Page>
    </Document>
)

function message(text:string, textos:Itexto[]):string{
    let objEncontrado = textos.find(objeto=> objeto.titulo === text)
    return objEncontrado ? objEncontrado.texto : '';
}

export default CargoPdf