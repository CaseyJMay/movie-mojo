import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavBar } from './src/navigation/NavBar';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    
    <NavigationContainer>
      <View className='w-full h-full flex flex-col justify-center'>
        <NavBar />
      </View>
    </NavigationContainer>
  );
}