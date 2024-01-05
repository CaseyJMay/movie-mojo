import { Image, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {

    type StreamingServiceIcons = {
        [key: string]: any;
      };

    const streamingList: string[] = ['max', 'hulu', 'netflix', 'peacock', 'prime'];

    const streamingServiceIcons: StreamingServiceIcons = {
        'hulu': require('../public/assets/hulu.png'),
        'netflix': require('../public/assets/netflix.png'),
        'max': require('../public/assets/max.png'),
        'peacock': require('../public/assets/peacock.png'),
        'prime': require('../public/assets/prime.png')
    };

  return (
    <SafeAreaView className='w-full h-full flex flex-col justify-start bg-black'>
      <View className='w-full flex flex-row justify-start space-x-4 ml-4'>
        <View className='w-[96px] h-[96px] bg-white self-center' />
        <Text className='text-white text-2xl self-center'>@CaseyJMay3085</Text>
      </View>
      <Text className='text-2xl self-start ml-3 mt-4 text-[#D4AF37] font-bold mb-2'>Streaming</Text>
      <View className='h-[128px] w-full bg-[#80040C]'>
        <ScrollView style={{ flexGrow:0 }} showsHorizontalScrollIndicator={false} horizontal>
            <View className='h-[128px] w-full bg-[#80040C] flex flex-row p-4 space-x-2'>
                {streamingList.map((streamingService, index) => {
                                return (
                                    <Image 
                                        key={index}
                                        className='w-[110px] h-[110px] self-center rounded-xl'
                                        source={streamingServiceIcons[streamingService]} 
                                    />
                                );
                            })}
            </View>
        </ScrollView>
      </View>
      <Text className='text-2xl self-start ml-3 mt-4 text-[#D4AF37] font-bold mb-2'>Streaming</Text>
      <View className='h-[128px] w-full bg-[#80040C]'>
        <ScrollView style={{ flexGrow:0 }} showsHorizontalScrollIndicator={false} horizontal>
        <View className='h-[128px] w-full bg-[#80040C] flex flex-row p-4 space-x-2'>
        {streamingList.map((streamingService, index) => {
                        return (
                            <Image 
                                key={index}
                                className='w-[110px] h-[110px] self-center rounded-xl'
                                source={streamingServiceIcons[streamingService]} 
                            />
                        );
                    })}
        </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
  }