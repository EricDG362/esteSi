import React from 'react'
import { Text, StyleSheet, Pressable, View } from 'react-native'


const Usuario = ({ item }) => {

    console.log("valores del item en usuario.js:", item)

    const { id, nombre, apellido, estado, telefono } = item



    return (
        <Pressable

            onPress={() => { onPress(id, estado) }}
        >

            <View style={[e.caja]}>


                <View>
                    <Text style={e.label}>Nombre:
                        <Text style={e.textoSumario}> {nombre}</Text>
                    </Text>

                    <Text style={e.label}>Apellido:
                        <Text style={e.textoSumario}> {apellido}</Text>
                    </Text>

                    <Text style={e.label}>Telefono:
                        <Text style={e.textoSumario}> {telefono}</Text>
                    </Text>

                    <View style={[e.cajaEstado, {backgroundColor: estado ? "#037F4A" : "#FF0000" }]}>
                    <Text style={e.textofecha}>
                        {estado ? "ACTIVO" : "INHABILITADO"}
                    </Text>
                    </View>

                </View>

                <Pressable
                    onLongPress={() => { onLongPress(id) }} //lo envoplvemos en una funcion
                    style={e.botonEliminar}>
                    <Text style={e.textEliminar}>X</Text>
                </Pressable>


            </View>
        </Pressable>
    )
}

const e = StyleSheet.create({


    caja: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        marginVertical: 5,
        borderRadius: 5,
        padding: 20,
        borderBottomColor: '#FF0000',
        borderWidth: 3,
        //sombra para la caja
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5



    },
    label: {
        color: '#374151',
        textTransform: 'uppercase',
        fontWeight: 700,
        marginBottom: 10


    },

    textoSumario: {
        color: '#037F4A',
        fontSize: 20,
        fontWeight: 700,
        marginBottom: 10

    },
    cajaEstado:{
        backgroundColor: '#4B4B4B'
    },

    textofecha: {

        color: "#0000",

    },


    botonEliminar: {
        backgroundColor: '#CC0000',
        alignItems: 'flex-end',
        padding: 5,
        marginBottom: 55,
        borderRadius: 5,
        alignContent: 'center'
    },
    textEliminar: {
        color: '#ffff',
        fontWeight: '700'
    },



})



export default Usuario