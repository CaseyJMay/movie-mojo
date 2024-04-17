import React from 'react';
import { StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export enum Side {
    Left = 'left',
    Right = 'right',
    Top = 'top',
    Bottom = 'bottom'
}

type GradientWrapperProps = {
    children: React.ReactNode;
    side: Side;
    style?: Animated.AnimatedProps<StyleSheet.NamedStyles<any>>; // Include style prop for animation
}

const GradientWrapper = ({ children, side, style }: GradientWrapperProps ) => {
    const isLeftSide = side === Side.Left;
    const colors = isLeftSide ? ['#800020', 'transparent'] : ['#D4AF37', 'transparent'];
    const start = isLeftSide ? { x: 0, y: 0 } : { x: 1, y: 0 };
    const end = isLeftSide ? { x: 0.3, y: 0 } : { x: 0.7, y: 0 };

    return (
        <Animated.View style={[styles.container, style]}>
            <LinearGradient
                colors={colors}
                start={start}
                end={end}
                style={styles.gradientStyle}
            >
                {children}
            </LinearGradient>
        </Animated.View>
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