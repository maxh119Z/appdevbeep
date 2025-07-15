import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './homescreen';
import FormScreen from './form';
import MatchScreen from './match';
import AboutScreen from './about';
import CameraScreen from './recording'

export type RootStackParamList = {
  Home: undefined;
  Form: undefined;
  Match: undefined;
  About: undefined;
  Camera: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Form" component={FormScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Match" component={MatchScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="About" component={AboutScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Camera" component={CameraScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;