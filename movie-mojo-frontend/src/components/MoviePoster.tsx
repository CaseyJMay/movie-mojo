import React, { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { View, Image, ActivityIndicator, Dimensions } from 'react-native';

interface MoviePosterProps {
  uri: string;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 0.75 * 16 / 9);
const imageWidth = dimensions.width * 0.75;

const MoviePoster: React.FC<MoviePosterProps> = ({ uri, isLoading, setIsLoading }) => {

  useEffect(() => {
    setIsLoading(true); // Set loading to true when URI changes
    console.log(`https://image.tmdb.org/t/p/w500${uri}`);
  }, [uri]);

  return (
    <View style={{ height: imageHeight, width: imageWidth, position: 'relative', alignSelf: 'center' }}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${uri}` }}
        style={{ height: imageHeight, width: imageWidth, opacity: isLoading ? 0 : 1 }}
        onLoad={() => setIsLoading(false)}
      />
    </View>
  );
};

export default MoviePoster;