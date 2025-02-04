import React from 'react'
import { Text, StyleSheet, Pressable, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';


const Usuario = ({ item, onPress }) => {



    const { id, nombre, apellido, estado, telefono } = item




    return (
        <Pressable

            onPress={() => { onPress({ item }) }}
        >

            <View style={[e.caja]}>


                <View style={{ flexDirection: 'row', alignItems:'center', justifyContent:'space-between'}}>
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
                    </View>

                    <View style={[e.icono]}>
                        <Icon
                            name="user-circle-o" size={50}  color={estado ? "#000" : "red"}
                            
                        />
                    </View>

                </View>

                <View style={[e.cajaEstado, { backgroundColor: estado ? "#037F4A" : "#FF0000" }]}>
                    <Text style={e.textState}>
                        {estado ? "ACTIVO" : "INHABILITADO"}
                    </Text>
                </View>







            </View>
        </Pressable>
    )
}

const e = StyleSheet.create({



    caja: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        marginVertical: 5,
        borderRadius: 18,
        paddingHorizontal: 20,
        paddingVertical:5,
        borderBottomColor: '#FF0000',
        borderWidth: 3,
        width: '100%',
        
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
        marginBottom: 2


    },

    textoSumario: {
        color: '#037F4A',
        fontSize: 20,
        fontWeight: 700,
        marginBottom: 10

    },
    icono:{
           
             
           opacity: 0.7,
           marginLeft:10

    },
    cajaEstado: {
        backgroundColor: '#4B4B4B',
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
    },

    textState: {
        fontSize: 20,
        color: "#fff",
        fontWeight: 600,

    },

})



export default Usuario