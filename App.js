import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Screen01 from "./screens/Screen01"
import Screen02 from "./screens/Screen02"
import Screen03 from "./screens/Screen03"


const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Screen01">
        <Stack.Screen name="Screen01" component={Screen01} options={{ headerShown: false }} />
        <Stack.Screen name="Screen02" component={Screen02} options={{ headerShown: false }} />
        <Stack.Screen name="Screen03" component={Screen03} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}