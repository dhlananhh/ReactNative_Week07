import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import API_Screen_01 from './components/API_Screen_01'
import API_Screen_02 from './components/API_Screen_02';
import API_Screen_03 from './components/API_Screen_03';


const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="API_Screen_01" component={API_Screen_01} />
        <Stack.Screen name="API_Screen_02" component={API_Screen_02} />
        <Stack.Screen name="API_Screen_03" component={API_Screen_03} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
