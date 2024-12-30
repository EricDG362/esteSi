import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavegacionStack from './src/presentation/routes/NavegacionStack';
import Nuevo from './src/presentation/screens/archivos/Nuevo';

const App = () => {
  return (
    <NavigationContainer>
      <NavegacionStack />
      {/* <Nuevo  /> */}
    </NavigationContainer>
  );
};

export default App;

