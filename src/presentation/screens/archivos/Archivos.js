import React, { useState } from 'react';
import {
    Keyboard,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    TextInput,
    FlatList,
    Alert,
    View,
    Pressable,
    ActivityIndicator,

} from 'react-native';
import { gql, useQuery, useMutation } from '@apollo/client';
import Archivo from './Archivo';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import VerificarConexion from '../sinconexion/VerificarConexion';



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

    if (loading) return <ActivityIndicator
        color="red"
        size={'large'}
    />;

    if (error) {
        console.log('Error al cargar datos:', error);
        return

    }

    const mensajeEliminarProce = (id) => {
        Alert.alert('¿Deseas Eliminar?', 'Si eliminas este procedimiento no podrás recuperarlo', [
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


        navi.replace("Nuevo", { id, procedi, sumarios, fechas });
    }


    // Filtrar los procedimientos basados en el texto del filtro
    const procedimientosFiltrados =
        data?.obtenerProcedimientos.filter((proc) =>
            proc.sumario.toLowerCase().includes(filtro.toLowerCase())
        ) || []



    return (

        <VerificarConexion>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <LinearGradient
                    colors={['#000000', '#274d60']} // Negro a gris oscuro
                    locations={[0.1, 1]} // El negro ocupa el 10% y el gris oscuro empieza desde ahí hasta el final // El negro ocupa el 30% y el verde oscuro empieza desde ahí hasta el final
                    style={styles.fondo}
                >
                    <SafeAreaView style={styles.container}>
                        <Text style={styles.titulo}>Procedimientos <Text style={{color:'#90EE90'}}>({procedimientosFiltrados.length})</Text></Text>

                        {/* Input de filtro */}
                        <TextInput
                            style={styles.input}
                            placeholder="N° de SUMARIO"
                            placeholderTextColor={'gray'}
                            keyboardType="default"
                            value={filtro}
                            onChangeText={(text) => setFiltro(text)}
                        />

                        {(loading) ?
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
                                <ActivityIndicator size={80} color="red" />
                            </View>
                            :
                            <FlatList
                                style={{ width: '80%', flex: 1 }}
                                data={procedimientosFiltrados.slice().reverse()} //slice crea una copia//reverse invierte el orden parta q aparesca elprimero
                                renderItem={({ item }) => (

                                    //estas son las
                                    <Archivo
                                        item={item}
                                        onLongPress={mensajeEliminarProce}
                                        onPress={abrirNuevo}


                                    />

                                )}
                                keyExtractor={(item) => item.id.toString()}
                                showsVerticalScrollIndicator={false}
                                ListEmptyComponent={
                                    <Text style={styles.titulo}>No hay procedimientos disponibles</Text>
                                }
                            />

                        }



                        <Pressable
                            onPress={() => navi.navigate('Nuevo')}
                            style={[styles.btnCrear, styles.footer]}
                        >
                            <Text style={[styles.textbtn]}>CREAR
                                NUEVO
                            </Text>

                        </Pressable>




                    </SafeAreaView>
                </LinearGradient>
            </TouchableWithoutFeedback>

        </VerificarConexion>
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
        marginTop: 20,
        color: '#fff',
        fontSize: 28
    },
    input: {
        backgroundColor: '#FFF',
        width: '60%',
        marginTop: 20,
        marginBottom: 10,
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 15,
        textAlign: 'center',
        fontSize: 16,
        color: 'red',
        fontWeight: '600',

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
    btnCrear: {
        width: '80%', // Ahora ocupa el 80% del ancho del contenedor padre
        borderRadius: 30,
        marginBottom: 20,
        paddingVertical: 10,
        justifyContent: 'center', // Centra el texto verticalmente
        alignItems: 'center', // Centra el texto horizontalmente

    },

    textbtn: {
        textAlign: 'center',
        fontSize: 28,
        fontWeight: '900',

    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '90%',
        backgroundColor: '#274d60',
        padding: 10,
        alignItems: 'center',
        opacity: 0.7,
        padding: 20
    },
});

export default Archivos;
