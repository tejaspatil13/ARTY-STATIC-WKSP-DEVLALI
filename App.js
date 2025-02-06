import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { FormProvider } from './utils/FormContext';

export default function App() {
  return (
    <FormProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </FormProvider>
  );
}