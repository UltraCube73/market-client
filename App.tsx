import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import StartScreen from './src/screens/StartScreen';
import LoginScreen from './src/screens/LoginScreen';
import MainScreen from './src/screens/MainScreen';
import ExceptionScreen from './src/screens/ExceptionScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import { NavParamList } from './src/types/NavProps';

const Stack = createNativeStackNavigator<NavParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='StartScreen'>
        <Stack.Screen name='StartScreen' component={StartScreen} options={{headerShown: false}}/>
        <Stack.Screen name='LoginScreen' component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name='MainScreen' component={MainScreen} options={{headerShown: false}}/>
        <Stack.Screen name='ExceptionScreen' component={ExceptionScreen} options={{headerShown: false}}/>
        <Stack.Screen name='RegistrationScreen' component={RegistrationScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
