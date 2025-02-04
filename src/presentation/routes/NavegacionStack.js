import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NavegacionTop from './NavegacionTop';
import Archivos from '../screens/archivos/Archivos';
import Archivo from '../screens/archivos/Archivo';
import Nuevo from '../screens/archivos/Nuevo';
import Login from '../screens/login/Login';
import Administrador from '../screens/admin/Administrador';
import CrearUsua from '../screens/admin/CrearUsua';
import VerificarConexion from '../screens/sinconexion/VerificarConexion';



//el satte de context


const Stack = createStackNavigator();

const NavegacionStack = () => {
  return (

    <Stack.Navigator initialRouteName="Login"
      screenOptions={{
        headerStyle: { backgroundColor: '#000000' },
        headerTitleStyle: { fontWeight: '500', color: '#FFFFFF', fontSize: 20 },
        headerTintColor: '#FFFFFF', // Cambia el color de la flecha de retroceso a blanco
      }}
    >
      <Stack.Screen
        name="NavegacionTop"
        component={NavegacionTop}
        options={{ title: 'INICIO' }
        }
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: 'login',
          headerShown: false
        }
        }
      />

      <Stack.Screen
        name="Administrador"
        component={Administrador}
        options={{
          title: 'Administrador',
          headerShown: false
        }
        }
      />

      <Stack.Screen
        name="CrearUsua"
        component={CrearUsua}
        options={{
          title: 'Crear Usuario',
          headerShown: false
        }
        }
      />

      <Stack.Screen
        name="Archivos"
        component={Archivos}
        options={{ title: 'Historial' }}
      />
      <Stack.Screen
        name="Archivo"
        component={Archivo}
        options={{ title: 'Archivo' }}
      />
      <Stack.Screen
        name="Nuevo"
        component={Nuevo}
        options={{ title: 'Nuevo' }}
      />

      <Stack.Screen
        name="ErrorConexión"
        component={VerificarConexion}
        options={{ title: 'ErrorConexión' }}
      />


    </Stack.Navigator>



  );
};

export default NavegacionStack;
