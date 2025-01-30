import React, { useState } from 'react'
import {   Text, Modal, SafeAreaView, StyleSheet, TextInput, View, Pressable,
    TouchableWithoutFeedback, Keyboard,
    KeyboardAvoidingView,
    Platform,
    Alert, } from 'react-native'
    import { gql, useQuery, useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';


const NUEVA_CUENTA = gql`
mutation crearUsuario ($input:UsuarioInput){
    crearUsuario(input:$input)

}`;

const OBTENER_USUARIOS = gql`
  query obtenerUsuarios {
    obtenerUsuarios {
          id
         nombre
        apellido
         telefono
         email
          estado
    }
  }
`;



const CrearUsua = ({modalVisible, setModalVisible}) => {

    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [email, setEmail] = useState('')
    const [telefono, setTelefono] = useState('')
    const [password, setPassword] = useState('')


    //mutation
   const [crearUsuario] = useMutation(NUEVA_CUENTA, {
    update(cache, { data: { crearUsuario } }) {
       

        try {
            const data = cache.readQuery({ query: OBTENER_USUARIOS });
            
            
            if (data?.obtenerUsuarios) {
                cache.writeQuery({
                    query: OBTENER_USUARIOS,
                    data: {
                        obtenerUsuarios: [...data.obtenerUsuarios, crearUsuario],
                    },
                });
             
            }
        } catch (error) {
           
        }
    },
});
    


    //envia el formulario
    const handleSubmit = async () => {

        //validar campos
        if (nombre === "" || apellido === "" || email === "" || password === "" || telefono === "") {
            Alert.alert(
                'Error!',
                'Todos los campos son obligatorios.',
            );
            return;
        }

        //password 6 caracteres
        if (password.length < 6) {
            Alert.alert(
                'Error!',
                'La Contraseña debe contener al menos 6 caracteres.',
            );
            return;
        }

        //guardar usuario
        try {
            const { data } = await crearUsuario({
                variables: {
                    input: {
                        nombre,
                        apellido,
                        telefono,
                        email,
                        password
                    }
                }
            })

            Alert.alert(
                'Usuario Creado!',
                'La Cuenta Fue Creada con Exito!!.',
                [
                    { //PRIMER BOTON
                        text: 'ACEPTAR',
                        onPress: () => {
                            // Restablecer los estados
                            setNombre('');
                            setApellido('');
                            setEmail('');
                            setTelefono('');
                            setPassword('');
    
                            // Cerrar el modal
                            setModalVisible(!modalVisible);
                        },
                    },
                ]
            );
    


        } catch (error) {
            console.log(error)
        }
    }






    return (

        <Modal
            animationType='slide'
            visible={modalVisible}
        >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <KeyboardAvoidingView
                    style={estilo.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <SafeAreaView style={estilo.container}>


                        <View style={estilo.campo} >
                            <Text style={estilo.label} >NOMBRE</Text>
                            <TextInput
                                style={estilo.input}
                                value={nombre}
                                onChangeText={text => setNombre(text)}

                            />
                        </View>

                        <View style={estilo.campo}>
                            <Text style={estilo.label} >APELLIDO</Text>
                            <TextInput
                                style={estilo.input}
                                value={apellido}
                                onChangeText={text => setApellido(text)}
                            />
                        </View>

                        <View style={estilo.campo}>
                            <Text style={estilo.label} >TELEFONO</Text>
                            <TextInput
                                style={estilo.input}
                                value={telefono}
                                onChangeText={text => setTelefono(text)}
                            />
                        </View>

                        <View style={estilo.campo}>
                            <Text style={estilo.label} >EMAIL</Text>
                            <TextInput
                                style={estilo.input}
                                onChangeText={text => setEmail(text.toLowerCase())}
                                value={email}

                            />
                        </View>

                        <View style={estilo.campo}>
                            <Text style={estilo.label} >PASSWORD</Text>
                            <TextInput
                                style={estilo.input}
                                value={password}
                                onChangeText={text => setPassword(text)}
                            />

                            <Pressable //boton cancelar
                                style={[estilo.boton, estilo.btnCrear]}
                                onPress={() => handleSubmit()}
                            >
                                <Text style={[estilo.BotonText]}>CREAR</Text>
                            </Pressable>


                            <Pressable //boton cancelar
                                style={[estilo.boton, , estilo.btnCancelar]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={[estilo.BotonText]}>CANCELAR</Text>
                            </Pressable>


                        </View>





                    </SafeAreaView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </Modal>

    )
}

const estilo = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flex: 1,
        justifyContent: 'center',


    },
    campo: {
        alignItems: 'center'
    },
    label: {
        textAlign: 'left',
        color: '#fff',
        fontWeight: 900,
        marginBottom: 10
    },
    input: {
        borderRadius: 20,
        backgroundColor: '#fff',
        width: '70%',
        paddingVertical: 10,
        marginBottom: 20,
        paddingHorizontal: 15,
        textAlign: 'center'

    },
    boton: {
        backgroundColor: 'cyan',
        paddingVertical: 20,
        borderRadius: 30,
        paddingHorizontal: 20,
        width: '70%',
        alignItems: 'center'
    },
    BotonText: {
        fontWeight: 800,
        textAlign: 'center',

    },
    btnCrear:{
   marginTop:30
    },
    btnCancelar: {
        marginTop: Platform.OS === 'android' ? 50 : 60,
        backgroundColor: 'red'
    },
})

export default CrearUsua