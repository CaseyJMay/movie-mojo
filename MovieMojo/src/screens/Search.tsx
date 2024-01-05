import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, Dimensions, TextInput } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { movies } from '../mockData';
import { Movie } from '../types/types';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons

const screenWidth = Dimensions.get('window').width;

interface MovieWithDimensions extends Movie {
  width: number;
  height: number;
}

const Search = () => {
  const [moviesWithDimensions, setMoviesWithDimensions] = useState<MovieWithDimensions[]>([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const loadImages = async () => {
        // Define a type for the dimensions
        type ImageDimensions = {
          width: number;
          height: number;
        };
      
        const loadedMovies: MovieWithDimensions[] = await Promise.all(
          movies.map(async (movie): Promise<MovieWithDimensions> => {
            try {
              const dimensions = await new Promise<ImageDimensions>((resolve, reject) => {
                Image.getSize(movie.image, (width, height) => {
                  resolve({ width, height });
                }, reject);
              });
      
              return {
                ...movie,
                ...dimensions,
              };
            } catch (error) {
              console.error("Error loading image:", movie.image, error);
              return { ...movie, width: 0, height: 0 }; // Fallback for images that failed to load
            }
          })
        );
      
        setMoviesWithDimensions(loadedMovies);
      };

    loadImages();
  }, []);

  const itemDimension = screenWidth / 2;

  return (
    <View style={styles.container}>
      <View className='h-fit w-full border-b border-b-[#D4AF37]'>
      <View style={styles.inputContainer}>
        <Ionicons name="ios-search" size={20} color="#D4AF37" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          onChangeText={setSearchText}
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
          return (
            <View style={[styles.itemContainer, { height: itemHeight }]}>
              <Image source={{ uri: item.image }} style={styles.posterImage} />
            </View>
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
    marginTop: 30,
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