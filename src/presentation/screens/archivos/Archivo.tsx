import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'


type ArchivoProps = {
  item: {
    id: string;
    sumario: string;
    proce: string;
    fecha: Date;
  };
  onLongPress: (id: string) => void; // Agregamos la función como prop
  onPress: (id: string, proce: string, sumario:string, fecha:Date) => void
};


const Archivo = ({ item, onLongPress, onPress }: ArchivoProps) => {

  const { id } = item

  const { sumario, proce, fecha } = item

  return (
    <Pressable
      onLongPress={() => { onLongPress(id) }} //lo envoplvemos en una funcion
      onPress={() => {onPress (id,proce,sumario,fecha)}}
    >

      <View style={e.caja}>

        <Text style={e.textoSumario}>{sumario}</Text>

      </View>
    </Pressable>
  )
}


const e = StyleSheet.create({

  
  caja: {

    backgroundColor: '#fff',
    marginVertical: 10,
    borderRadius: 5,
    paddingHorizontal: 60

  },
  textoSumario: {
    fontSize: 20,
    fontWeight: 500,
    textAlign: 'left'

  },
})

export default Archivo