import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import StartScreen from './src/screens/StartScreen';
import LoginScreen from './src/screens/LoginScreen';
import Config from 'react-native-config';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='StartScreen' component={StartScreen} options={{headerShown: false}}/>
        <Stack.Screen name='LoginScreen' component={LoginScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
