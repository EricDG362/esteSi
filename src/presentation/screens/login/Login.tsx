import React, { useState } from 'react';
import {
  Text, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView,
  ImageBackground, StyleSheet, Platform, Keyboard, Pressable, View,
  Alert,
} from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import FormularioModal from './FormularioModal';
import AsyncStorage from '@react-native-async-storage/async-storage';


//apollo
import { ApolloError, gql, useMutation } from '@apollo/client';

const AUTENTICAR_USUARIO = gql`
mutation autenticarUsuario($input: AutenticarInput) {
  autenticarUsuario(input: $input) {
    token
  }
 }
`;

const Login = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true); // Estado para manejar la visibilidad de la contraseña

  const [email, setEmail] = useState('')
  const [password, setPass] = useState('')

  const navi = useNavigation();

//mutation de apollo
const [autenticarUsuario] =useMutation(AUTENTICAR_USUARIO)



  //boton iniciar sesion
  const iniciarSesion = async () => {

    //validar campos
    if (email === "" || password === "") {
      Alert.alert(
        'Error!',
        'Todos los campos son obligatorios.',
      );
      return; //corte la ejecucion
    }

    //autenticar
    try {
      const {data} = await autenticarUsuario({
        variables: {
          input:{
            email, //estos input deben ser igual a como estan llamados en schema sino no funciona no los toma en el usestate llamr igual)
            password
          }
        }
      })

     
      const {token} = data.autenticarUsuario //extraemos el token

      const nombre = data.autenticarUsuario.nombre
      console.log(token)
      //lo colocamos en storage
      await AsyncStorage.setItem('token', token)
      //direccionamos a donde necesitamos (al inicio)
      navi.dispatch(StackActions.replace('NavegacionTop'));

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
      <KeyboardAvoidingView
        style={estilo.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ImageBackground
          source={require('../../../asset/img/ab.jpg')}
          style={estilo.background}
          resizeMode="cover"
        >
          <TextInput
            style={[estilo.input, estilo.inputPrime]}
            placeholder="EMAIL"
            placeholderTextColor={'#000'}
            keyboardType="email-address"
            onChangeText={text => setEmail(text.toLowerCase())} //para q al escribir el email se escriba en minusculas(agregar el value de abajo)
            value={email}
          />

          <View style={estilo.inputContainer}>
            <TextInput
              style={[estilo.input, estilo.inputPassword]}
              placeholder="PASSWORD"
              placeholderTextColor={'#000'}
              secureTextEntry={secureTextEntry} // Cambia dinámicamente según el estado
              onChangeText={text => setPass(text)}
            />
            <Pressable
              style={estilo.toggleButton}
              onPress={() => setSecureTextEntry(!secureTextEntry)} // Alterna entre visible y oculto
            >
              <Text style={estilo.toggleButtonText}>
                {secureTextEntry ? '👁️' : '🙈'}
              </Text>
            </Pressable>
          </View>

          <Pressable
            style={estilo.boton}
            onPress={() => {
              //navi.dispatch(StackActions.replace('NavegacionTop'));
              iniciarSesion()
            }}
          >
            <Text style={estilo.botontext}>INGRESAR</Text>
          </Pressable>

          <View style={estilo.padre}>
            <Text style={estilo.text}>Si no posees una cuenta. </Text>
            <Pressable onPress={() => setModalVisible(true)}>
              <Text style={[estilo.text, estilo.textcreate]}>CREAR UNA CUENTA</Text>
            </Pressable>
          </View>

          <FormularioModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const estilo = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 15,
    width: '80%',
    height: 35,
    paddingLeft: 10,
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
    fontWeight: '700',
  },
  inputPrime: {
    marginTop: 450,
  },
  inputContainer: {
    position: 'relative',
    width: '80%',
    marginBottom: 20,
  },
  inputPassword: {
    paddingRight: 40, // Espacio para el botón
  },
  toggleButton: {
    position: 'absolute',
    right: 10, // Posiciona el botón dentro del input
    top: 5, // Ajusta la posición vertical del botón
  },
  toggleButtonText: {
    fontSize: 18,
    color: '#000',
  },
  text: {
    color: '#ffff',
    marginTop: 40,
  },
  boton: {
    backgroundColor: '#ffff',
    width: '50%',
    borderRadius: 10,
    paddingVertical: 15,
  },
  botontext: {
    textAlign: 'center',
    fontWeight: '900',
  },
  padre: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textcreate: {
    color: 'cyan',
    fontWeight: '700',
  },
});

export default Login;