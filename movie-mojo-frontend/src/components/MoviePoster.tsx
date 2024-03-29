import React, { useState, useEffect } from 'react';
import { View, Image, ActivityIndicator, Dimensions } from 'react-native';

interface MoviePosterProps {
  uri: string;
}

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 0.75 * 16 / 9);
const imageWidth = dimensions.width * 0.75;

const MoviePoster: React.FC<MoviePosterProps> = ({ uri }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // setIsLoading(true); // Reset loading state when URI changes
    console.log(`${`https://image.tmdb.org/t/p/w500`}${uri}`)
  }, [uri]);

  return (
    <View className='self-center h-fit' style={{ height: imageHeight, width: imageWidth, position: 'relative' }}>
      {isLoading && (
        <ActivityIndicator size="large" color="#0000ff" style={{ position: 'absolute', top: '50%', left: '50%', transform: [{ translateX: -25 }, { translateY: -25 }] }} />
      )}
      <Image
        // source={`${`https://image.tmdb.org/t/p/w500/`}+ ${uri}`}
        source={{uri: `${`https://image.tmdb.org/t/p/w500`}+ ${uri}`}}
        className='self-center'
        style={{ height: imageHeight, width: imageWidth, opacity: isLoading ? 0 : 1, position: 'absolute', top: 0, left: 0 }}
        onLoad={() => setIsLoading(false)}
      />
    </View>
  );
};

export default MoviePoster;