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
    View,
    Button,
    TouchableOpacity
} from 'react-native';

import { gql, useMutation } from '@apollo/client';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-date-picker';
import { format } from 'date-fns'; //  librería para formatear la fecha



const NUEVO_PROCEDIMIENTO = gql`
  mutation nuevoProcedimiento($input: ProcedimientoInput) {
    nuevoProcedimiento(input: $input) {
      sumario
      proce
      id
      fecha
    }
  }
`;

// Actualiza el cache para que al agregar uno nuevo aparezca el último agregado
const OBTENER_PROCEDIMIENTOS = gql`
  query obtenerProcedimientos {
    obtenerProcedimientos {
      sumario
      proce
      fecha
      id
    }
  }
`;

const ACTUALIZAR_PROCEDIMIENTO = gql`
  mutation actualizarProcedimiento($id: ID!, $input: ProcedimientoInput) {
    actualizarProcedimiento(id: $id, input: $input) {
      sumario
      proce
      fecha
    }
  }
`;


const Nuevo = () => {

    const { params } = useRoute();
    const navi = useNavigation();

    // Desestructurando los parámetros pasados, con valores por defecto
    const { id: idFromRoute, procedi: proceFromRoute, sumarios: sumarioFromRoute, fechas: fechasFromRoute } = params || {};

    //date Piker
    const [date, setDate] = useState(new Date() || fechasFromRoute)
    const [open, setOpen] = useState(false)

    const fechaParaMostar = format(date,'dd/MM/yyyy')
    console.log(`desde nuevo fecha ${fechasFromRoute}`)

    console.log(`desde nuevo el id ${idFromRoute}`)
    const [sumario, setSumario] = useState(sumarioFromRoute || '');
    const [proce, setProce] = useState(proceFromRoute || '');
    const [id, setId] = useState(idFromRoute || null);

    // Formateamos la fecha para mostrar solo la parte de la fecha
    const FechaFormateada = date.toISOString(); // Formato poara graopql
    console.log(`fecha ${date}`)
    console.log(`fecha desde formateo ${FechaFormateada}`)



    //mutation
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
    const [actualizarProcedimiento] = useMutation(ACTUALIZAR_PROCEDIMIENTO, {
        update(cache, { data: { actualizarProcedimiento } }) {
            console.log('Procedimiento actualizado:', actualizarProcedimiento);

            const data = cache.readQuery({
                query: OBTENER_PROCEDIMIENTOS,
            });

            console.log('Datos en el caché antes de la actualización:', data);

            if (data?.obtenerProcedimientos) {
                cache.writeQuery({
                    query: OBTENER_PROCEDIMIENTOS,
                    data: {
                        obtenerProcedimientos: [...data.obtenerProcedimientos, actualizarProcedimiento],
                    },

                });
            }
        },
    })








    const guardarProce = async () => {

        //validacion
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
                        fecha: FechaFormateada
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

    const actualizarProce = async () => {
        //validacion
        if ([sumario, proce].includes('')) {
            Alert.alert(
                'Error',
                'Todos los campos son obligatorios (ingrese 0 si aún no tiene N° de sumario)',
                [{ text: 'Aceptar' }]
            );
            return;
        }

        try {

            console.log('ID enviado:', id);
            const { data } = await actualizarProcedimiento({

                variables: {
                    id,
                    input: {
                        sumario,
                        proce,
                        fecha: FechaFormateada
                    },
                },
            });

            Alert.alert('Guardado', 'Procedimiento Actualizado con Éxito!!!', [{ text: 'Aceptar' }]);
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
            <LinearGradient
                colors={['#000000', '#025C48']} // Negro a verde oscuro
                locations={[0.2, 1]} // El negro ocupa el 30% y el verde oscuro empieza desde ahí hasta el final
                style={styles.fondo}
            >
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

                    {/* //FECHAAAA */}

                    {(id) ?
                        <Text style={[styles.BotonText, { color: "#FFFF" }]}>CON FECHA:    {fechaParaMostar}</Text>
                        :
                        <View >
                            <TouchableOpacity
                                style={styles.pickerBOTON}
                                onPress={() => setOpen(true)}
                            >
                                <Text style={[styles.BotonText, { color: "#FFFF" }]}>SELECCIONE FECHA</Text>
                            </TouchableOpacity>
                            <DatePicker
                                modal
                                open={open}
                                date={date}
                                locale='es'
                                onConfirm={(date) => {
                                    setOpen(false)
                                    setDate(date)
                                }}
                                onCancel={() => {
                                    setOpen(false)
                                }}
                            />
                        </View>



                    }




                    {(id) ? //si id trae algo mostrar actualizar
                        <Pressable style={styles.boton} onPress={actualizarProce}>
                            <Text style={styles.BotonText}>ACTUALIZAR</Text>
                        </Pressable>
                        : //de lom contrario guardar
                        <Pressable style={styles.boton} onPress={guardarProce}>
                            <Text style={styles.BotonText}>GUARDAR</Text>
                        </Pressable>
                    }
                    {(id) ?
                        <Pressable
                            style={[styles.boton, styles.btnCancelar]}
                            onPress={() => navi.dispatch(StackActions.pop(1))}
                        >
                            <Text style={styles.BotonText}>CANCELAR</Text>
                        </Pressable>
                        :
                        <Pressable
                            style={[styles.boton, styles.btnCancelar]}
                            onPress={() => navi.navigate('NavegacionTop')}
                        >
                            <Text style={styles.BotonText}>CANCELAR</Text>
                        </Pressable>
                    }



                    <TouchableOpacity
                        style={[styles.pickerBOTON, { marginTop: 80 }, { paddingHorizontal: 20 }, { paddingVertical: 20 }, { borderColor: "#32CD32" }]}
                        onPress={() => setOpen(true)}
                    >
                        <Text style={[styles.BotonText, { color: "#32CD32" }]}>SELECCIONE FECHA</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.pickerBOTON, { marginTop: 20 }, { paddingHorizontal: 20 }, { paddingVertical: 20 }, { borderColor: "#f42" }]}
                        onPress={() => setOpen(true)}
                    >
                        <Text style={[styles.BotonText, { color: "#f42" }]}>SELECCIONE FECHA</Text>
                    </TouchableOpacity>

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
        fontSize: 20,
        marginTop: 20,
        color: '#ffff'
    },
    input: {
        backgroundColor: '#FFF',
        width: '60%',
        marginTop: 30,
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 15,
        textAlign: 'center'
    },
    textarea: {
        backgroundColor: '#FFFf',
        width: '80%',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 15,
        fontSize: 18, // Tamaño de la fuente
        fontStyle: 'italic',
        fontWeight: '500', // Peso de la fuente (normal, bold, e
    },
    area: {
        marginTop: 20,
        height: 100,
    },
    pickerBOTON: {
        backgroundColor: 'transparent',
        paddingVertical: 10,
        borderRadius: 30,
        marginTop: 10,
        paddingHorizontal: 20,
        width: '70%',
        alignItems: 'center',
        borderWidth: 2, // Definir el grosor del borde
        borderColor: '#f3f3f3',

        fontWeight: '800',
        textAlign: 'center',

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
        color: '#000'
    },
    btnCancelar: {
        marginTop: 20,
        backgroundColor: 'red',
    },
});

export default Nuevo;

