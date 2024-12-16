import React from 'react'
import { Keyboard, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, TextInput } from 'react-native'




const Archivos = () => {





  return (

    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={e.container}>

        <Text style={e.titulo}>Procedimientos</Text>

        <TextInput
        style={e.input}
          placeholder='N° SUMARIO'
          keyboardType="default"

        />

    




      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}


const e = StyleSheet.create({
  container: {
    backgroundColor: '#8A2BE2',
    flex: 1,
    alignItems:'center',

  },  
  titulo: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: '900',
    fontSize: 20,
    marginTop: 30,

  },
  input:{
backgroundColor:'#FFF',
width:'60%',
marginTop:30,
paddingVertical:15,
paddingHorizontal:15,
borderRadius:15
  },

})

export default Archivos