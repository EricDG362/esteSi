
import React, { useState } from 'react';
import {
    Text, StyleSheet, TouchableWithoutFeedback,
    SafeAreaView, Keyboard, TextInput,
    Pressable,
    View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { FlatList } from 'react-native-gesture-handler';
import { gql, useQuery, useMutation } from '@apollo/client';
import Usuario from './Usuario';
import { StackActions, useNavigation } from '@react-navigation/native';
import CrearUsua from './CrearUsua';




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


const ACTUALIZAR_ESTADO = gql`
mutation  actualizarEstado($id:ID!, $input:UsuarioInput, $estado: Boolean){
        actualizarEstado(id:$id, input: $input, estado: $estado){
        
     id
  nombre
  apellido
  telefono
  email
  estado
        
        }
}
`;







const Administrador = () => {

    const [modalVisible, setModalVisible] = useState(false)
    const [filtro, setFiltro] = useState('');

    const navi = useNavigation()


    //apollo
    const [actualizarEstado] = useMutation(ACTUALIZAR_ESTADO)
    const { data, loading, error } = useQuery(OBTENER_USUARIOS);

    // console.log("desde data em administrador: " , data)

    if (loading) return <Text style={styles.titulo}>Cargando...</Text>;

    if (error) {
        console.log('Error al cargar datos:', error);
        return <Text style={styles.titulo}>Error al cargar datos</Text>;
    }


    // Filtrar los usuarios basados en el texto del filtro
    const usuariosFiltrados = data?.obtenerUsuarios.filter((usu) =>
        usu.nombre.toLowerCase().includes(filtro.toLowerCase())
    ) || [];



    //cambia el estado
    const ChangeState = async ({ item }) => {

        const { id, nombre, apellido, telefono, email, estado } = item

        if (!id || !nombre || !apellido || !telefono || !email) {
            console.error('Datos faltantes en ChangeState:', { id, nombre, apellido, telefono, email, estado });
            return;
        }

        try {


            const { data } = await actualizarEstado({
                variables: {
                    id,
                    input: {
                        nombre,
                        apellido,
                        telefono,
                        email,

                    },
                    estado: !estado
                }
            });

        } catch (error) {
            console.log('error al actualizar estado:', error)
        }

    }


    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {/* Fondo con bandas horizontales usando LinearGradient */}
            <LinearGradient
                colors={['#5856d6', '#4240a2', '#2e2d71', '#1b1a47']} // Colores definidos
                locations={[0, 0.25, 0.5, 0.75]} // Proporción de cada color
                style={styles.fondo}
            >
                <SafeAreaView style={styles.container}>

                    <Text style={styles.titulo}>Bienvenido administrador!!</Text>




                    <Text style={styles.subtitulo}>Lista de Usuarios</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre de Usuario"
                            keyboardType="default"
                            value={filtro}
                            onChangeText={(text) => setFiltro(text)}
                        />

                        <Pressable onPress={() => setModalVisible(true)
                        }
                            style={styles.boton}>
                            <Text style={styles.BotonText}>+</Text>
                        </Pressable>

                        <CrearUsua
                            modalVisible={modalVisible}
                            setModalVisible={setModalVisible}
                        />

                    </View>







                    <FlatList
                        data={usuariosFiltrados.slice().reverse()}
                        renderItem={({ item }) => (

                            //estas son las
                            <Usuario
                                item={item}

                                onPress={ChangeState}
                            />
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        //si no hay nada
                        ListEmptyComponent={
                            <Text style={styles.titulo}>No hay Usuarios disponibles</Text>
                        }
                        style={{ width: '80%' }} // Ajusta el ancho aquí
                    />

                    <Pressable
                        onPress={() => navi.dispatch(StackActions.replace('Login'))}
                        style={[styles.btnCrear, styles.footer]}
                    >
                        <Text style={[styles.textbtn]}>SALIR</Text>

                    </Pressable>


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
        marginTop: 30,
        fontSize: 30,
        fontFamily: 'Iceland-Regular',
    },
    subtitulo: {
        color: '#fff',

        fontSize: 30,
        fontFamily: 'Iceland-Regular',

    },
    input: {
        backgroundColor: '#FFF',
        width: '60%',
        marginTop: 20,
        marginBottom: 10,
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 15,
        textAlign: 'center',
        fontSize: 16,
        color: 'red',
        fontWeight: '600',
    },
    boton: {
        backgroundColor: 'cyan',
        marginVertical: 20,
        paddingHorizontal: 10,
        width: '20%',
        alignItems: 'center',
        borderRadius: 30,

    },
    BotonText: {
        fontWeight: 800,
        textAlign: 'center',
        fontSize: 30,

    },
    btnCrear: {
        width: '80%', // Ahora ocupa el 80% del ancho del contenedor padre
        borderRadius: 30,
        marginBottom: 20,
        paddingVertical: 10,
        justifyContent: 'center', // Centra el texto verticalmente
        alignItems: 'center', // Centra el texto horizontalmente

    },
    textbtn: {
        textAlign: 'center',
        fontSize: 28,
        fontWeight: '900',

    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '90%',
        backgroundColor: '#274d60',
        padding: 10,
        alignItems: 'center',
        opacity: 0.7,
        padding: 20
    },
});

export default Administrador;
