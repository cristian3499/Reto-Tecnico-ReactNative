import React, { useState } from "react";
import { Text, View, FlatList, StyleSheet, Image, TouchableOpacity, Modal } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import TrackModal from "../components/TrackModal";
import Loading  from "../components/Loading";
import useTopTracks from '../hooks/useTopTracks';

const styles = StyleSheet.create({
    bgContainer: {
        paddingTop: 30,
        backgroundColor: '#1e325c',
        flex: 1
    },
    container: {
        flex: 1,
        padding: 16
    },
    card: {
        flexDirection: 'row',
        padding: 16,
        margin: 10,
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
    moreButton: {
        position: 'absolute',
        top: 8,
        right: 8
    },
    moreButtonText: {
        fontSize: 18,
        color: '#fff'
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
    playButton: {
        backgroundColor: 'tomato',
        padding: 8,
        borderRadius: 8,
        alignSelf: 'center'
    },
    playButtonText: {
        color: '#fff'
    }
});

const Home = () => {
    const { tracks, loading } = useTopTracks('mexico');
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedTrack, setSelectedTrack] = useState(null);

    const handlePlayPress = async (track) => {
        let currentTracks = JSON.parse(await AsyncStorage.getItem('recentlyPlayed')) || [];
        currentTracks = currentTracks.filter(t => t.url !== track.url);
        currentTracks.unshift(track);
        currentTracks = currentTracks.slice(0, 10);

        await AsyncStorage.setItem('recentlyPlayed', JSON.stringify(currentTracks));

        setSelectedTrack(track);
        setModalVisible(true);
    }

    if (loading) {
        return <Text> <Loading/> </Text>;
    }

    return (
        <View style={styles.bgContainer}>
            <FlatList
                data={tracks}
                keyExtractor={(item) => item.url}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handlePlayPress(item)} style={styles.card}>
                        <Image source={{ uri: item.image[2]["#text"] }} style={styles.image} />
                        <View style={styles.textContainer}>
                            <Text style={styles.trackName}>{item.name}</Text>
                            <Text style={styles.artistName}>{item.artist.name}</Text>
                        </View>
                        <View style={styles.moreButton}>
                            <Text style={styles.moreButtonText}>...</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
            {selectedTrack && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={() => {
                        setModalVisible(false);
                    }}>
                    <TrackModal track={selectedTrack} closeModal={() => setModalVisible(false)} />
                </Modal>
            )}
        </View>
    );
}

export default Home;
