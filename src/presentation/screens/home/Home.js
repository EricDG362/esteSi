import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
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
import { transform } from 'typescript';

const Home = () => {
  const [nombre, setNombre] = useState(null);

  //obtener nombre
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
  const [animacion1] = useState(new Animated.Value(0))
  const [animacion2] = useState(new Animated.Value(1))




  useEffect(() => {
    Animated.timing(
      animacion, {
      toValue: 1, //q valla a 40
      duration: 1000, //q dure 1 segundo
      useNativeDriver: true,
    }
    ).start();
  }, [])

  const animacionYpantalla = () => {

    Animated.sequence([ //ejecuta las animaciones una detras de otra // 1 solo start

      Animated.timing(animacion1, {
        toValue: -80, //q valla a menos 30
        duration: 500, //3 segundos
        useNativeDriver: true,
      }),

      Animated.timing(animacion2, {
        toValue: 50,
        duration: 300, // Hacemos la animación de escala más rápida
       // Aseguramos que la animación sea constante
        useNativeDriver: true,
      }),

    ]).start(() => {
      // Navegar después de completar la animación
      navigation.navigate('Nuevo');
    });
  }

    // Resetear la animación cuando se vuelve a Home
    useFocusEffect( //importamos de navigation 
      React.useCallback(() => {
        // Resetear animaciones cuando se regrese a la pantalla de inicio
        animacion1.setValue(0);
        animacion2.setValue(1);
      }, [])
    );
  

  const estilaAnimacion = {
    transform: [
      { translateX: animacion1 },
      {scale: animacion2}
    ],
  };



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


          <Animated.View
            style={estilaAnimacion}
          >
            <Pressable
              style={estilo.btnCrear}
              onPress={() => animacionYpantalla()}
            >

              <Text style={estilo.textbtn}>CREAR ARCHIVO</Text>
            </Pressable>
          </Animated.View>



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
