import React, {ReactNode} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export enum Side {
    Left = 'left',
    Right = 'right',
    Top = 'top',
    Bottom = 'bottom'
}

type GradientWrapperProps = {
    children: React.ReactNode
    side: Side
}

const GradientWrapper = ({ children, side }: GradientWrapperProps ) => {
  return (
    <View style={styles.container}>
    { side == Side.Left ?
      <LinearGradient
        colors={['#80002090', 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: .5, y: 0 }}
        style={styles.gradientStyle}
      >
        {children}
      </LinearGradient> :
      <LinearGradient
            colors={['#D4AF3790', 'transparent']}
            start={{ x: 1, y: 0 }}
            end={{ x: .5, y: 0 }}
            style={styles.gradientStyle}
            >
            {children}
       </LinearGradient> 
    }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientStyle: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default GradientWrapper;