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
    Pressable
} from 'react-native';
import { gql, useQuery, useMutation } from '@apollo/client';
import Archivo from './Archivo';
import { useNavigation } from '@react-navigation/native';

const OBTENER_PROCEDIMIENTOS = gql`
  query obtenerProcedimientos {
    obtenerProcedimientos {
      id
      sumario
      proce
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
        Alert.alert('Confirmación', '¿Deseas eliminar este Procedimiento?', [
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

    const abrirNuevo = (id, procedi, sumarios) => {
        console.log(`desde archivos ${sumarios} proce ${procedi} y id ${id}`)
        navi.navigate('Nuevo', { id: id || null, procedi: procedi || null, sumarios: sumarios || null });
    };

    // Filtrar los procedimientos basados en el texto del filtro
    const procedimientosFiltrados =
        data?.obtenerProcedimientos.filter((proc) =>
            proc.sumario.toLowerCase().includes(filtro.toLowerCase())
        ) || [];

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.titulo}>Procedimientos</Text>

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

                <Pressable
                    style={[styles.boton, styles.btnCancelar]}
                    onPress={() => navi.navigate('NavegacionTop')}
                >
                    <Text style={styles.BotonText}>SALIR</Text>
                </Pressable>

            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
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
        borderRadius: 15,
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
