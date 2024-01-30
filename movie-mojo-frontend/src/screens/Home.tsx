import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { LinearGradient } from 'expo-linear-gradient';
import LoadingComponent from '../components/Loading';
import { movies } from '../mockData';
import { useQuery } from '@apollo/client';
import { GET_POPULAR_MOVIES } from '../graphql/getPopularMovies';
import { Movie } from '../types/types';

const Home = () => {
    const [loadingImageCount, setLoadingImageCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);

    const { loading, error, data } = useQuery(GET_POPULAR_MOVIES, {
      onError: (error) => console.log(JSON.stringify(error))
    });

    const handleImageLoadStart = () => {
        setLoadingImageCount(prevCount => prevCount + 1);
    };

    const handleImageLoadEnd = () => {
        setLoadingImageCount(prevCount => prevCount - 1);
    };

    // useEffect(() => {
    //   if (loadingImageCount == 0){
    //     setIsLoading(false)
    //   }
    //   else {
    //     setIsLoading(true)
    //   }
    // }, [loadingImageCount])

    useEffect(() => {
      if (data && Array.isArray(data.getPopularMovies)) {

          const movies: Movie[] = data.getPopularMovies.filter((movie: Movie ) => movie && movie.posterPath); // Filter out any undefined movies or movies without posterPath
          setPopularMovies(movies);
      }
  }, [data]);

    return (
      <View style={styles.container}>
        {popularMovies.length > 0 && <Swiper
          cards={popularMovies}
          cardVerticalMargin={0}
          cardHorizontalMargin={0}
          showSecondCard={true}
          renderCard={(card) => {
            const posterPath = `http://image.tmdb.org/t/p/original${card.posterPath}`;
            return (
              <View style={styles.card}>
                <Image
                  source={{ uri: posterPath }}
                  style={styles.image}
                  onLoadStart={handleImageLoadStart}
                  onLoadEnd={handleImageLoadEnd}
                />
                <LinearGradient
                  colors={['rgba(0,0,0,.1)', 'rgba(0,0,0,.9)']}
                  style={styles.linearGradient}
                />
            <View className='w-fit h-fit flex flex-col left-0 top-[150px] absolute border-t-2 border-b-2 border-r-2 border-[#D4AF37] bg-black shadow-black drop-shadow-lg space-y-1 p-1'>
            {card.watchProviders.map((streamingService, index) => {
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
            <View className='flex flex-col absolute bottom-[150px] left-[20px] w-full'>
                <View className='max-w-[90%]'>
                    <Text numberOfLines={2} className='text-[36px] text-[#FFFFFF] font-bold max-h-[200px] text-ellipsis font-bebas'>{card.title}</Text>
                </View>
            </View>
            <View className='flex flex-row absolute bottom-[115px] left-[20px] w-full gap-2'>
                <Text numberOfLines={2} className='text-[15px] text-[#FFFFFF] font-bold max-h-[200px] text-ellipsis'>{card.releaseDate}</Text>
                <View className='rounded-full bg-[#FFFFFF] w-2 h-2 self-center' />
                <Text numberOfLines={2} className='text-[15px] text-[#FFFFFF] font-bold max-h-[200px] text-ellipsis'>{card.genreList[0]}</Text>
                <View className='rounded-full bg-[#FFFFFF] w-2 h-2 self-center' />
                <Text numberOfLines={2} className='text-[15px] text-[#FFFFFF] font-bold max-h-[200px] text-ellipsis'>{card.genreList[1]}</Text>
            </View>
          </View>
        )}}
        cardIndex={0}
        backgroundColor={'transparent'}
        stackSize={3}
        containerStyle={styles.swiperContainer}
      />}
      {loading && <LoadingComponent mt={0} mb={0} ml={0} mr={0} />}
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
