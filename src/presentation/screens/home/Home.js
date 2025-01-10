import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Animated
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { jwtDecode } from 'jwt-decode';

const Home = () => {
  const [nombre, setNombre] = useState(null);

  useEffect(() => {
    const obtenerNombre = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        console.log('Token encontrado:', token);
        try {
          const decoded = jwtDecode(token);

          setNombre(decoded.nombre);  // Actualizando el estado con el nombre
        } catch (error) {
          console.error('Error al decodificar el token:', error);
        }
      } else {
        console.log('No se encontró el token');
      }
    };

    obtenerNombre();
  }, [nombre]);



  const navigation = useNavigation();

  //animacion
  const animacion = useState(new Animated.Value(0.4))[0]; // Inicializa el valor animado

  useEffect(() => {
    Animated.timing(
      animacion, {
      toValue: 1, //q valla a 40
      duration: 500, //q dure 1/2 segundo
      useNativeDriver: true,
    }
    ).start();
  }, [])

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <LinearGradient
        colors={['#000000', '#013220']} // Negro a verde oscuro
        locations={[0.2, 1]} // El negro ocupa el 30% y el verde oscuro empieza desde ahí hasta el final
        style={estilo.fondo}
      >
        <SafeAreaView style={estilo.container}>
          {nombre ? (
            <Animated.Text style={[estilo.titulo, { transform: [{ scale: animacion }] }]}>Hola... {nombre}!!</Animated.Text>
          ) : (
            <Text style={estilo.titulo}>Cargando...</Text>
          )}

          <Pressable
            style={estilo.btnCrear}
            onPress={() => {
              navigation.navigate('Nuevo');
            }}
          >
            <Text style={estilo.textbtn}>CREAR ARCHIVO</Text>
          </Pressable>
        </SafeAreaView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

const estilo = StyleSheet.create({
  fondo: {
    flex: 1
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  titulo: {
    color: '#fff',
    marginBottom: 50,
    fontSize: 40,
    fontFamily: 'Iceland-Regular'
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
    textAlign: 'center',
  },
});

export default Home;
