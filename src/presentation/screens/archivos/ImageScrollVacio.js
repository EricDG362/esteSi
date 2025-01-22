import React from 'react'
import { Text, View, Pressable, StyleSheet,ScrollView } from 'react-native'







const ImageScrollVacio = () => {










    return (
        <>
            <View style={e.cardScroll}>
                <ScrollView
                    horizontal={true}
                >
                <View
                    style={e.cajaBotonImagen}
                >
                    <Pressable style={e.BotonImagen} >
                        <Text style={e.textBotonImagen}>IMAGENES +</Text>
                    </Pressable>
                </View>

                <View
                    style={e.cajaBotonImagen}
                >
                    <Pressable style={e.BotonImagen} >
                        <Text style={e.textBotonImagen}>IMAGENES +</Text>
                    </Pressable>
                </View>

                <View
                    style={e.cajaBotonImagen}
                >
                    <Pressable style={e.BotonImagen} >
                        <Text style={e.textBotonImagen}>IMAGENES +</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View >
            
        </>

    )
}



const e = StyleSheet.create({

    // scrollHorizontal
    cardScroll: {
        marginTop:4,
        height:100,
        marginHorizontal:10,
        marginBottom:5

    },

    cajaBotonImagen: {
        marginTop: 8,
        borderColor: '#fff',
        borderWidth: 2,
        marginHorizontal:5
    },
    BotonImagen: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 130,
        height: 100,
        resizeMode: 'cover',
    },
    textBotonImagen: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
        marginHorizontal: 5


    },






})

export default ImageScrollVacio