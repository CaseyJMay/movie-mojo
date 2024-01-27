import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

type LoadingComponentProps = {
    mt: number,
    mb: number,
    ml: number,
    mr: number,
}

const LoadingComponent = ({mt, mb, ml, mr}: LoadingComponentProps) => {
  return (
    <View style={{backgroundColor: 'rgba(0, 0, 0, 0.99)', alignItems: 'center', justifyContent: 'center', zIndex: 1, position: "absolute", left: ml, right: mr, top: mt, bottom: mb}}>
      <Image
        source={require('../public/assets/loading.gif')}
        style={styles.gif}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    gif: {
      width: 61,
      height: 61,
    },
  });
export default LoadingComponent;