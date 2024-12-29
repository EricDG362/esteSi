import React from 'react'
import {
  Keyboard, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, TextInput, FlatList,
  Alert,
} from 'react-native'
import { gql, useQuery, useMutation } from '@apollo/client'
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

const ELIMINAR_PROCEDIMIENTO = gql`

mutation eliminarProcedimiento ($id: ID!) {

eliminarProcedimiento (id: $id)

}

`


const Archivos = () => {


  const { data, loading, error } = useQuery(OBTENER_PROCEDIMIENTOS) //en este caso es object distructuring
 const [eliminarProcedimiento] = useMutation(ELIMINAR_PROCEDIMIENTO) //para eliminar proce

  if (loading) return <Text style={e.titulo}>Cargando...</Text>;

  if (error) {
    console.log('Error al cargar datos:', error);
    return <Text style={e.titulo}>Error al cargar datos</Text>;
  }



    // Maneja el evento `onLongPress`
    const mensajeEliminarProce = (id: string) => {
      Alert.alert(
        'Confirmación',
        '¿Deseas eliminar este Procedimiento?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Eliminar', onPress: () => EliminarProce(id) },
        ]
      );
    };

    const EliminarProce = async (id: string) => {
      console.log('ID enviado a la mutación desde eliminarProce:', id); // Verifica este valor
  

      if (!id) {
        console.error('Error: El ID no es válido.');
        Alert.alert('Error', 'El ID del procedimiento no es válido.');
        return;
      }
    
      try {
        const { data } = await eliminarProcedimiento({
          variables: { id },
        });
    
        Alert.alert( 'Eliminado',
          'Procedimiento Eliminado con Exito!!!',
          [{ text: 'Ok' }])
        console.log('Respuesta de la eliminación:', data);
         // Refresca la lista de procedimientos
      } catch (error) {
        console.error('Error al eliminar el procedimiento:', error);
        Alert.alert('Error', 'No se pudo eliminar el procedimiento. Inténtalo nuevamente.');
      }
    };




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
          renderItem={({ item }) =>
             <Archivo item={item} 
             onLongPress={mensajeEliminarProce} //aca rescata el onlongporess de archivo.tsx y llma lam funcion eliminarproce
             />} // Pasamos cada `item` al componente Archivo
          keyExtractor={(item) => item.id} // Clave única para cada elemento
          ListEmptyComponent={<Text style={e.titulo}>No hay procedimientos disponibles</Text>} //si no hay q muestre esto
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