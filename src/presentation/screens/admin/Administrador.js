
import React, { useState } from 'react';
import {
    Text, StyleSheet, TouchableWithoutFeedback,
    SafeAreaView, Keyboard, TextInput
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { FlatList } from 'react-native-gesture-handler';
import { gql, useQuery, useMutation } from '@apollo/client';
import Usuario from './Usuario';




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


    const [filtro, setFiltro] = useState('');
 



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
    const ChangeState = async ({item}) => {
       
        const {id, nombre, apellido, telefono, email, estado} = item

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
                   

                    <Text style={styles.titulo}>Lista de Usuarios</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Nombre de Usuario"
                        keyboardType="default"
                        value={filtro}
                        onChangeText={(text) => setFiltro(text)}
                    />

                    <FlatList
                        data={usuariosFiltrados}
                        renderItem={({ item }) => (

                            //estas son las
                            <Usuario
                                item={item}

                                onPress={ChangeState}
                            />
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        //si no hay nada
                        ListEmptyComponent={
                            <Text style={styles.titulo}>No hay Usuarios disponibles</Text>
                        }
                        style={{ width: '80%' }} // Ajusta el ancho aquí
                    />



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
