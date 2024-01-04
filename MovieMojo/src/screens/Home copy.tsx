import React, { useState, useRef, useEffect } from 'react';
import {
  Image,
  Text,
  View,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { movies } from '../mockData';

const { width } = Dimensions.get('window');

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    console.log(currentIndex);
  }, [currentIndex]);

  const translateX = useRef(new Animated.Value(0)).current;
  const [nextIndex, setNextIndex] = useState(currentIndex + 1);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      translateX.setValue(gestureState.dx);
    },
    onPanResponderRelease: (event, gestureState) => {
      if (gestureState.dx < -width / 4 && currentIndex < movies.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setNextIndex(nextIndex + 1);

        Animated.timing(translateX, {
          toValue: -width,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          translateX.setValue(0);
        });
      } else {
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  useEffect(() => {
    if (nextIndex < movies.length) {
      Image.prefetch(movies[nextIndex].image);
    }
  }, [nextIndex]);

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={{
          flex: 1,
          flexDirection: 'row',
          transform: [{ translateX }],
        }}
        {...panResponder.panHandlers}
      >
        <Image
          style={{
            flex: 1,
            resizeMode: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          source={{ uri: movies[currentIndex].image }}
        />

        {/* Next Image (Preloaded) */}
        {nextIndex < movies.length && (
          <Image
            style={{
              flex: 1,
              resizeMode: 'cover',
              position: 'absolute',
              top: 0,
              left: width,
              width: width, // Make the next poster same width as the screen
              right: 0,
              bottom: 0,
            }}
            source={{ uri: movies[nextIndex].image }}
          />
        )}

        {/* Overlay for Current Poster */}
        <LinearGradient
          colors={['transparent', 'black']}
          style={{
            flex: 1,
            position: 'absolute',
            top: 0,
            left: 0,
            right: -width,
            bottom: 0,
          }}
          start={[0.5, 0]}
          end={[0.5, 1]}
        />

        {/* Current Text */}
        <Text
          style={{
            position: 'absolute',
            bottom: 20,
            left: 5,
            color: 'white',
            fontSize: 30,
            fontWeight: 'bold',
          }}
        >
          {movies[currentIndex].title}
        </Text>
      </Animated.View>
    </View>
  );
}