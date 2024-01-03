import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View className='w-full h-full flex flex-col justify-center'>
      <Text className="text-pink-300 self-center">Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}