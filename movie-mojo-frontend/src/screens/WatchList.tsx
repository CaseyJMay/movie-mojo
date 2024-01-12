import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { movies } from '../mockData';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { ScreenNavigationProps } from '../navigation/RootStackParamList';

export default function WatchList() {
    const navigation = useNavigation<ScreenNavigationProps>();
    const streamingServiceIcons = {
        'hulu': require('../public/assets/hulu.png'),
        'netflix': require('../public/assets/netflix.png'),
        'max': require('../public/assets/max.png'),
        'peacock': require('../public/assets/peacock.png'),
        'prime': require('../public/assets/prime.png')
    };
  return (
    <View className='w-full h-full bg-black'>
        <ScrollView>
            <SafeAreaView className='w-full h-full flex flex-col justify-start bg-black space-y-3'>
                    {movies.map((movie, index) => {
                        return (
                            <TouchableOpacity activeOpacity={.9} onPress={() => navigation.navigate('MoviePage', {uri: movie.image, title: movie.title, description: movie.description, genreList: movie.genreList, releaseYear: movie.releaseYear, streamingList: movie.streamingList})} key={index} className='w-[95%] self-center h-[144px] bg-[#80040C] rounded-lg flex flex-row p-1 space-x-3'>
                                <Image className='h-[137px] w-[83px] rounded-md self-center' source={{ uri: movie.image }} />
                                <View className='flex flex-col h-[85%] justify-around mt-2'>
                                    <View className='flex flex-col h-full py-1 w-[240px] space-y-2'>
                                        <Text numberOfLines={2} className='text-white text-[23px] font-bold text-ellipsis'>{movie.title}</Text>
                                        <View key={index} className='flex flex-row justify-start space-x-2'>
                                            <Text className='text-[#D4AF37] text-[14px] font-bold'>{movie.releaseYear}</Text>
                                            {movie.genreList.map((genre, index) => {
                                                return (
                                                    <Text key={index} className='text-white text-[14px] font-bold'>{genre}</Text>
                                                )
                                            })}
                                        </View>
                                    </View>
                                    <View className='w-fit h-fit flex flex-row space-x-2'>
                                        {movie.streamingList.map((streamingService, index) => {
                                            return (
                                                <Image 
                                                    key={index}
                                                    className='w-[38px] h-[38px] self-center rounded-md'
                                                    source={streamingServiceIcons[streamingService]} 
                                                />
                                            );
                                        })}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
            </SafeAreaView>
        </ScrollView>
    </View>
  );
  }