import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen';
import Page1 from '../screens/Page1';
import Page2 from '../screens/Page2';
// Import other pages as needed

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="MainScreen">
      <Stack.Screen name="MainScreen" component={MainScreen} options={{ title: 'Main Page' }} />
      <Stack.Screen name="Page1" component={Page1} options={{ title: 'Page 1' }} />
      <Stack.Screen name="Page2" component={Page2} options={{ title: 'Page 2' }} />
      {/* Add other pages here */}
    </Stack.Navigator>
  );
}