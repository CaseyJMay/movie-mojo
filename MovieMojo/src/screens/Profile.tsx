import { useState } from 'react';
import { Button, Image, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {

    type StreamingServiceIcons = {
        [key: string]: any;
      };

      type ActiveGenreListType = {
        [key: string]: boolean;
        action: boolean;
        mystery: boolean;
        thriller: boolean;
        drama: boolean;
        romance: boolean;
        horror: boolean;
        comedy: boolean;
    };

    type ActiveStreamingListType = {
        [key: string]: boolean;
        max: boolean;
        hulu: boolean;
        netflix: boolean;
        peacock: boolean;
        prime: boolean;
    };
    

    const streamingList: string[] = ['max', 'hulu', 'netflix', 'peacock', 'prime'];
    const genreList: string[] = ['action', 'mystery', 'thriller', 'drama', 'romance', 'horror', 'comedy']
    const [activeGenres, setActiveGenres]= useState<ActiveGenreListType>({
        'action': true,
        'mystery': false,
        'thriller': false,
        'drama': true,
        'romance': true,
        'horror': false,
        'comedy': true,
    })

    const [activeStreaming, setActiveStreaming]= useState<ActiveStreamingListType>({
        'max': true,
        'hulu': false,
        'netflix': false,
        'peacock': true,
        'prime': true,
    })

    const streamingServiceIcons: StreamingServiceIcons = {
        'hulu': require('../public/assets/hulu.png'),
        'netflix': require('../public/assets/netflix.png'),
        'max': require('../public/assets/max.png'),
        'peacock': require('../public/assets/peacock.png'),
        'prime': require('../public/assets/prime.png')
    };

    const toggleGenre = (genre: string) => {
        setActiveGenres(prevGenres => ({
          ...prevGenres,
          [genre]: !prevGenres[genre]
        }));
      };

    const toggleStreaming = (streaming: string) => {
    setActiveStreaming(prevStreaming => ({
        ...prevStreaming,
        [streaming]: !prevStreaming[streaming]
    }));
    };

  return (
    <SafeAreaView className='w-full h-full flex flex-col justify-start bg-black'>
      <View className='w-full flex flex-row justify-start space-x-4 ml-4'>
      <Image 
            className='w-[96px] h-[96px] self-center rounded-xl'
            source={{uri: 'https://pbs.twimg.com/profile_images/1208234904405757953/mT0cFOVQ_400x400.jpg'}} 
        />
        <Text className='text-white text-2xl self-center'>@CaseyJMay3085</Text>
      </View>
      <Text className='text-2xl self-start ml-3 mt-4 text-[#D4AF37] font-bold mb-2'>Streaming</Text>
      <View className='h-[128px] w-full bg-[#80040C]'>
        <ScrollView style={{ flexGrow:0 }} showsHorizontalScrollIndicator={false} horizontal>
            <View className='h-[128px] w-full bg-[#80040C] flex flex-row p-4 space-x-4'>
                {streamingList.map((streamingService, index) => {
                        if (activeStreaming[streamingService]){
                            return (
                                <TouchableOpacity activeOpacity={1} key={index} className='w-[110px] h-[110px] self-center' onPress={() => toggleStreaming(streamingService)}>
                                    <Image 
                                        className='w-[110px] h-[110px] self-center rounded-xl'
                                        source={streamingServiceIcons[streamingService]} 
                                    />
                                </TouchableOpacity>
                            );
                        }
                        if (!activeStreaming[streamingService]){
                            return (
                                <TouchableOpacity activeOpacity={1} key={index}className='w-[90px] h-[90px] self-center' onPress={() => toggleStreaming(streamingService)}>
                                    <Image 
                                        key={index}
                                        className='w-[90px] h-[90px] self-center rounded-xl opacity-50'
                                        source={streamingServiceIcons[streamingService]} 
                                    />
                                </TouchableOpacity>
                            );
                        }
                    })}
            </View>
        </ScrollView>
      </View>
      <Text className='text-2xl self-start ml-3 mt-4 text-[#D4AF37] font-bold mb-2'>Favorite Genres</Text>
      <View className='h-fit w-full bg-[#80040C]'>
        <ScrollView style={{ flexGrow:0 }} showsHorizontalScrollIndicator={false} horizontal>
            <View className='h-fit w-full bg-[#80040C] flex flex-row p-4 space-x-3 self-center'>
            {genreList.map((genre, index) => {
                if (activeGenres[genre]) {
                    return (
                        <TouchableOpacity activeOpacity={1} onPress={() => toggleGenre(genre)}
                        key={index} className='w-fit h-[45px] px-4 py-1 rounded-full border-2 border-white flex flex-col justify-center'>
                            <Text className='text-white font-bold self-center'>{genre}</Text>
                        </TouchableOpacity>
                    );
                }
                if (!activeGenres[genre]) {
                    return (
                        <TouchableOpacity activeOpacity={1} onPress={() => toggleGenre(genre)} key={index} className='w-fit h-[45px] px-4 py-1 rounded-full border-2 border-[#ffffff60] flex flex-col justify-center'>
                            <Text className='text-[#ffffff60] font-bold self-center'>{genre}</Text>
                        </TouchableOpacity>
                    )
                }
            })}
            </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
  }