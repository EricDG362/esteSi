import { StackActions, useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import {
    Keyboard, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback,
    TextInput,
    Pressable,
    Alert,
} from 'react-native'

import { ApolloError, gql, useMutation } from '@apollo/client';

const NUEVO_PROCEDIMIENTO = gql`

mutation nuevoProcedimiento($input:ProcedimientoInput){

   nuevoProcedimiento(input:$input){
        sumario
        proce
        id
    }
}
`
//actuliza el cache para q al agregar uno nuevo ya aparesca el ultimo agregado (este query es sacado dearchivos.tsx)
const OBTENER_PROCEDIMIENTOS = gql`

query obtenerProcedimientos {
obtenerProcedimientos {
     sumario
     proce
     id
     }
 } 

`


const Nuevo = () => {

    const [sumario, setSumario] = useState('')
    const [proce, setProce] = useState('')

    
 // Apollo
const [nuevoProcedimiento] = useMutation(NUEVO_PROCEDIMIENTO, {
    update(cache, { data: { nuevoProcedimiento } }) {
      // Tipado explícito para evitar errores con `readQuery`
      const data = cache.readQuery<{
        obtenerProcedimientos: Array<{ id: string; sumario: string; proce: string }>;
      }>({
        query: OBTENER_PROCEDIMIENTOS,
      });
  
      if (data?.obtenerProcedimientos) {
        // Sobrescribe el cache con el nuevo procedimiento agregado
        cache.writeQuery({
          query: OBTENER_PROCEDIMIENTOS,
          data: {
            obtenerProcedimientos: [...data.obtenerProcedimientos, nuevoProcedimiento],
          },
        });
      }
    },
  });
  

    const navi = useNavigation()

    const guardarProce = async () => {

        //validar
        if ([sumario, proce].includes('')) { //si alguno esta vacio salta alert
            Alert.alert(
                'Error',
                'Todos los campos son obligatorios (ingrese 0 si aun no tiene N° de sumario)',
                [{ text: 'Aceptar' }]
            )
            return //para q corte el codigo aca
        }
        

        //guardar proce
        try {
            const {data} = await nuevoProcedimiento({

                variables:{
                    input:{
                        sumario,
                        proce
                    }
                }

            })

            Alert.alert(
                'Guardado',
                'Procedimiento Guardado con Exito!!!',
                [{ text: 'Aceptar' }]
            )

            navi.navigate("Archivos" as never)



        } catch (error: unknown) {

            let errorMessage = '';

            if (error instanceof ApolloError) {
                // Si el error es un ApolloError, accedemos a graphQLErrors
                errorMessage = error.graphQLErrors?.[0]?.message || error.message || errorMessage;
            } else if (error instanceof Error) {
                // Si es un error genérico
                errorMessage = error.message;
            }

            Alert.alert('Error', errorMessage);
        }

    }






    return (

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={e.container}>

                <Text style={e.titulo}>nuevo procedimiento</Text>

                <TextInput
                    style={e.input}
                    placeholder='N° SUMARIO'
                    keyboardType="default"
                    value={sumario}
                    onChangeText={text => setSumario(text)}

                />

                <TextInput
                    style={[e.textarea, e.area]}
                    placeholder='INGRESE SU PROCEDIMIENTO'
                    keyboardType="default"
                    multiline={true} // Permite múltiples líneas
                    numberOfLines={10} // Define el tamaño vertical inicial
                    textAlignVertical="top" // Alinea el texto en la parte superior
                    value={proce}
                    onChangeText={text => setProce(text)}
                />

                <Pressable //boton Guardar
                    style={e.boton}
                    onPress={() => guardarProce()}
                >
                    <Text style={e.BotonText}>GUARDAR</Text>
                </Pressable>

                <Pressable //boton cancelar
                    style={[e.boton, , e.btnCancelar]}
                    onPress={() => navi.dispatch(StackActions.pop(1))} //retropcede una pantalla atras (1)
                >
                    <Text style={[e.BotonText]}>CANCELAR</Text>
                </Pressable>



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
        marginTop: 40,
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 15
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
        height: 400
    },
    boton: {
        backgroundColor: 'cyan',
        paddingVertical: 20,
        borderRadius: 30,
        marginTop: 20,
        paddingHorizontal: 20,
        width: '70%',
        alignItems: 'center'
    },
    BotonText: {
        fontWeight: 800,
        textAlign: 'center',

    },
    btnCancelar: {
        marginTop: 40,
        backgroundColor: 'red'
    },

})


export default Nuevo