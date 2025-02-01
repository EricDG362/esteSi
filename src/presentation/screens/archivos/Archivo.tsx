import { format } from 'date-fns';
import React from 'react'
import { Pressable, StyleSheet, Text, View, Animated } from 'react-native'


type ArchivoProps = {
  item: {
    id: string;
    sumario: string;
    proce: string;
    fecha: Date;
  };
  onLongPress: (id: string) => void; // Agregamos la función como prop
  onPress: (id: string, proce: string, sumario: string, fecha: Date) => void;

};


const Archivo = ({ item, onLongPress, onPress }: ArchivoProps) => {

  const { id, sumario, proce, fecha } = item;

  const formatoFecha = (fecha: string | Date): string => {
    const nuevaFechaa = new Date(fecha);

    // Validar si la fecha es válida
    if (isNaN(nuevaFechaa.getTime())) {
      return "Fecha inválida";
    }

    const opciones: Intl.DateTimeFormatOptions = {
      weekday: "long", // Día de la semana
      year: "numeric", // Año
      month: "long",   // Mes
      day: "numeric",  // Día
    };

    // Devuelve la fecha formateada
    return nuevaFechaa.toLocaleDateString("es-ES", opciones);
  };


  const nuevafecha = fecha
  // Formato deseado
  let fechaParaM = '';
  if (nuevafecha !== undefined && nuevafecha !== null) {
    fechaParaM = format(new Date(nuevafecha), 'dd/MM/yyyy');
  }


  return (
    <Pressable

      onPress={() => { onPress(id, proce, sumario, fecha) }}
    >

      <View style={[e.caja]}>


        <View>
          <Text style={e.label}>Sumario: </Text>
          <Text style={e.textoSumario}>{sumario}</Text>


          <Text style={e.textofecha}>{formatoFecha(fecha)}</Text>

        </View>

        <Pressable
          onLongPress={() => { onLongPress(id) }} //lo envoplvemos en una funcion
          style={e.botonEliminar}>
          <Text style={e.textEliminar}>X</Text>
        </Pressable>


      </View>
    </Pressable>

  )
}


const e = StyleSheet.create({


  caja: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5', //gris muy claro
    marginVertical: 5,
    borderRadius: 18,
    width:'100%',
    paddingHorizontal: 20,
    paddingVertical:10,
    borderBottomColor: '#FF0000',
    borderWidth: 3,
    //sombra para la caja
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5



  },
  label: {
    color: '#374151',
    textTransform: 'uppercase',
    fontWeight: 700,
    marginBottom: 10,
    fontSize:20,


  },

  textoSumario: {
    color: '#037F4A',
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 10

  },

  textofecha: {

    color: "#800000",
    fontSize:15,
    fontWeight:'500'

  },

  botonEliminar: {
    backgroundColor: '#CC0000',
    alignItems: 'flex-end',
    padding: 10,
    marginBottom: 55,
    borderRadius: 5,
    alignContent: 'center'
  },
  textEliminar: {
    color: '#ffff',
    fontWeight: '900',
    fontSize:18

  },



})

export default Archivo