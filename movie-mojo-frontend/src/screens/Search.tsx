import React, { useState, useEffect, useRef } from 'react';
import { Image, StyleSheet, View, Dimensions, TextInput } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { movies } from '../mockData';
import { Movie } from '../types/types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { GET_MOVIES_BY_SEARCH_TERM } from '../graphql/getMoviesBySearchTerm';
import { useQuery } from '@apollo/client';
import { ScreenNavigationProps } from '../navigation/RootStackParamList';

const screenWidth = Dimensions.get('window').width;

interface MovieWithDimensions extends Movie {
  width: number;
  height: number;
}

const Search = () => {
  const [moviesWithDimensions, setMoviesWithDimensions] = useState<MovieWithDimensions[]>([]);
  const [searchText, setSearchText] = useState(''); // State for search bar input
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [debouncedSearchText, setDebouncedSearchText] = useState(''); // State for debounced query
  const navigation = useNavigation<ScreenNavigationProps>();
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debounce = (func: () => void, delay: number) => {
    if (debounceTimeoutRef.current !== null) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(func, delay);
  };

  const handleSearchTextChange = (text: string) => {
    setSearchText(text); // Update the searchText immediately
    debounce(() => setDebouncedSearchText(text), 1000); // Update debouncedSearchText after a delay
  };

  const { loading, error, data } = useQuery(GET_MOVIES_BY_SEARCH_TERM, {
    variables: { searchTerm: debouncedSearchText },
    onError: (error) => console.log(JSON.stringify(error))
  });

  useEffect(() => {
    if (data) {
      if (data.getMoviesBySearchTerm.length === 0) {
        return;
      }
      const movieList = data.getMoviesBySearchTerm;
      setSearchedMovies(movieList);
    }
  }, [data]);

  useEffect(() => {
    const loadImages = async () => {
      type ImageDimensions = {
        width: number;
        height: number;
      };

      const loadedMovies: MovieWithDimensions[] = await Promise.all(
        searchedMovies.map(async (movie: Movie): Promise<MovieWithDimensions> => {
          const movieImage = movie.posterPath ? `http://image.tmdb.org/t/p/original${movie.posterPath}` : `http://image.tmdb.org/t/p/original/9GBhzXMFjgcZ3FdR9w3bUMMTps5.jpg`;
          try {
            const dimensions = await new Promise<ImageDimensions>((resolve, reject) => {
              Image.getSize(movieImage, (width, height) => {
                resolve({ width, height });
              }, reject);
            });

            return {
              ...movie,
              ...dimensions,
            };
          } catch (error) {
            console.error("Error loading image:", movie.posterPath, error);
            return { ...movie, width: 0, height: 0 };
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
              <Image source={movieImage} style={styles.posterImage} />
            </TouchableOpacity>
          );
        }}
      />
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
    paddingLeft: 40, // Adjust the padding to ensure text does not overlap the icon
    paddingRight: 10,
  },
});

export default Search;