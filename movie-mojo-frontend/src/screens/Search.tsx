import React, { useState, useEffect, useRef } from 'react';
import { Image, StyleSheet, View, Dimensions, TextInput } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import LoadingComponent from '../components/Loading';
import { GET_MOVIES_BY_SEARCH_TERM } from '../graphql/getMoviesBySearchTerm';
import { Movie } from '../types/types';
import { ScreenNavigationProps } from '../navigation/RootStackParamList';
import { GET_POPULAR_MOVIES } from '../graphql/getPopularMovies';
import NoResultsComponent from '../components/NoResults';

const screenWidth = Dimensions.get('window').width;

interface MovieWithDimensions extends Movie {
  width: number;
  height: number;
  onImageLoadStart: () => void;
  onImageLoadEnd: () => void;
}

const Search = () => {
  const [moviesWithDimensions, setMoviesWithDimensions] = useState<MovieWithDimensions[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchedMovies, setSearchedMovies] = useState<Movie[]>([]);
  const [debouncedSearchText, setDebouncedSearchText] = useState('');
  const [loadingImagesCount, setLoadingImagesCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);  // Reintroduce isLoading state
  const [isPopularLoading, setIsPopularLoading] = useState(false);
  const [isNoResults, setIsNoResults] = useState(false);
  const navigation = useNavigation<ScreenNavigationProps>();
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debounce = (func: () => void, delay: number) => {
    if (debounceTimeoutRef.current !== null) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(func, delay);
  };

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
    // setIsLoading(true); // Start loading after the debounce delay
    debounce(() => {
        setDebouncedSearchText(text);
        setLoadingImagesCount(0);
        setSearchedMovies([])
        setIsLoading(true); // Start loading after the debounce delay
    }, 300);
};

  const { loading, error, data } = useQuery(GET_MOVIES_BY_SEARCH_TERM, {
    variables: { searchTerm: debouncedSearchText },
    onError: (error) => console.log(JSON.stringify(error))
  });

  const { loading: popularMoviesLoading, error: popularMoviesError, data: popularMovies } = useQuery(GET_POPULAR_MOVIES, {
    onError: (error) => console.log(JSON.stringify(error))
  });

  useEffect(() => {
    if (data) {
      if (data.getMoviesBySearchTerm.length === 0 && debouncedSearchText != '') {
        setIsLoading(false); // Stop loading if no data
        setIsNoResults(true);
        return;
      }
      else {
        setIsNoResults(false);
      }
      if (debouncedSearchText != ''){
        const movieList = data.getMoviesBySearchTerm;
        setSearchedMovies(movieList);
      }
    }
  }, [data]);

  useEffect(() => {
    if ((popularMovies && debouncedSearchText == '' && searchText == '')) {
      const movieList = popularMovies.getPopularMovies;
      setSearchedMovies(movieList);
    }
  }, [popularMovies, debouncedSearchText]);

  useEffect(() => {
    if (loadingImagesCount == 0){
      setIsLoading(false)
    }
    else {
      setIsLoading(true)
    }
  }, [loadingImagesCount])

  useEffect(() => {
    if (!popularMovies || popularMovies.getPopularMovies.length == 0){
      setIsPopularLoading(true)
    }
    else {
      setIsPopularLoading(false)
    }
  }, [popularMovies])

  useEffect(() => {
    const loadImages = async () => {
      type ImageDimensions = {
        width: number;
        height: number;
      };
  
      const validMovies = searchedMovies.filter(movie => movie.posterPath);
  
      const loadedMovies: MovieWithDimensions[] = await Promise.all(
        validMovies.map(async (movie: Movie): Promise<MovieWithDimensions> => {
          const movieImage = `http://image.tmdb.org/t/p/original${movie.posterPath}`;
  
          try {
            const dimensions = await new Promise<ImageDimensions>((resolve, reject) => {
              Image.getSize(movieImage, (width, height) => {
                resolve({ width, height });
              }, reject);
            });
  
            return {
              ...movie,
              ...dimensions,
              onImageLoadStart: () => setLoadingImagesCount(prevCount => prevCount + 1),
              onImageLoadEnd: () => setLoadingImagesCount(prevCount => prevCount - 1),
            };
          } catch (error) {
            console.error("Error loading image:", movie.posterPath, error);
            return { 
              ...movie, 
              width: 0, 
              height: 0, 
              onImageLoadStart: () => setLoadingImagesCount(prevCount => prevCount + 0),
              onImageLoadEnd: () => setLoadingImagesCount(prevCount => prevCount - 0),
            };
          }
        })
      );
  
      setMoviesWithDimensions(loadedMovies);
    };
  
    loadImages();
  }, [searchedMovies]);

  const itemDimension = screenWidth / 2;

  return (
    <View style={styles.container}>
      <View className='h-fit w-full border-b border-b-[#D4AF37]'>
        <View style={styles.inputContainer}>
          <Ionicons name="ios-search" size={20} color="#D4AF37" style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            onChangeText={handleSearchTextChange}
            value={searchText}
            placeholder="Search for movies..."
            placeholderTextColor="#D4AF37"
          />
        </View>
      </View>
      <FlatGrid
        itemDimension={itemDimension}
        data={moviesWithDimensions}
        style={styles.gridView}
        spacing={0}
        renderItem={({ item }) => {
          const itemHeight = item.height / item.width * itemDimension;
          const movieImage = item.posterPath 
            ? { uri: `http://image.tmdb.org/t/p/original${item.posterPath}` }
            : require('../public/assets/Placeholder.png');

          return (
            <TouchableOpacity onPress={() => navigation.navigate('MoviePage', { uri: movieImage.uri ? movieImage.uri : '', title: item.title, description: item.description, genreList: item.genreList, releaseYear: item.releaseDate, streamingList: item.watchProviders ? item.watchProviders : [] })} style={[styles.itemContainer, { height: itemHeight }]}>
              <Image source={movieImage} style={styles.posterImage} onLoadStart={item.onImageLoadStart} onLoadEnd={item.onImageLoadEnd} />
            </TouchableOpacity>
          );
        }}
      />
      {(isLoading || isPopularLoading) && <LoadingComponent mt={106} ml={0} mr={0} mb={0} />}
      {isNoResults &&
      <NoResultsComponent mt={106} ml={0} mr={0} mb={0} />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  gridView: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    borderRadius: 0,
  },
  posterImage: {
    width: '100%',
    height: '100%',
    borderRadius: 0,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#D4AF37',
    marginTop: 40,
    marginBottom: 16,
    width: '70%',
    alignSelf: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: 15,
    zIndex: 1,
  },
  input: {
    flex: 1,
    height: 45,
    color: 'white',
    paddingLeft: 40,
    paddingRight: 10,
  },
});

export default Search;