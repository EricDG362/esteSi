import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Home from '../screens/home/Home';


import About from '../screens/about/About';
import Archivos from '../screens/archivos/Archivos';


const Tab = createMaterialTopTabNavigator();


const NavegacionTop = () => {


  return (
    
    <Tab.Navigator
    screenOptions={{
      tabBarStyle: { backgroundColor: '#0E3194' }, // Color de fondo de la barra
      tabBarLabelStyle: { color: '#FFFFFF' }, // Color del texto de las etiquetas
      tabBarActiveTintColor: '#FFFFFF', // Color del ítem activo
      tabBarInactiveTintColor: '#FFFFFF', // Color del ítem inactivo (opcional, si quieres el mismo)
    }}
    >

      <Tab.Screen name="Entrada" component={Home} />
      
      <Tab.Screen name="Procedimientos" component={Archivos} />

    </Tab.Navigator>
    
  );
}

export default NavegacionTop