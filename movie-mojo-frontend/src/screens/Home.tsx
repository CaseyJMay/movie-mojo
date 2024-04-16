import React, { useEffect, useState, useMemo } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { LinearGradient } from 'expo-linear-gradient';
import LoadingComponent from '../components/Loading';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_POPULAR_MOVIES } from '../graphql/getPopularMovies';
import { Movie } from '../types/types';
import { getGenreString } from '../utils/genreMap';
import getYearFromDate from '../utils/getYearFromDate';
import GradientWrapper from '../components/GradientView';
import { Side } from '../components/GradientView';


const Home = () => {
    const [loadingImageCount, setLoadingImageCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
    const [swipeDirection, setSwipeDirection] = useState<String | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [isFetching, setIsFetching] = useState(false);


    const [ fetchData, {loading, error, data }] = useLazyQuery(GET_POPULAR_MOVIES, {
      variables: { pageNumber: pageNumber },
      onError: (error) => console.log(JSON.stringify(error)),
      onCompleted: () => setIsFetching(false)
    });

    useEffect(() => {
      if (pageNumber > 0) {
        console.log('fetching data here!')
        fetchData({
          variables: {
            pageNumber: pageNumber
          },
        });
      }
    }, [pageNumber]);
    
    
    useEffect(() => {
      if (!loading && data && Array.isArray(data.getPopularMovies)) {
        console.log('setting popular movies', data.getPopularMovies)
        setPopularMovies((prevMovies) => [...prevMovies, ...data.getPopularMovies]);
      }
    }, [data, loading]);
    

    const handleImageLoadStart = () => {
        setLoadingImageCount(prevCount => prevCount + 1);
    };

    const handleImageLoadEnd = () => {
        setLoadingImageCount(prevCount => prevCount - 1);
    };

    const resetSwipeDirection = () => {
      setSwipeDirection(null);
  };

  const onSwiped = (cardIndex: number) => {
    console.log(cardIndex, popularMovies.length)
    if (cardIndex === popularMovies.length - 1) { // Check if the last card was swiped
      setIsFetching(true);
      setPageNumber((prevPageNumber) => prevPageNumber + 1); // Increment page number to fetch next page
      console.log("isFetching")
    }
    resetSwipeDirection();
  };


    const handleSwiping = (x: number) => {
      if (x > 25) {
          setSwipeDirection('right');
      } else if (x < -25) {
          setSwipeDirection('left');
      } else {
          setSwipeDirection(null);
      }
  };

    useEffect(() => {
      if (data && Array.isArray(data.getPopularMovies)) {

          const movies: Movie[] = data.getPopularMovies.filter((movie: Movie ) => movie && movie.posterPath); // Filter out any undefined movies or movies without posterPath
          setPopularMovies(movies);
      }
  }, [data]);

    return (
      <View style={[styles.container]}>
        {popularMovies.length > 0 && <Swiper
          key={popularMovies.length}
          cards={popularMovies}
          cardVerticalMargin={0}
          cardHorizontalMargin={0}
          showSecondCard={true}
          onSwiping={handleSwiping}
          onSwiped={onSwiped}
          onSwipedAborted={resetSwipeDirection}
          renderCard={(card) => {
            const posterPath = `http://image.tmdb.org/t/p/original${card.posterPath}`;
            return (
              <View style={[styles.card]}>
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
                <Text numberOfLines={2} className='text-[15px] text-[#FFFFFF] font-bold max-h-[200px] text-ellipsis'>{getYearFromDate(card.releaseDate)}</Text>
                <View className='rounded-full bg-[#FFFFFF] w-2 h-2 self-center' />
                <Text numberOfLines={2} className='text-[15px] text-[#FFFFFF] font-bold max-h-[200px] text-ellipsis'>{getGenreString(card.genreList[0])}</Text>
                {card.genreList.length > 1 && <View className='rounded-full bg-[#FFFFFF] w-2 h-2 self-center' />}
                {card.genreList.length > 1 && <Text numberOfLines={2} className='text-[15px] text-[#FFFFFF] font-bold max-h-[200px] text-ellipsis'>{getGenreString(card.genreList[1])}</Text>}
            </View>
          </View>
        )}}
        cardIndex={0}
        backgroundColor={'transparent'}
        stackSize={3}
        containerStyle={styles.swiperContainer}
      />}
      {swipeDirection === 'left' && <GradientWrapper side={Side.Left}>{}</GradientWrapper>}
      {swipeDirection === 'right' && <GradientWrapper side={Side.Right}>{}</GradientWrapper>}


      {loading || isFetching && <LoadingComponent mt={0} mb={0} ml={0} mr={0} />}
    </View>
  );
};

const styles = StyleSheet.create({
  rightIndicator: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
},
leftIndicator: {
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  backgroundColor: 'white',
  padding: 10,
  borderRadius: 10,
},
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
