import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, Keyboard, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import {jwtDecode} from 'jwt-decode';



// Define the custom JWT payload type
interface CustomJwtPayload {
  id: string;
  email: string;
  nombre: string;
  exp: number;
  iat: number;
}







const Home = () => {

  const [nombre, setNombre] = useState<string | null>(null);


  useEffect(() => {
    const obtenerNombre = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        // Decodificar el token con el tipo personalizado
        const decoded = jwtDecode<CustomJwtPayload>(token);
        setNombre(decoded.nombre); // Ahora 'nombre' es reconocido como una propiedad válida
      } else {
        console.log('No se encontró el token');
      }
    };

    obtenerNombre();
  }, []);


const navigation = useNavigation()



  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={estilo.container}>



        <Text style={estilo.titulo}>{nombre ? `Hola ${nombre}...` : 'Hola...'}</Text>

        <Pressable style={estilo.btnCrear}
        onPress={()=>{navigation.navigate('Nuevo' as never)}}
        >
          <Text style={estilo.textbtn}>CREAR ARCHIVO</Text>
        </Pressable>

        <Pressable style={estilo.btnBuscar}
        onPress={()=>{navigation.navigate('Archivos' as never)}}
        >
          <Text style={estilo.textbtn}>BUSCAR</Text>
        </Pressable>




      </SafeAreaView>
    </TouchableWithoutFeedback>

  )
}

const estilo = StyleSheet.create({

  container: {
    backgroundColor: '#DA70D6',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },

  titulo: {
    color: '#000',
    marginBottom: 50,
  },
  btnCrear: {
    width: '40%',
    backgroundColor: 'cyan',
    borderRadius: 20,
    marginBottom: 30,
    paddingVertical: 15,

  },
  btnBuscar: {
    width: '40%',
    backgroundColor: 'green',
    borderRadius: 20,
    paddingVertical: 15,

  },
  textbtn: {
    textAlign: 'center'

  },



})

export default Home