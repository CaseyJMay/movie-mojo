import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavBar } from './src/navigation/NavBar';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function App() {
  return (
    
    <NavigationContainer>
      <GestureHandlerRootView className='w-full h-full flex flex-col justify-center'>
        <NavBar />
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}