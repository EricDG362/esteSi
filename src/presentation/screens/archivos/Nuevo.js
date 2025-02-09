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
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';

import { gql, useMutation } from '@apollo/client';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-date-picker';
import { format } from 'date-fns'; //  librería para formatear la fecha
import VerificarConexion from '../sinconexion/VerificarConexion';





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

    //para el activityIndicator
    const [cargando, setCargando] = useState(false);

    //date Piker
    const [date, setDate] = useState(new Date() || fechasFromRoute)
    const [open, setOpen] = useState(false)


    const nuevafecha = fechasFromRoute


    // Formato deseado
    let fechaParaM = '';
    if (nuevafecha !== undefined && nuevafecha !== null) {
        fechaParaM = format(new Date(nuevafecha), 'dd/MM/yyyy');
    }


    const [sumario, setSumario] = useState(sumarioFromRoute || '');
    const [proce, setProce] = useState(proceFromRoute || '');
    const [id, setId] = useState(idFromRoute || null);


    const FechaFormateada = date.toISOString(); // Formato poara graphql

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
            cache.modify({
                fields: {
                    obtenerProcedimientos(existingProcedimientos = []) {
                        return existingProcedimientos.map((proc) =>
                            proc.id === actualizarProcedimiento.id ? actualizarProcedimiento : proc
                        );
                    },
                },
            });
        }

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

        //validacion fecha
        if ([date].includes('')) {
            Alert.alert(
                'Error',
                'Seleccione una Fecha)',
                [{ text: 'Aceptar' }]
            );
            return;
        }

        setCargando(true); // Activa el indicador

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

            Alert.alert('Guardado', 'Procedimiento Guardado con Éxito!!!',
                [
                    {
                        text: 'Aceptar',
                        onPress: () => navi.replace('Archivos')
                    }
                ]);

        } catch (error) {
            let errorMessage = '';

            if (error?.graphQLErrors?.length) {
                errorMessage = error.graphQLErrors[0].message || error.message;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            Alert.alert('Error', errorMessage);
        }

        finally {
            setCargando(false); // Desactiva el indicador
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



        setCargando(true); // Activa el indicador

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

            Alert.alert('Guardado', 'Procedimiento Actualizado con Éxito!!!',
                [
                    {
                        text: 'Aceptar',
                        onPress: () => navi.replace('Archivos')
                    }
                ]);

        } catch (error) {
            let errorMessage = '';

            if (error?.graphQLErrors?.length) {
                errorMessage = error.graphQLErrors[0].message || error.message;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            Alert.alert('Error', errorMessage);
        }



        finally {
            setCargando(false); // Desactiva el indicador
        }

    };






    return (
        <VerificarConexion>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <LinearGradient
                    colors={['#000000', '#274d60']} // Negro a verde oscuro
                    locations={[0.1, 1]} // El negro ocupa el 30% y el verde oscuro empieza desde ahí hasta el final
                    style={styles.fondo}
                >
                    <SafeAreaView style={styles.container}>
                        {(id)
                            ? <Text style={styles.titulo}>Procedimiento</Text>

                            : <Text style={styles.titulo}>Nuevo Procedimiento</Text>

                        }

                        <TextInput
                            style={styles.input}
                            placeholder="N° SUMARIO"
                            placeholderTextColor="gray"
                            keyboardType="default"
                            value={sumario}
                            onChangeText={(text) => setSumario(text)}
                        />

                        <TextInput
                            style={[styles.textarea, styles.area]}
                            placeholder="INGRESE PROCEDIMIENTO..."
                            placeholderTextColor="gray"
                            keyboardType="default"
                            multiline={true}
                            numberOfLines={25}
                            textAlignVertical="top"
                            value={proce}
                            onChangeText={(text) => setProce(text)}
                        />

                        {/* //FECHAAAA */}

                        {(fechasFromRoute) ?
                            <Text style={[styles.BotonText, { color: "#FFFF", marginBottom: 15 }]}>CON FECHA: {fechaParaM}     </Text>
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
                        {/* //scrollHorizontal */}
                        {/* {(id)
                        ? <ImageScroll />
                        : <ImageScrollVacio />
                    } */}


                        <View style={styles.cajaBotones}>

                            {cargando ? (
                                <ActivityIndicator size="large" color="red" />
                            ) : (
                                (id) ? //si id trae algo mostrar actualizar
                                    <Pressable style={[styles.boton, { marginTop: 10, borderColor: '#1c1c1', borderWidth: 2 }]} onPress={actualizarProce}>
                                        <Text style={styles.BotonText}>ACTUALIZAR</Text>
                                    </Pressable>
                                    : //de lom contrario guardar
                                    <Pressable style={[styles.boton, { marginTop: 10, borderColor: '#1c1c1', borderWidth: 2 }]} onPress={guardarProce}>
                                        <Text style={styles.BotonText}>GUARDAR</Text>
                                    </Pressable>
                            )}
                        


                            {(id) ?
                                <Pressable
                                    style={[styles.boton, styles.btnCancelar, { borderColor: '#274d60', borderWidth: 4 }]}
                                    onPress={() => navi.replace('NavegacionTop')}
                                >
                                    <Text style={[styles.BotonText, { color: '#274d60' }]}>X-CANCELAR</Text>
                                </Pressable>
                                :
                                <Pressable
                                    style={[styles.boton, styles.btnCancelar, { borderColor: '#274d60', borderWidth: 4 }]}
                                    onPress={() => navi.replace('NavegacionTop')}
                                >
                                    <Text style={[styles.BotonText, { color: '#274d60' }]}>X-CANCELAR</Text>
                                </Pressable>
                            }
                        </View>




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
        fontSize: 25,
        marginTop: 5,
        color: '#ffff'
    },
    input: {
        backgroundColor: '#FFF',
        width: '60%',
        marginTop: 10,
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 15,
        textAlign: 'center',
        color: 'red',
        fontWeight: '600',
        fontSize: 16
    },
    textarea: {
        backgroundColor: '#F5F5F5', //gris muy claro
        width: '80%',
        multiline: true, // Permite múltiples líneas
        numberOfLines: 40, // Define cuántas lín
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 15,
        fontSize: 20, // Tamaño de la fuente
        fontStyle: 'italic',
        fontWeight: '500', // Peso de la fuente (normal, bold, e
    },
    area: {
        marginTop: 15,
        height: '57%',
    },
    pickerBOTON: {
        backgroundColor: 'transparent',
        paddingVertical: 2,
        borderRadius: 30,
        marginTop: 10,
        marginBottom: 15,
        paddingHorizontal: 20,
        width: '70%',
        alignItems: 'center',
        borderWidth: 2, // Definir el grosor del borde
        borderColor: '#f3f3f3',
        fontWeight: '800',
        textAlign: 'center',

    },


    boton: {
        backgroundColor: '#274d60',
        paddingVertical: 10,
        borderRadius: 30,
        width: '90%',
        alignItems: 'center',
        marginTop: 0,

    },
    BotonText: {
        fontWeight: '800',
        textAlign: 'center',
        color: '#fff',
        fontSize: 18
    },
    btnCancelar: {
        marginTop: 10,
        backgroundColor: '#fff',
    },

    cajaBotones: {
        backgroundColor: '#C6C6C6',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        borderTopLeftRadius: 40, // Esquinas superiores redondeadas
        borderTopRightRadius: 40,
        //sombras
        // Sombra en iOS
        shadowColor: '#000',
        shadowOffset: { width: -4, height: -4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        // Sombra en Android
        elevation: 5,
        overflow: 'visible', // Para evitar recortes de sombra
    },
});

export default Nuevo;

