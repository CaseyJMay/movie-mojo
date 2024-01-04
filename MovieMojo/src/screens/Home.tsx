import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { movies } from '../mockData';
import { LinearGradient } from 'expo-linear-gradient';

const Home = () => {
    const streamingServiceIcons = {
        'hulu': require('../public/assets/hulu.png'),
        'netflix': require('../public/assets/netflix.png'),
        'max': require('../public/assets/max.png'),
        'peacock': require('../public/assets/peacock.png'),
        'prime': require('../public/assets/prime.png')
    };
    return (
      <View style={styles.container}>
        <Swiper
        cards={movies}
        cardVerticalMargin={0}
        cardHorizontalMargin={0}
        renderCard={(card) => (
          <View style={styles.card}>
            <Image source={{ uri: card.image }} style={styles.image} />
            <LinearGradient
              colors={['rgba(0,0,0,.1)', 'rgba(0,0,0,.9)']}
              style={styles.linearGradient}
            />
            <View className='w-fit h-fit flex flex-col left-0 top-[150px] absolute border-t-2 border-b-2 border-r-2 border-[#D4AF37] bg-black shadow-black drop-shadow-lg space-y-1 p-1'>
                {card.streamingList.map((streamingService, index) => {
                    return (
                        <Image 
                            key={index}
                            className='w-[48px] h-[45px] self-center'
                            source={streamingServiceIcons[streamingService]} 
                        />
                    );
                })}
            </View>
            <View className='flex flex-col absolute bottom-[150px] left-[20px] w-full'>
                <View className='max-w-[90%]'>
                    <Text numberOfLines={2} className='text-[36px] text-[#FFFFFF] font-bold max-h-[200px] text-ellipsis'>{card.title}</Text>
                </View>
            </View>
            <View className='flex flex-row absolute bottom-[115px] left-[20px] w-full gap-2'>
                <Text numberOfLines={2} className='text-[15px] text-[#FFFFFF] font-bold max-h-[200px] text-ellipsis'>{card.releaseYear}</Text>
                <View className='rounded-full bg-[#FFFFFF] w-2 h-2 self-center' />
                <Text numberOfLines={2} className='text-[15px] text-[#FFFFFF] font-bold max-h-[200px] text-ellipsis'>{card.genreList[0]}</Text>
                <View className='rounded-full bg-[#FFFFFF] w-2 h-2 self-center' />
                <Text numberOfLines={2} className='text-[15px] text-[#FFFFFF] font-bold max-h-[200px] text-ellipsis'>{card.genreList[1]}</Text>
            </View>
          </View>
        )}
        cardIndex={0}
        backgroundColor={'transparent'}
        stackSize={3}
        containerStyle={styles.swiperContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  swiperContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
  },
  card: {
    flex: 1,
    position: 'relative',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  linearGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default Home;
