import React from 'react'
import {StyleSheet, Text, View} from 'react-native'


type ArchivoProps = {
  item: {
    id: string;
    sumario: string;
    proce: string;
  };
};

const Archivo = ({item}: ArchivoProps) => {


  const {sumario, proce} = item




  return (
    <View style={e.caja}>

  
    <Text style={e.textoSumario}>{sumario}</Text>
    

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