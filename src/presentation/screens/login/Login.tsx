import React, { useState } from 'react';
import {
  Text, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView,
  ImageBackground, StyleSheet, Platform, Keyboard, Pressable, View,
  Alert,ScrollView,
  Image,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import FormularioModal from './FormularioModal';
import AsyncStorage from '@react-native-async-storage/async-storage';


//apollo
import { ApolloError, gql, useMutation } from '@apollo/client';
import VerificarConexion from '../sinconexion/VerificarConexion';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const AUTENTICAR_USUARIO = gql`
mutation autenticarUsuario($input: AutenticarInput) {
  autenticarUsuario(input: $input) {
    token
    estado

  }
 }
`;

const Login = () => {

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true); // Estado para manejar la visibilidad de la contraseña

  const [email, setEmail] = useState('')
  const [password, setPass] = useState('')

  const [loading, setLoading] = useState(false);

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

    setLoading(true); // Muestra el ActivityIndicator


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

     
      const {token, estado} = data.autenticarUsuario //extraemos el token y el estado

      if (!estado) {
        Alert.alert(
          'Acceso Denegado',
          'Tu cuenta aún no ha sido activada. Por favor, contacta con soporte.',
        );
        return;
      }

      const nombre = data.autenticarUsuario.nombre
     
      //lo colocamos en storage
      await AsyncStorage.setItem('token', token)
     
      //ingreso a administrador
      if (email.trim().toLowerCase() === 'admin@admin.com'){
        navi.dispatch(StackActions.replace('Administrador'))
        return //corta aca
      }

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



    finally {
      setLoading(false); // Oculta el ActivityIndicator después de la ejecución
    }


  }





  return (
    <VerificarConexion>
      <SafeAreaView style={{ flex: 1 , backgroundColor:'#000'}}>
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
 
      <KeyboardAvoidingView
        style={estilo.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        
           <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

          
        <ImageBackground
          source={require('../../../../assets/img/cd.jpg')}
          style={estilo.background}
          resizeMode="cover"
        >

          <Image
           source={require('../../../../assets/img/logo.png')}
           style={estilo.logo}
           resizeMode='cover'
          />
          
          <TextInput
            style={[estilo.input, estilo.inputPrime]}
            placeholder="EMAIL"
            placeholderTextColor={'#000'}
            keyboardType="email-address"
            onChangeText={text => setEmail(text)} //para q al escribir el email se escriba en minusculas(agregar el value de abajo)
            value={email}
          />

         
            <TextInput
              style={[estilo.input]}
              placeholder="PASSWORD"
              placeholderTextColor={'#000'}
              secureTextEntry={secureTextEntry} // Cambia dinámicamente según el estado
              onChangeText={text => setPass(text)}
            />
    

          <Pressable
            style={[estilo.boton, loading &&{opacity:0.7}]}
            onPress={() =>{
              //navi.navigate('NavegacionTop' as never);  
              iniciarSesion()
            }}
            disabled ={loading} // El botón se desactiva mientras carga  para evitar múltiples clics.
          >
            {loading ? (
              <ActivityIndicator size={'large'} color={'red'} /> )
            :
            <Text style={estilo.botontext}>INGRESAR</Text>
            }
           
          </Pressable>


          <View style={estilo.padre}>
            <View style={estilo.sesenta}>
            <Text style={[estilo.textsino, estilo.text]}>Si no posees una cuenta. </Text>
            <Pressable onPress={() => setModalVisible(true)}>
              <Text style={[estilo.text, estilo.textcreate]}>CREAR UNA CUENTA</Text>
            </Pressable>
            </View>
          </View>



          <FormularioModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />


          
        </ImageBackground>
      
        </ScrollView>
      
      </KeyboardAvoidingView>
 
    
    </TouchableWithoutFeedback>
    </SafeAreaView>
    </VerificarConexion>
  );
};

const estilo = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%'
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%',
  },
  logo:{
    width:'100%',height:'11%', justifyContent:'center',alignContent:'center', alignItems:'center',
    position:'absolute', top:0,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 15,
    width: '80%',
    height: 40,
    marginBottom: 15,
    textAlign: 'center',
    textAlignVertical: 'center', // Alinea verticalmente el texto
    color: '#fff',
    fontWeight: '700',
    fontSize:16
  },
  inputPrime: {
    marginTop: 400,
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
   
  },
  boton: {
    backgroundColor: '#ffff',
    width: '80%',
    borderRadius: 30,
    paddingVertical: 15,
  },
  botontext: {
    textAlign: 'center',
    fontWeight: '900',
    fontSize:20,

  },
  padre: {
    marginTop:20,
   
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width:'80%',
  },
  textsino: {
    fontSize: Platform.OS === 'ios' ? 16 : 14, // Tamaño condicional para textsino
  },
  textcreate: {
    fontSize: Platform.OS === 'ios' ? 18 : 16, // Tamaño condicional para textcreate
    fontWeight: 'bold',
    color: 'cyan',
  },
  sesenta:{
    
   
    width:'80%',
    alignItems:'center',
    justifyContent:'center'
  },
});

export default Login;