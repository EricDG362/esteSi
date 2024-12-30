import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    Keyboard,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    TextInput,
    Pressable,
    Alert,
} from 'react-native';

import { gql, useMutation } from '@apollo/client';

const NUEVO_PROCEDIMIENTO = gql`
  mutation nuevoProcedimiento($input: ProcedimientoInput) {
    nuevoProcedimiento(input: $input) {
      sumario
      proce
      id
    }
  }
`;

// Actualiza el cache para que al agregar uno nuevo aparezca el último agregado
const OBTENER_PROCEDIMIENTOS = gql`
  query obtenerProcedimientos {
    obtenerProcedimientos {
      sumario
      proce
      id
    }
  }
`;

const Nuevo = () => {

    const { params } = useRoute();
    const navi = useNavigation();

    // Desestructurando los parámetros pasados, con valores por defecto
    const { id: idFromRoute, procedi: proceFromRoute, sumarios: sumarioFromRoute } = params || {};

    const [sumario, setSumario] = useState(sumarioFromRoute || '');
    const [proce, setProce] = useState(proceFromRoute || '');
    const [id, setId] = useState(idFromRoute || null);


    const [nuevoProcedimiento] = useMutation(NUEVO_PROCEDIMIENTO, {
        update(cache, { data: { nuevoProcedimiento } }) {
            const data = cache.readQuery({
                query: OBTENER_PROCEDIMIENTOS,
            });

            if (data?.obtenerProcedimientos) {
                cache.writeQuery({
                    query: OBTENER_PROCEDIMIENTOS,
                    data: {
                        obtenerProcedimientos: [...data.obtenerProcedimientos, nuevoProcedimiento],
                    },
                });
            }
        },
    });


    const guardarProce = async () => {
        if ([sumario, proce].includes('')) {
            Alert.alert(
                'Error',
                'Todos los campos son obligatorios (ingrese 0 si aún no tiene N° de sumario)',
                [{ text: 'Aceptar' }]
            );
            return;
        }

        try {
            const { data } = await nuevoProcedimiento({
                variables: {
                    input: {
                        sumario,
                        proce,
                    },
                },
            });

            Alert.alert('Guardado', 'Procedimiento Guardado con Éxito!!!', [{ text: 'Aceptar' }]);
            navi.navigate('Archivos');
        } catch (error) {
            let errorMessage = '';

            if (error?.graphQLErrors?.length) {
                errorMessage = error.graphQLErrors[0].message || error.message;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            Alert.alert('Error', errorMessage);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.titulo}>Nuevo Procedimiento</Text>

                <TextInput
                    style={styles.input}
                    placeholder="N° SUMARIO"
                    keyboardType="default"
                    value={sumario}
                    onChangeText={(text) => setSumario(text)}
                />

                <TextInput
                    style={[styles.textarea, styles.area]}
                    placeholder="INGRESE SU PROCEDIMIENTO"
                    keyboardType="default"
                    multiline={true}
                    numberOfLines={10}
                    textAlignVertical="top"
                    value={proce}
                    onChangeText={(text) => setProce(text)}
                />

                <Pressable style={styles.boton} onPress={guardarProce}>
                    <Text style={styles.BotonText}>GUARDAR</Text>
                </Pressable>

                <Pressable
                    style={[styles.boton, styles.btnCancelar]}
                    onPress={() => navi.dispatch(StackActions.pop(1))}
                >
                    <Text style={styles.BotonText}>CANCELAR</Text>
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
        marginTop: 40,
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 15,
    },
    textarea: {
        backgroundColor: '#FFF',
        width: '80%',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 15,
    },
    area: {
        marginTop: 20,
        height: 400,
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
        marginTop: 40,
        backgroundColor: 'red',
    },
});

export default Nuevo;

