import React from 'react';
import { View, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';

const window = Dimensions.get('window');

const Loading = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#1e325c" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.width,
        height: window.height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    }
});

export default Loading;
