import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Button, View, Text, ImageSourcePropType, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import MoviePoster from '../components/MoviePoster';
import { StreamingServiceIcons } from './Profile';
import { LinearGradient } from 'expo-linear-gradient';
import { getGenreString } from '../utils/genreMap';
import LoadingComponent from '../components/Loading';

const MoviePage = ({route}: any) => {
    const navigation = useNavigation();
    const params = route?.params
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const streamingServiceIcons: StreamingServiceIcons = {
        'hulu': require('../public/assets/hulu.png'),
        'HBO Max': require('../public/assets/hboMax.png'),
        'netflix': require('../public/assets/netflix.png'),
        'max': require('../public/assets/max.png'),
        'peacock': require('../public/assets/peacock.png'),
        'prime': require('../public/assets/prime.png'),
        'Disney Plus': require('../public/assets/disneyPlus.png'),
    };

    return (
        <ScrollView className=''>
            {isLoading && <LoadingComponent mt={0} ml={0} mr={0} mb={0} />}
            <LinearGradient
                className='w-full h-[120%] absolute'
                colors={['#3D3D3D', '#3D3D3D']}
            />
            <SafeAreaView className='bg-transparent w-full h-full justify-start'>
                <View className='flex flex-row justify-start space-x-4 mb-2 w-[80%]'>
                    <View className='flex flex-col justify-center'>
                        <TouchableOpacity onPress={() => navigation.goBack()} >
                            <Image className="h-[35px] w-[35px] ml-4 self-center" source={require('../public/assets/back.png')} />
                        </TouchableOpacity>
                    </View>
                    <Text numberOfLines={2} className='text-[45px] self-center ml-3 text-white font-bold text-left text-ellipsis font-bebas'>{`${params.title}`}</Text>
                </View>
                <MoviePoster key={params.uri} uri={params.uri} isLoading={isLoading} setIsLoading={setIsLoading} />
                <Text numberOfLines={5} className='text-[14px] self-start ml-[5%] text-white font-bold mb-2 mt-5 text-left text-ellipsis w-[90%]'>{`${params.description}`}</Text>
                <View className='w-full h-fit p-2 bg-[#A9A9A945] mt-2'>
                    <View className='w-fit h-fit flex flex-row space-x-2 self-start ml-2'>
                    {params.streamingList.map((streamingService: any, index: number) => {
                        return (
                            <Image 
                                key={index}
                                className='w-[50px] h-[50px] rounded-md'
                                source={{ uri: 'http://image.tmdb.org/t/p/original/' + streamingService.logo_path }} 
                        />
                        );
                    })}
                    </View>
                </View>
                <View className='w-screen h-fit flex flex-row space-x-2 self-start ml-4 mt-2 flex-wrap'>
                    {params.genreList.map((genre: any, index: any) => {
                        return (
                            <View key={index} className='w-fit h-fit rounded-full border-2 border-[#D4AF37] px-3 py-2 mt-2'>
                                <Text key={index} className='text-[#D4AF37] text-[14px] font-bold'>{getGenreString(genre)}</Text>
                            </View>
                        )
                    })}
                </View>
            </SafeAreaView>
        </ScrollView>
    );
    };;

    export default MoviePage;