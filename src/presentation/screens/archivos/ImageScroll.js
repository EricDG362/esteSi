import React from 'react'
import { StyleSheet, Text, ScrollView, View, Image  } from 'react-native'











const ImageScroll = () => {









  return (

    <View style={e.cardScroll}>
                        <ScrollView                      
                            horizontal={true}
                        >

                            <View style={e.card}>
                                <Image
                                    style={e.imagen}
                                    source={require('../../../../assets/img/cd.jpg')}
                                />
                            </View>

                            <View style={e.card} >
                                <Image
                                    style={e.imagen}
                                    source={require('../../../../assets/img/cd.jpg')}
                                />
                            </View>

                            <View style={e.card}>
                                <Image
                                    style={e.imagen}
                                    source={require('../../../../assets/img/cd.jpg')}
                                />
                            </View>

                        </ScrollView>
                    </View>
  )
}


const e = StyleSheet.create({

    cardScroll: {
        marginTop:10,
        height:100
    },
    card:{
        marginHorizontal:5,
    },
    imagen: {
        width: 130,
        height: 70,
        resizeMode: 'cover',
    },


})

export default ImageScroll