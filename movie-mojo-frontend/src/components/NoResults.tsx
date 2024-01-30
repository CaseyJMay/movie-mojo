import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type NoResultsComponentProps = {
    mt: number;
    mb: number;
    ml: number;
    mr: number;
}

const NoResultsComponent = ({ mt, mb, ml, mr }: NoResultsComponentProps) => {
  return (
    <View style={{...styles.container, top: mt, bottom: mb, left: ml, right: mr}}>
      <Text className='font-bebas' style={styles.text}>No search results</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'rgba(0, 0, 0, 0.99)',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
      position: 'absolute',
    },
    text: {
      color: 'white',
      fontSize: 24,
      // Add any additional styling for the text if needed
    },
});

export default NoResultsComponent;