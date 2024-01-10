import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { saveUser } from '../redux/actions/UserActions';

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    // Implement login logic here
    console.log('Login pressed', username, password);
    saveUser('xyzi', {username: 'hello', email: 'caseyjmay13@gmail.com', location: 'USA', thumbnail: 'blank', description: 'description'});
  };

  return (
    <ImageBackground className='w-full h-full' source={require('../public/assets/prelogin.png')}>
    <View className='absolute w-full h-full bg-black opacity-80'></View>
    <View className='w-full h-full flex flex-col justify-center space-y-4 px-4'>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={'#BB9D6F'}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={'#BB9D6F'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View className='w-full h-[50px] flex flex-row justify-start'>
      <TouchableOpacity onPress={() => handleLogin()}>
        <View className='w-[140px] self-start border-2 border-[#BB9D6F] rounded-full px-2 py-2'>
          <Text className='text-[#BB9D6F] text-[14px] rounded-full text-center font-bold'>Login</Text>
        </View>
      </TouchableOpacity>
      </View>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    paddingHorizontal: 20,
    width: '100%',
    borderWidth: 2,
    borderColor: '#BB9D6F',
    borderRadius: 100,
    padding: 10,
    marginBottom: 10,
    color: '#BB9D6F'
  },
});

export default LoginScreen;