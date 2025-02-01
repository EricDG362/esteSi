import React from 'react'







const SinConexion = () => {






  return (

<View style={{flex:1, justifyContent:'center',alignItems:'center', backgroundColor:"#000"}}>
            <Image
            source={require('../../../../assets/img/sinconex.png')} 
            style={{ width: 340, height: 180 }} //
            resizeMode="stretch"
            />
             <Text style={[styles.titulo,{width:'90%'}]}>Error de conexión <Text style={{color:'red'}}>X</Text></Text>
        </View> 
  )
}

export default SinConexion