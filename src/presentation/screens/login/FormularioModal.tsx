import React, { useState } from 'react'
import {
  Text, Modal, SafeAreaView, StyleSheet, TextInput, View, Pressable,
  TouchableWithoutFeedback, Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native'
//apollo
import { gql, useMutation } from '@apollo/client';


interface FormularioModalProps {
  modalVisible: boolean; // Especificamos que modalVisible es un booleano
  setModalVisible: (visible: boolean) => void; // Es una función que actualiza el estado
}

const NUEVA_CUENTA = gql`
mutation crearUsuario ($input:UsuarioInput){
    crearUsuario(input:$input)
}`;

//aca se loo asignamos
const FormularioModal =  ({ modalVisible, setModalVisible }: FormularioModalProps) => {

  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  //mutation apolo
  const [crearUsuario] = useMutation(NUEVA_CUENTA) 
  


  //envia el formulario
  const handleSubmit = async () => {

    //validar campos
    if (nombre === "" || apellido === "" || email === "" || password === "") {
      Alert.alert(
        'Error!',
        'Todos los campos son obligatorios.',  
      );
      return;
    }
    //password 6 caracteres
    if(password.length <6){
      Alert.alert(
        'Error!',
        'La Contraseña debe contener al menos 6 caracteres.',  
      );
      return;
    }

    //guardar usuario
try {
  const {data} = await crearUsuario({
    variables:{
      input:{
        nombre,
        apellido,
        email,
        password
      }
    }
  })
  
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
              <Text style={estilo.label} >EMAIL</Text>
              <TextInput
                style={estilo.input}
                value={email}
                onChangeText={text => setEmail(text)}
              />
            </View>

            <View style={estilo.campo}>
              <Text style={estilo.label} >PASSWORD</Text>
              <TextInput
                style={estilo.input}
                value={password}
                onChangeText={text => setPassword(text)}
              />

              <Pressable //boton crear
                style={estilo.boton}
                onPress={() => handleSubmit()}
              >
                <Text style={estilo.BotonText}>CREAR CUENTA</Text>
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
    marginTop: 80,
    backgroundColor: 'red'
  },
})



export default FormularioModal