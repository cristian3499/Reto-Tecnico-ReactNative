import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1e325c',
        flex: 1,
        padding: 16
    },
    header: {
        fontSize: 24,
        color: '#fff',
        textAlign: 'center',
        marginVertical: 20
    },
    card: {
        flexDirection: 'row',
        padding: 16,
        marginBottom: 16,
        backgroundColor: '#2e436c',
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        position: 'relative'
    },
    image: {
        width: 60,
        height: 60,
        marginRight: 16,
        borderRadius: 8
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    trackName: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    artistName: {
        color: 'gray'
    },
    playIcon: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        fontSize: 30,
        color: '#fff'
    },
    noSongsText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        fontStyle: 'italic'
    }
});

const Profile = () => {
    const [lastPlayed, setLastPlayed] = useState([]);

    const fetchLastPlayed = useCallback(async () => {
        const tracks = JSON.parse(await AsyncStorage.getItem('recentlyPlayed')) || [];
        setLastPlayed(tracks);
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchLastPlayed();
            return () => {}; 
        }, [fetchLastPlayed])
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Mi Perfil</Text>
            <Text style={styles.header}>Últimas canciones reproducidas</Text>
            {lastPlayed.length === 0 ? (
                <Text style={styles.noSongsText}>¡Vamos! Anímate a escuchar algo 🎶</Text>
            ) : (
                <FlatList
                    data={lastPlayed}
                    keyExtractor={(item) => item.url}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Image source={{ uri: item.image[2]["#text"] }} style={styles.image} />
                            <View style={styles.textContainer}>
                                <Text style={styles.trackName}>{item.name}</Text>
                                <Text style={styles.artistName}>{item.artist.name}</Text>
                            </View>
                            <Icon name="play-circle" style={styles.playIcon} />
                        </View>
                    )}
                />
            )}
        </View>
    );
}

export default Profile;
