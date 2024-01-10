import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, View, Text } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import MoviePoster from '../components/MoviePoster';
import { StreamingServiceIcons } from './Profile';
import { LinearGradient } from 'expo-linear-gradient';


const MoviePage = ({route}: any) => {
    const navigation = useNavigation();
    const params = route?.params

    const streamingServiceIcons: StreamingServiceIcons = {
        'hulu': require('../public/assets/hulu.png'),
        'netflix': require('../public/assets/netflix.png'),
        'max': require('../public/assets/max.png'),
        'peacock': require('../public/assets/peacock.png'),
        'prime': require('../public/assets/prime.png')
    };

  return (
    <ScrollView className=''>
        <LinearGradient
            className='w-full h-[120%] absolute'
            colors={['gray', 'black']}
        />
        <SafeAreaView className='bg-transparent w-full h-full justify-start px-0'>
            <TouchableOpacity onPress={() => navigation.goBack()} >
                <Image className="h-[30px] w-[30px] ml-4 mb-3" source={require('../public/assets/back.png')} />
            </TouchableOpacity>
            <MoviePoster key={params.uri} uri={params.uri} />
            <View className='w-fit h-fit flex flex-row space-x-2 self-start ml-4 mt-5'>
            {params.streamingList.map((streamingService: any, index: number) => {
                return (
                    <Image 
                        key={index}
                        className='w-[38px] h-[38px] self-center rounded-md'
                        source={streamingServiceIcons[streamingService]} 
                    />
                );
            })}
            </View>
            <Text numberOfLines={2} className='text-[28px] self-start ml-3 mt-4 text-white font-bold mb-2 text-left text-ellipsis'>{`${params.title}`}</Text>
            <Text numberOfLines={5} className='text-[12 px] self-start ml-3 mt-4 text-white font-bold mb-2 text-left text-ellipsis w-[90%]'>{`${params.description}`}</Text>
            <View className='w-screen h-fit flex flex-row space-x-2 self-start ml-4 mt-2 flex-wrap'>
                {params.genreList.map((genre: any, index: any) => {
                    return (
                        <View key={index} className='w-fit h-fit rounded-full border-2 border-[#D4AF37] px-3 py-2 mt-2'>
                            <Text key={index} className='text-[#D4AF37] text-[14px] font-bold'>{genre}</Text>
                        </View>
                    )
                })}
            </View>
        </SafeAreaView>
    </ScrollView>
  );
};;

export default MoviePage;