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
                        const imageUri = `http://image.tmdb.org/t/p/original${movie.posterPath}`
                        return (
                            <TouchableOpacity activeOpacity={.9} onPress={() => navigation.navigate('MoviePage', {uri: movie.posterPath, title: movie.title, description: movie.description, genreList: movie.genreList, releaseYear: movie.releaseDate, streamingList: movie.watchProviders})} key={index} className='w-[95%] self-center h-[140px] bg-[#3D3D3D] rounded-lg flex flex-row p-1 space-x-3'>
                                <Image className='h-[133px] w-[83px] rounded-md self-center' source={{ uri: imageUri }} />
                                <View className='flex flex-col h-[85%] justify-around mt-2'>
                                    <View className='flex flex-col h-full py-1 w-[240px] space-y-2'>
                                        <Text numberOfLines={2} className='text-white text-[18px] font-bold text-ellipsis'>{`${movie.title} (${movie.releaseDate})`}</Text>
                                        <View className='w-fit h-fit flex flex-row space-x-2 mt-[1px]'>
                                        {movie.watchProviders.map((streamingService, index) => {
                                            const streamingServiceIcon = `http://image.tmdb.org/t/p/original${streamingService.logo_path}`
                                            return (
                                                <Image 
                                                    key={index}
                                                    className='w-[38px] h-[38px] self-center rounded-md'
                                                    source={{uri: streamingServiceIcon}} 
                                                />
                                            );
                                        })}
                                    </View>
                                    </View>
                                    <View key={index} className=' w-[240px] flex flex-row justify-start flex-wrap max-h-[36px] overflow-hidden mt-2'>
                                            {movie.genreList.map((genre, index) => {
                                                return (
                                                    <View  key={index} className='border border-1 border-white p-1 rounded-full mr-2 my-1'>
                                                        <Text className='text-white text-[12px] font-bold mx-1'>{genre}</Text>
                                                    </View>
                                                )
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