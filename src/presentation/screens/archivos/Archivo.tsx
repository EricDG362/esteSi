import React from 'react'
import {Pressable, StyleSheet, Text, View} from 'react-native'


type ArchivoProps = {
  item: {
    id: string;
    sumario: string;
    proce: string;
  };
  onLongPress: (id: string) => void; // Agregamos la función como prop
};


const Archivo = ({item,onLongPress }: ArchivoProps) => {

const {id} = item


 


  const {sumario, proce} = item




  return (
    <View style={e.caja}>

  <Pressable
  onLongPress={ () => {onLongPress(id)}} //lo envoplvemos en una funcion
  >
    <Text style={e.textoSumario}>{sumario}</Text>
    </Pressable>

    </View>
  )
}


const e = StyleSheet.create({
  caja:{

    backgroundColor:'#fff',
    marginVertical: 10,
    borderRadius: 5,
    paddingHorizontal: 60

  },
  textoSumario:{
    fontSize:20,
    fontWeight:500,
    textAlign: 'left'

  },
})

export default Archivo