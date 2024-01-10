import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { RootState } from '../redux/Store'; // Import RootState type
import PreloginNav from './PreloginNav';
import { NavBar } from './NavBar';

const Stack = createStackNavigator();

const RootNavigator = () => {
  // Use RootState type in useSelector
  const jwt = useSelector((state: RootState) => state.jwt);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {jwt ? (
          <Stack.Screen name="Home" component={NavBar} />
        ) : (
          <Stack.Screen name="LoginScreens" component={PreloginNav} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;