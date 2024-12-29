import React,{useState}from 'react'
import {
  Keyboard, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, TextInput, FlatList,
  Alert,
} from 'react-native'
import { gql, useQuery, useMutation } from '@apollo/client'
import Archivo from './Archivo'
import { useNavigation } from '@react-navigation/native'



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

eliminarProcedimiento (id: $id){
      id
      sumario
      proce
      mensaje
}

}

`


// Define un tipo para los procedimientos
type Procedimiento = {
  id: string;
  sumario: string;
  proce: string;
};

const Archivos = () => {
  const navi = useNavigation();

  // Nuevo estado para manejar el texto del filtro
  const [filtro, setFiltro] = useState('');

  const { data, loading, error } = useQuery<{ obtenerProcedimientos: Procedimiento[] }>(OBTENER_PROCEDIMIENTOS);

  const [eliminarProcedimiento] = useMutation(ELIMINAR_PROCEDIMIENTO, {
    update(cache, { data: { eliminarProcedimiento } }) {
      const data = cache.readQuery<{
        obtenerProcedimientos: Procedimiento[];
      }>({
        query: OBTENER_PROCEDIMIENTOS,
      });

      if (data?.obtenerProcedimientos) {
        const procedimientosRestantes = data.obtenerProcedimientos.filter(
          (procedimiento) => procedimiento.id !== eliminarProcedimiento.id
        );

        cache.writeQuery({
          query: OBTENER_PROCEDIMIENTOS,
          data: {
            obtenerProcedimientos: procedimientosRestantes,
          },
        });
      }
    },
  });

  if (loading) return <Text style={e.titulo}>Cargando...</Text>;

  if (error) {
    console.log('Error al cargar datos:', error);
    return <Text style={e.titulo}>Error al cargar datos</Text>;
  }

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
    try {
      await eliminarProcedimiento({
        variables: { id },
      });
      Alert.alert('Eliminado', 'Procedimiento Eliminado con Éxito!', [{ text: 'Ok' }]);
    } catch (error) {
      console.error('Error al eliminar el procedimiento:', error);
      Alert.alert('Error', 'No se pudo eliminar el procedimiento. Inténtalo nuevamente.');
    }
  };

  const abrirNuevo = (id: string, proce: string, sumario: string) => {
    navi.navigate('Nuevo' as never);
  };

  // Filtrar los procedimientos basados en el texto del filtro
  const procedimientosFiltrados = data?.obtenerProcedimientos.filter((proc: Procedimiento) =>
    proc.sumario.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={e.container}>
        <Text style={e.titulo}>Procedimientos</Text>

        {/* Input de filtro */}
        <TextInput
          style={e.input}
          placeholder="N° de SUMARIO"
          keyboardType="default"
          value={filtro} // Vincula el estado del filtro
          onChangeText={(text) => setFiltro(text)} // Actualiza el estado cuando el usuario escribe
        />

        {/* FlatList muestra procedimientos filtrados */}
        <FlatList
          data={procedimientosFiltrados || []} // Usa los procedimientos filtrados
          renderItem={({ item }) => (
            <Archivo
              item={item}
              onLongPress={mensajeEliminarProce}
              onPress={abrirNuevo}
            />
          )}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <Text style={e.titulo}>No hay procedimientos disponibles</Text>
          }
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};


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