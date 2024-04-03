import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, ImageBackground, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { saveUser } from '../redux/actions/UserActions';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_USER_BY_USERNAME } from '../graphql/getUserByUsername';

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ getUserByUsername, { loading, error, data }] = useLazyQuery(GET_USER_BY_USERNAME, {
    variables: { username: username },
    onError: (error) => {console.log(error)}
  });

  async function handleLogin(){
    try {
      setIsLoading(true)
      console.log('looking for user')
      await getUserByUsername().catch(() => console.log('query failed'))
    }
    catch (error) {
      console.log(error, 'query failed')
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if (data && data.getUserByUsername.password === password){
      saveUser('xyzi', {username: 'hello', email: 'caseyjmay13@gmail.com', location: 'USA', thumbnail: 'blank', description: 'description'});
      setIsLoading(false)
    }
  }, [data])

  return (
    <ImageBackground className='w-full h-full' source={require('../public/assets/prelogin.png')}>
    <View className='absolute w-full h-full bg-black opacity-80'></View>
    <KeyboardAvoidingView behavior="padding" className='w-full h-full flex flex-col justify-center space-y-4 px-4'>
      <Text className='font-bebas text-[40px] text-[#D4AF37] px-2'>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={'#D4AF37'}
        value={username}
        onChangeText={setUsername}
        autoCapitalize='none'
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={'#D4AF37'}
        value={password}
        onChangeText={setPassword}
        autoCapitalize='none'
        secureTextEntry
      />
      <View className='w-full h-[50px] flex flex-row justify-start'>
      <TouchableOpacity onPress={() => handleLogin()}>
        <View className='w-[140px] self-start border-2 border-[#D4AF37] rounded-full px-2 py-1'>
          <Text className='text-[#D4AF37] text-[18px] rounded-full text-center font-bebas'>LOGIN</Text>
        </View>
      </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    borderColor: '#D4AF37',
    borderRadius: 100,
    padding: 10,
    marginBottom: 10,
    color: '#D4AF37'
  },
});

export default LoginScreen;