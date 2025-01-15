import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import {
    Text, StyleSheet, TouchableWithoutFeedback,
    SafeAreaView, Keyboard, TextInput
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { jwtDecode } from 'jwt-decode';
import { FlatList } from 'react-native-gesture-handler';

const Administrador = () => {
    const [filtro, setFiltro] = useState('');
    const [nombre, setNombre] = useState(null);

    useEffect(() => {
        const obtenerNombre = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    setNombre(decoded.nombre);
                } catch (error) {
                    console.error('Error al decodificar el token:', error);
                }
            }
        };

        obtenerNombre();
    }, []);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {/* Fondo con bandas horizontales usando LinearGradient */}
            <LinearGradient
                colors={['#5856d6', '#4240a2', '#2e2d71', '#1b1a47']} // Colores definidos
                locations={[0, 0.25, 0.5, 0.75]} // Proporción de cada color
                style={styles.fondo}
            >
                <SafeAreaView style={styles.container}>
                    {nombre ? (
                        <Text style={styles.titulo}>Bienvenido administrador: {nombre}!!</Text>
                    ) : (
                        <Text style={styles.titulo}>Cargando...</Text>
                    )}

                    <Text style={styles.titulo}>Lista de Usuarios</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Nombre de Usuario"
                        keyboardType="default"
                        value={filtro}
                        onChangeText={(text) => setFiltro(text)}
                    />

                    <FlatList />
                </SafeAreaView>
            </LinearGradient>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    fondo: {
        flex: 1
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    titulo: {
        color: '#fff',
        marginTop: 40,
        fontSize: 30,
        fontFamily: 'Iceland-Regular',
    },
    input: {
        backgroundColor: '#FFF',
        width: '60%',
        marginTop: 30,
        marginBottom: 40,
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 15,
        textAlign: 'center',
    },
});

export default Administrador;
