import React, { useState, useEffect } from 'react';
import {
    Keyboard,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    TextInput,
    FlatList,
    Alert,
    Animated
} from 'react-native';
import { gql, useQuery, useMutation } from '@apollo/client';
import Archivo from './Archivo';
import { StackActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';


const OBTENER_PROCEDIMIENTOS = gql`
  query obtenerProcedimientos {
    obtenerProcedimientos {
      id
      sumario
      proce
      fecha

    }
  }
`;

const ELIMINAR_PROCEDIMIENTO = gql`
  mutation eliminarProcedimiento($id: ID!) {
    eliminarProcedimiento(id: $id) {
      id
      sumario
      proce
      mensaje
    }
  }
`;







const Archivos = () => {
    const navi = useNavigation();

    // Estado para manejar el texto del filtro
    const [filtro, setFiltro] = useState('');

   

    const { data, loading, error } = useQuery(OBTENER_PROCEDIMIENTOS);

    const [eliminarProcedimiento] = useMutation(ELIMINAR_PROCEDIMIENTO, {
        update(cache, { data: { eliminarProcedimiento } }) {
            const existingData = cache.readQuery({
                query: OBTENER_PROCEDIMIENTOS,
            });

            if (existingData?.obtenerProcedimientos) {
                const procedimientosRestantes = existingData.obtenerProcedimientos.filter(
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

    if (loading) return <Text style={styles.titulo}>Cargando...</Text>;

    if (error) {
        console.log('Error al cargar datos:', error);
        return <Text style={styles.titulo}>Error al cargar datos</Text>;
    }

    const mensajeEliminarProce = (id) => {
        Alert.alert('¿Deseas Eliminar este Procedimiento?', 'Si se elimina no se podra recuperar', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Eliminar', onPress: () => EliminarProce(id) },
        ]);
    };

    const EliminarProce = async (id) => {
        try {
            await eliminarProcedimiento({
                variables: { id },
            });
            Alert.alert('Eliminado', 'Procedimiento eliminado con éxito!', [{ text: 'Ok' }]);
        } catch (error) {
            console.error('Error al eliminar el procedimiento:', error);
            Alert.alert('Error', 'No se pudo eliminar el procedimiento. Inténtalo nuevamente.');
        }
    };



    const abrirNuevo = (id, procedi, sumarios, fechas) => {
       
        navi.navigate('Nuevo', { id: id || null, procedi: procedi || null, sumarios: sumarios || null, fechas:fechas||null });
    };

    // Filtrar los procedimientos basados en el texto del filtro
    const procedimientosFiltrados =
        data?.obtenerProcedimientos.filter((proc) =>
            proc.sumario.toLowerCase().includes(filtro.toLowerCase())
        ) || [];




    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <LinearGradient
        colors={['#000000', '#013220']} // Negro a verde oscuro
        locations={[0.005, 1]} // El negro ocupa el 30% y el verde oscuro empieza desde ahí hasta el final
        style={styles.fondo}
      >
            <SafeAreaView   style={styles.container}>
                <Animated.Text style={styles.titulo}>Procedimientos</Animated.Text>

                {/* Input de filtro */}
                <TextInput
                    style={styles.input}
                    placeholder="N° de SUMARIO"
                    keyboardType="default"
                    value={filtro}
                    onChangeText={(text) => setFiltro(text)}
                />

                {/* FlatList muestra procedimientos filtrados */}
                <FlatList
                    data={procedimientosFiltrados}
                    renderItem={({ item }) => (
                        <Archivo
                            item={item}
                            onLongPress={mensajeEliminarProce}
                            onPress={abrirNuevo}
                        
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={
                        <Text style={styles.titulo}>No hay procedimientos disponibles</Text>
                    }
                />

       

            </SafeAreaView>
            </LinearGradient>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    fondo: {
        flex: 1
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    titulo: {
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: '900',
        marginTop: 30,
        color: '#fff',
        fontSize:30
    },
    input: {
        backgroundColor: '#FFF',
        width: '60%',
        marginTop: 30,
        marginBottom: 40,
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 15,
        textAlign:'center'
    },
    boton: {
        backgroundColor: 'cyan',
        paddingVertical: 20,
        borderRadius: 30,
        marginTop: 20,
        paddingHorizontal: 20,
        width: '70%',
        alignItems: 'center',
    },
    BotonText: {
        fontWeight: '800',
        textAlign: 'center',
    },
    btnCancelar: {
        marginBottom: 10,
        backgroundColor: 'red',
    },
});

export default Archivos;
