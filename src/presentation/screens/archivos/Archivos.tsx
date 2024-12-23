import React from 'react'
import {
  Keyboard, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, TextInput, FlatList,
} from 'react-native'
import { gql, useQuery } from '@apollo/client'
import Archivo from './Archivo'



const OBTENER_PROCEDIMIENTOS = gql`

query obtenerProcedimientos {
obtenerProcedimientos {
     sumario
     proce
     id
     }
 } 

`


const Archivos = () => {


  const { data, loading, error } = useQuery(OBTENER_PROCEDIMIENTOS) //en este caso es object distructuring

  if (loading) return <Text style={e.titulo}>Cargando...</Text>;

  if (error) {
    console.log('Error al cargar datos:', error);
    return <Text style={e.titulo}>Error al cargar datos</Text>;
  }



  return (

    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={e.container}>

        <Text style={e.titulo}>Procedimientos</Text>

        <TextInput
          style={e.input}
          placeholder='N° de SUMARIO'
          keyboardType="default"

        />


        <FlatList
          data={data?.obtenerProcedimientos || []} // Array de datos
          renderItem={({ item }) => <Archivo item={item} />} // Pasamos cada `item` al componente Archivo
          keyExtractor={(item) => item.id} // Clave única para cada elemento
        />




      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}


const e = StyleSheet.create({
  container: {
    backgroundColor: '#8A2BE2',
    flex: 1,
    alignItems: 'center',

  },
  titulo: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: '900',
    fontSize: 20,
    marginTop: 30,

  },
  input: {
    backgroundColor: '#FFF',
    width: '60%',
    marginTop: 30,
    marginBottom: 40,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 15

  },

})

export default Archivos