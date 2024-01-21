import React from 'react';
import { View, Text } from 'react-native';
import { ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { LoginScreenNavigationProps } from '../navigation/RootStackParamList';


const PreloginScreen: React.FC = () => {

  const navigation = useNavigation<LoginScreenNavigationProps>();

  const navToLogin = () => {
    navigation.navigate('Login')
  };

  return (
    <ImageBackground source={require('../public/assets/prelogin.png')}>
      <View className='w-full h-full flex flex-col justify-end pb-[40px]'>
        <TouchableOpacity onPress={() => navToLogin()}>
          <View className='w-[180px] self-center border-2 border-[#D4AF37] rounded-full px-3 py-2'>
            <Text className='text-[#D4AF37] text-[20px] rounded-full text-center font-bebas'>LOGIN</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default PreloginScreen;