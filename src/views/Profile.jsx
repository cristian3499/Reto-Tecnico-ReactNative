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
    profileHeader: {
        alignItems: 'center',
        marginVertical: 30,
        backgroundColor: '#2e436c',
        padding: 20,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    avatarContainer: {
        marginBottom: 15,
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    userStats: {
        fontSize: 14,
        color: '#ccc',
        marginTop: 5,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 15,
        marginTop: 10,
    },
    card: {
        flexDirection: 'row',
        padding: 12,
        marginBottom: 12,
        backgroundColor: '#2e436c',
        borderRadius: 12,
        alignItems: 'center'
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 6,
        marginRight: 12
    },
    textContainer: {
        flex: 1,
    },
    trackName: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold'
    },
    artistName: {
        color: '#aaa',
        fontSize: 13
    },
    playIcon: {
        fontSize: 24,
        color: 'tomato'
    },
    noSongsText: {
        color: '#ccc',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 40,
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
            <View style={styles.profileHeader}>
                <View style={styles.avatarContainer}>
                    <Icon name="user-circle" size={80} color="#fff" />
                </View>
                <Text style={styles.userName}>Melómano Pro</Text>
                <Text style={styles.userStats}>{lastPlayed.length} canciones recientemente</Text>
            </View>

            <Text style={styles.sectionTitle}>Mi Historial</Text>
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
