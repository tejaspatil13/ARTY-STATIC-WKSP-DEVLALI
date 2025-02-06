import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen';
import DutyHandoverPage from '../screens/DutyHandoverPage';
import GuardDetailsPage from '../screens/GuardDetailsPage';
// Import other pages as needed

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="MainScreen">
      {/* Main Screen */}
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{ title: 'Main Page' }}
      />

      {/* Duty Handover Page */}
      <Stack.Screen
        name="DutyHandover"
        component={DutyHandoverPage}
        options={{ title: 'Duty Handover' }}
      />

      {/* Guard Details Page */}
      <Stack.Screen
        name="GuardDetails"
        component={GuardDetailsPage}
        options={{ title: 'Guard Details' }}
      />

      {/* Add other pages here */}
      {/* Example for Page 3 */}
      {/*
      <Stack.Screen
        name="Page3"
        component={Page3}
        options={{ title: 'Page 3' }}
      />
      */}

      {/* Continue adding pages up to Page 28 */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
