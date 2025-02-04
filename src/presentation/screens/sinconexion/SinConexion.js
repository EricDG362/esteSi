import React from 'react'
import { View, Image, Text, StyleSheet,Pressable } from 'react-native'








const SinConexion = () => {





  return (

    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#000"}}>

      <Text style={{ width: '90%', color: '#fff', fontSize: 35,textAlign:'center' }}>Error de conexión <Text style={{ color: 'red' }}>X</Text></Text>

      <Image
        source={require('../../../../assets/img/sinconex.png')}
        style={{ width: 340, height: 180 }} //
        resizeMode="stretch"
      />

      <Text style={{ width: '90%', color: '#fff', fontSize: 20, textAlign: 'center' }}>Verifique su red...</Text>


   

    </View>
  )
}


const e = StyleSheet.create({
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
    fontSize: 25,
    fontWeight: '900',
    color:'#fff',

  },
  footer: {
    position: 'absolute',
    bottom: 60,
    width: '80%',
    backgroundColor: '#274d60',
    padding: 10,
    alignItems: 'center',
    opacity: 0.7,
    padding: 20
  },
})

export default SinConexion