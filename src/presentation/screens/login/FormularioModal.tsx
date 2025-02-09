import React, { useState } from 'react'
import {
  Text, Modal, SafeAreaView, StyleSheet, TextInput, View, Pressable,
  TouchableWithoutFeedback, Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Linking,
  ScrollView,

} from 'react-native'

import { useNavigation } from '@react-navigation/native';
import emailjs from '@emailjs/react-native'
import VerificarConexion from '../sinconexion/VerificarConexion';




interface FormularioModalProps {
  modalVisible: boolean; // Especificamos que modalVisible es un booleano
  setModalVisible: (visible: boolean) => void; // Es una función que actualiza el estado
}



//aca se loo asignamos
const FormularioModal = ({ modalVisible, setModalVisible }: FormularioModalProps) => {

  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [password, setPassword] = useState('')

  const navi = useNavigation()


  // //enviar mail
  // const EnviodeEmail = async () => {
  //   if (!nombre || !apellido || !email || !password || !telefono) {
  //     Alert.alert('Error', 'Todos los campos son obligatorios.');
  //     return;
  //   }

  //   const templateParams = {
  //     nombre: 'John',
  //     apellido: 'Doe',
  //     email: 'johndoe@example.com',
  //     mensaje: 'Hello, I need help!',
  //   };

  //   try {
  //     const response = await emailjs.send(
  //       'service_bz1fuig', // tu SERVICE_ID
  //       'template_xbvcqrm', //  tu TEMPLATE_ID
  //       templateParams,
  //       {
  //         publicKey: 'wAPcD_GO_Ty28gdZj', // tu PUBLIC_KEY
  //       }
  //     );
  //     console.log('Correo enviado con éxito:', response.status, response.text);
  //   } catch (err) {
  //     console.error('Error al enviar el correo:', err);
  //   }


  // };


  const EnviodeEmail2 = (to: string, subject: string, body: string) => {

    if (!nombre || !apellido || !email || !password || !telefono) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    Linking.openURL(`mailto:${to}?subject=${subject}&body=${body}`)

    // Alert.alert(
    //   'Formulario Enviado',
    //   'Usted sera redirigido a MERCADOPAGO para finalizar la transacción',
    //   [
    //     {
    //       text: 'Aceptar',
    //       onPress: () => {

    //         //luego es enviado a mercado pago
    //         const url = 'https://mpago.la/1KwJsR7'; // URL de Mercado Pago

    //         Linking.openURL(url) //q abra ese link mediante el modulo linking

    //           .catch((err) => { //de lo contrario muestre error
    //             console.error('No se pudo abrir el enlace:', err);
    //             Alert.alert('Error', 'No se pudo abrir el enlace de pago.');
    //           }); }} ] )

  }







  return (
    <VerificarConexion>

    <Modal
      animationType='slide'
      visible={modalVisible}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          style={estilo.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
             <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
                keyboardType='numeric'
                value={telefono}
                onChangeText={text => setTelefono(text)}
              />
            </View>

            <View style={estilo.campo}>
              <Text style={estilo.label} >EMAIL</Text>
              <TextInput
                style={estilo.input}
                keyboardType='email-address'
                onChangeText={text => setEmail(text)}
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

              <View style={{ marginHorizontal: 20 }}>
                <Text style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>"Recuerde que,
                  después de enviar el formulario, deberá esperar a que el administrador habilite sus credenciales. ¡Muchas gracias!"
                 
                </Text>
              </View>

              {/* <Pressable //boton crear
                style={estilo.boton}
                onPress=
                {() => EnviodeEmail()}
              >
                <Text style={estilo.BotonText}>Enviar EmailJS</Text>
              </Pressable> */}

              <Pressable //boton crear
                style={estilo.boton}
                onPress=
                {() => EnviodeEmail2('CodigoEnAccion362@gmail.com',
                  `Solicitud de Servicio - ${nombre} ${apellido}`,
                  `Hola, me gustaría solicitar su servicio.

                        Detalles:

                        - Nombre: ${nombre} ${apellido}
                        - Telefono: ${telefono}
                        - Email: ${email}
                        - Contraseña: ${password}

                                                      Saludos.`)}
              >
                <Text style={estilo.BotonText}>ENVIAR FORMULARIO</Text>
              </Pressable>


              <Pressable //boton cancelar
                style={[estilo.boton, , estilo.btnCancelar]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={[estilo.BotonText]}>CANCELAR</Text>
              </Pressable>


            </View>





          </SafeAreaView>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>

    </VerificarConexion>


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
    borderRadius: 30,
    backgroundColor: '#fff',
    width: '70%',
    paddingVertical: 10,
    marginBottom: 10,
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
    marginTop: Platform.OS === 'android' ? 30 : 40,
    backgroundColor: '#B22222'
  },
})



export default FormularioModal