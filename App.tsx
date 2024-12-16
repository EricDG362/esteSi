import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavegacionStack from './src/presentation/routes/NavegacionStack';

const App = () => {
  return (
    <NavigationContainer>
      <NavegacionStack />
    </NavigationContainer>
  );
};

export default App;

