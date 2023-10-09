import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#1e325c',
    },
    playerContainer: {
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        padding: 20,
        height: '88%',
        alignItems: 'center',
    },
    image: {
        width: 290,
        height: 340,
        marginBottom: 10,
        borderRadius: 50,
    },
    trackName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10
    },
    artistName: {
        color: 'gray',
        marginTop: 5
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
    },
    slider: {
        width: '80%',
        marginTop: 20,
    },
    sliderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
    },
    timeText: {
        fontSize: 16,
    },
    controlsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginTop: 20
    },
    controlButton: {
        padding: 10
    },
    controlIcon: {
        fontSize: 30
    },
    topContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#1e325c',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    playingFromText: {
        color: 'white',
        fontSize: 12,
        color: 'gray'
    },
    pollInfoText: {
        fontWeight: '600',
        color: 'white',
        fontSize: 14,
        marginTop: 5
    },
    closeButtonTop: {
        position: 'absolute',
        right: 10,
        top: 10
    },
    closeIcon: {
        fontSize: 30,
        color: 'white'
    },
});

const TrackModal = ({ track, closeModal }) => {
    const [sliderValue, setSliderValue] = useState(0);

    return (
        <View style={styles.modalView}>
            <View style={styles.topContainer}>
                <Text style={styles.playingFromText}>Playing from</Text>
                <Text style={styles.pollInfoText}>Poll Top Tracks this week All Genders</Text>

                <TouchableOpacity onPress={closeModal} style={styles.closeButtonTop}>
                    <Icon name="angle-down" style={styles.closeIcon} />
                </TouchableOpacity>
            </View>

            <View style={styles.playerContainer}>
                <Image source={{ uri: track.image[3]["#text"] }} style={styles.image} />
                <Text style={styles.trackName}>{track.name}</Text>
                <Text style={styles.artistName}>{track.artist.name}</Text>

                <View style={styles.sliderContainer}>
                    <Text style={styles.timeText}>{Math.floor(sliderValue / 60)}:{('0' + Math.floor(sliderValue % 60)).slice(-2)}</Text>
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={240}
                        value={sliderValue}
                        onValueChange={setSliderValue}
                        minimumTrackTintColor="#899528"
                        maximumTrackTintColor="#000000"
                    />
                    <Text style={styles.timeText}>{Math.floor((240 - sliderValue) / 60)}:{('0' + Math.floor((240 - sliderValue) % 60)).slice(-2)}</Text>
                </View>

                <View style={styles.controlsContainer}>
                    <TouchableOpacity style={styles.controlButton}>
                        <Icon name="backward" style={styles.controlIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.controlButton}>
                        <Icon name="pause" style={styles.controlIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.controlButton}>
                        <Icon name="forward" style={styles.controlIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default TrackModal;