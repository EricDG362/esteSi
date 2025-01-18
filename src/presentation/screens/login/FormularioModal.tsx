import React, { useState } from 'react'
import {
  Text, Modal, SafeAreaView, StyleSheet, TextInput, View, Pressable,
  TouchableWithoutFeedback, Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Linking,

} from 'react-native'
//apollo
import { gql, useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import emailjs from '@emailjs/react-native'




interface FormularioModalProps {
  modalVisible: boolean; // Especificamos que modalVisible es un booleano
  setModalVisible: (visible: boolean) => void; // Es una función que actualiza el estado
}

const NUEVA_CUENTA = gql`
mutation crearUsuario ($input:UsuarioInput){
    crearUsuario(input:$input)
}`;

//aca se loo asignamos
const FormularioModal = ({ modalVisible, setModalVisible }: FormularioModalProps) => {

  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [password, setPassword] = useState('')


  const navi = useNavigation()

  //mutation apolo
  const [crearUsuario] = useMutation(NUEVA_CUENTA)

  //envia el formulario
  const handleSubmit = async () => {
    //validar campos
    if (nombre === "" || apellido === "" || email === "" || password === ""||telefono==="") {
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
        'Su cuenta fue creada con exito!!.',
      );

      setModalVisible(!modalVisible)//cambie el estado a lo opuesto a lo q esta


    } catch (error) {
      console.log(error)
    }


  }



  const EnviodeEmail = async () => {
    if (!nombre || !apellido || !email || !password || !telefono) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    const templateParams = {
      nombre: 'John',
      apellido: 'Doe',
      email: 'johndoe@example.com',
      mensaje: 'Hello, I need help!',
    };

    try {
      const response = await emailjs.send(
        'service_bz1fuig', // tu SERVICE_ID
        'template_xbvcqrm', //  tu TEMPLATE_ID
        templateParams,
        {
          publicKey: 'wAPcD_GO_Ty28gdZj', // tu PUBLIC_KEY
        }
      );
      console.log('Correo enviado con éxito:', response.status, response.text);
    } catch (err) {
      console.error('Error al enviar el correo:', err);
    }


  };


  const EnviodeEmail2 = (to:string, subject:string, body:string)=>{

    Linking.openURL(`mailto:${to}?subject=${subject}&body=${body}`)

  }


  // //luego es enviado a mercado pago
  // const url = 'https://mpago.la/1KwJsR7'; // URL de Mercado Pago

  // Linking.openURL(url) //q abra ese link mediante el modulo linking

  //   .catch((err) => { //de lo contrario muestre error
  //     console.error('No se pudo abrir el enlace:', err);
  //     Alert.alert('Error', 'No se pudo abrir el enlace de pago.');
  //   });




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

              <Pressable //boton crear
                style={estilo.boton}
                onPress={() => handleSubmit()}
              >
                <Text style={estilo.BotonText}>CREAR CUENTA</Text>
              </Pressable>

              <Pressable //boton crear
                style={estilo.boton}
                onPress=
                {() => EnviodeEmail()}
              >
                <Text style={estilo.BotonText}>Enviar EmailJS</Text>
              </Pressable>

              <Pressable //boton crear
                style={estilo.boton}
                onPress=      
              {() => EnviodeEmail2('makarov362edg@gmail.com', `Soy ${nombre} ${apellido}`,` quisiera su svc con este Email: ${email} y esta contraseña ${password}`)}
              >
                <Text style={estilo.BotonText}>Enviar Email con el telefono</Text>
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
    marginTop: Platform.OS === 'android' ? 50 : 40,
    backgroundColor: 'red'
  },
})



export default FormularioModal