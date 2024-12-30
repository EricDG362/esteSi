import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Home from '../screens/home/Home';


import About from '../screens/about/About';
import Archivos from '../screens/archivos/Archivos';


const Tab = createMaterialTopTabNavigator();


const NavegacionTop = () => {


  return (
    
    <Tab.Navigator
    screenOptions={{
      tabBarStyle: { backgroundColor: '#000000' }, // Color de fondo de la barra
      tabBarLabelStyle: { color: '#FFFFFF', fontSize:20, fontWeight:'800' }, // Color del texto de las etiquetas
      tabBarActiveTintColor: '#FFFFFF', // Color del ítem activo
      tabBarInactiveTintColor: '#000000', // Color del ítem inactivo (opcional, si quieres el mismo)
    }}
    >

      <Tab.Screen name="Entrada" component={Home} />
      
      <Tab.Screen name="Procedimientos" component={Archivos} />

    </Tab.Navigator>
    
  );
}

export default NavegacionTop