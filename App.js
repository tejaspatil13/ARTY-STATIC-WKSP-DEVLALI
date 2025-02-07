import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { FormProvider } from './utils/FormContext';
import AppNavigator from './navigation/AppNavigator';

const App = () => {
  return (
    <FormProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </FormProvider>
  );
};

export default App;
