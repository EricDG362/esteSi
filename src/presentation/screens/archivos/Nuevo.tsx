import { StackActions, useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import {
    Keyboard, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback,
    TextInput,
    Pressable,
    Alert,
} from 'react-native'


const Nuevo = () => {

    const [sumario, setSumario] = useState('')
    const [proce, setProce] = useState('')

const navi = useNavigation()

    const guardarProce = () =>{
        
        if([sumario,proce].includes('')){ //si alguno esta vacio salta alert
                Alert.alert(
                    'Error',
                    'Todos los campos son obligatorios (ingrese 0 si aun no tiene N° de sumario)',
                    [{text:'Aceptar'}]
                )
                return //para q corte el codigo aca
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
                    onChangeText={setSumario}

                />

                <TextInput
                    style={[e.textarea, e.area]}
                    placeholder='INGRESE SU PROCEDIMIENTO'
                    keyboardType="default"
                    multiline={true} // Permite múltiples líneas
                    numberOfLines={10} // Define el tamaño vertical inicial
                    textAlignVertical="top" // Alinea el texto en la parte superior
                    value={proce}
                    onChangeText={setProce}
                />

                <Pressable //boton Guardar
                    style={e.boton}
                    onPress={guardarProce}
                >
                    <Text style={e.BotonText}>GUARDAR</Text>
                </Pressable>

                <Pressable //boton cancelar
                    style={[e.boton, , e.btnCancelar]}
                    onPress={ () => navi.dispatch(StackActions.pop(1))} //retropcede una pantalla atras (1)
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