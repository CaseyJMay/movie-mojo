import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

interface MoviePosterProps {
  uri: string;
}

const screenWidth = Dimensions.get('window').width;
const numColumns = 3; // Change this based on how many posters you want in a row
const posterWidth = screenWidth / numColumns;
const aspectRatio = 1.5; // Adjust based on your posters' aspect ratio (height/width)
const posterHeight = posterWidth * aspectRatio;

const MoviePoster: React.FC<MoviePosterProps> = ({ uri }) => {
  const [expanded, setExpanded] = useState(false);

  const onPosterPress = () => {
    setExpanded(!expanded);
  };

  return (
    <TouchableOpacity onPress={onPosterPress}>
      <Image
        source={{ uri }}
        style={expanded ? styles.expandedPoster : styles.poster}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  poster: {
    width: posterWidth,
    height: posterHeight,
    margin: 0, // No margin to cover the full screen
  },
  expandedPoster: {
    width: posterWidth * 2, // Adjust expansion size as needed
    height: posterHeight * 2,
    position: 'absolute',
    zIndex: 1,
  },
});

export default MoviePoster;