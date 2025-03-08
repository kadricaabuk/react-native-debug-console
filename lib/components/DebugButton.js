import React from 'react';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
function DebugButton({ onPress, style }) {
    const scale = React.useRef(new Animated.Value(1)).current;
    const animatedStyle = {
        transform: [{ scale }],
    };
    const handlePressIn = () => {
        Animated.spring(scale, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };
    const handlePressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };
    return (<Animated.View style={[styles.container, animatedStyle, style]}>
      <TouchableOpacity onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.button}>
        <Animated.Text style={styles.text}>DEBUG</Animated.Text>
      </TouchableOpacity>
    </Animated.View>);
}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        zIndex: 999,
    },
    button: {
        backgroundColor: '#007AFF',
        borderRadius: 25,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    text: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: 'bold',
    },
});
export default DebugButton;
