import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// import { Container, Content, Header, Item, Input, Button } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Easing } from "react-native-reanimated";
import { Audio } from 'expo-av';
import Button from 'apsl-react-native-button';
// const Sound = require('react-native-sound');

const styles = StyleSheet.create({
    slideDefault: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 270
    //   backgroundColor: '#9DD6EB',
    },
    text: {
      color: 'white',
      fontSize: 30,
      fontWeight: 'bold',
    },
});

class TimerComponent extends Component {

    constructor(props) {
        super(props);
        this.playbackInstance = null;
        this.state = {
            timer: 0,
            status: "",
            counterRepetitions: 0,
            isActive: false,
        };
        this.toogle = this.toogle.bind(this)
        this.resetTimer = this.resetTimer.bind(this)
        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: false,
        });
    }
    componentDidMount() {
        // this._loadNewPlaybackInstance(true);
        setInterval( () => this.tick(), 1000)
    }
    // componentWillUnmount() {
    //     this.playbackInstance.unloadAsync();
    // }
    async _loadNewPlaybackInstance(playing) {
        if (this.playbackInstance != null) {
            await this.playbackInstance.unloadAsync();
            this.playbackInstance.setOnPlaybackStatusUpdate(null);
            this.playbackInstance = null;
        }
        const source = require('../assets/whistle.mp3');
        const initialStatus = {
            shouldPlay: true,
            rate: 5.0,
            shouldCorrectPitch: true,
            volume: 1.0,
            isMuted: false,
        };
        const { sound, status } = await Audio.Sound.createAsync(
            source,
            initialStatus
        );
        this.playbackInstance = sound;
        this.playbackInstance.playAsync();
    }
    async _loadNewPlaybackInstanceBell(playing) {
        if (this.playbackInstance != null) {
            await this.playbackInstance.unloadAsync();
            this.playbackInstance.setOnPlaybackStatusUpdate(null);
            this.playbackInstance = null;
        }
        const source = require('../assets/bell.mp3');
        const initialStatus = {
            shouldPlay: true,
            rate: 1.0,
            shouldCorrectPitch: true,
            volume: 0.8,
            isMuted: false,
        };
        const { sound, status } = await Audio.Sound.createAsync(
            source,
            initialStatus
        );
        this.playbackInstance = sound;
        this.playbackInstance.playAsync();
    }
    async _loadNewPlaybackInstanceFinish(playing) {
        if (this.playbackInstance != null) {
            await this.playbackInstance.unloadAsync();
            this.playbackInstance.setOnPlaybackStatusUpdate(null);
            this.playbackInstance = null;
        }
        const source = require('../assets/finish.mp3');
        const initialStatus = {
            shouldPlay: true,
            rate: 1.0,
            shouldCorrectPitch: true,
            volume: 0.8,
            isMuted: false,
        };
        const { sound, status } = await Audio.Sound.createAsync(
            source,
            initialStatus
        );
        this.playbackInstance = sound;
        this.playbackInstance.playAsync();
    }
    tick() {
        if (this.state.isActive && this.state.timer == 0 && this.state.status == "") {
            this._loadNewPlaybackInstance(true);
            this.setState({
                timer: this.props.TimeExec,
                status: "Exec"
            })
        }
        if (this.state.isActive) {
            this.setState({
                timer: this.state.timer - 1
            })
            this.checkStatus(this.state.status, this.state.timer)
        }
    }
    checkStatus(status, timer) {
        if (status == "Exec" && timer <= 0) {
            this._loadNewPlaybackInstanceBell(true);
            this.setState({
                timer: this.props.TimeRest,
                status: "Rest"
            })
        }
        if (status == "Rest" && timer <= 0) {
            if (this.state.counterRepetitions + 1 < this.props.NbRepetitions) {
                this._loadNewPlaybackInstance(true);
            }
            this.setState({
                timer: this.props.TimeExec,
                status: "Exec",
                counterRepetitions: this.state.counterRepetitions + 1
            })
        }
        if (this.state.counterRepetitions >= this.props.NbRepetitions) {
            this._loadNewPlaybackInstanceFinish(true);
            this.resetTimer()
        }
    }
    toogle() {
        console.log("Je start DD")
        this.setState({
            isActive: !this.state.isActive
        })
        this.state.isActive = !this.state.isActive
    }
    resetTimer() {
        console.log("coucou\n")
        this.state.timer = 0
        this.state.status = ""
        this.state.counterRepetitions = 0
        this.state.isActive = false
        this.setState({
            timer: 0,
            status: "",
            counterRepetitions: 0,
            isActive: false,
        })
    }
    getDuration() {
        if (this.state.status == "Exec") {
            return this.props.TimeExec
        }
        else if (this.state.status == "Rest") {
            return this.props.TimeRest
        }
        return 0
    }
    calcCircleProgressBar() {
        if (this.state.status == "Exec") {
            return ((this.state.timer * 100) / this.props.TimeExec);
        } else if (this.state.status == "Rest") {
            return ((this.state.timer * 100) / this.props.TimeRest);
        } else {
            return 0;
        }
    }
    timerButton() {
        if (this.state.isActive) {
            return {
                fontWeight: 'bold',
                color: '#FF2D00',
                fontSize: 50
            }
        } else {
            return {
                fontWeight: 'bold',
                color: '#00FF36',
                fontSize: 50
            }
        }
    }
    render() {
        // const { NbRepetitions, TimeExec, TimeRest } = this.props;
        return (
            <View style={{flex: 1}}>

                <View style={styles.slideDefault}>
                    <AnimatedCircularProgress
                    ref={(ref) => this.circularProgress = ref}
                    size={250}
                    width={25}
                    rotation={0}
                    fill={this.calcCircleProgressBar()}
                    tintColor="#00e0ff"
                    backgroundColor="#3d5875">
                    {
                        (fill) => (
                            <Text style={styles.text}>
                                {this.state.timer}
                            </Text>
                        )
                    }
                    </AnimatedCircularProgress>
                    <View style={{justifyContent: 'center',
      alignItems: 'center', paddingVertical: 80}}>

                        <TouchableOpacity onPress={this.toogle}>
                            <Text style={this.timerButton()}>{this.state.isActive ? 'Pause': 'Start'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{paddingVertical: 10}} onPress={this.resetTimer}>
                            <Text style={{fontWeight: 'bold',
                    color: 'grey',
                    fontSize: 30}}>Reset</Text>
                        </TouchableOpacity>

                    </View>
                    {/* <Button onPress={this.toogle}>
                        <Text style={this.timerButton()}>{this.state.isActive ? 'Pause': 'Start'}</Text>
                    </Button>
                    <Button onPress={this.resetTimer} textStyle={{fontSize: 30, color:'grey'}}>
                        Reset
                    </Button> */}
                    {/* <View style={{marginTop:100}}>
                        <Button title="Reset" onPress={this.resetTimer}></Button>
                    </View> */}
                </View>
                <View style={{
                    alignItems: 'flex-end',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                    marginBottom: 15
                }}>
                    <Ionicons name='ios-stats' style={{
                        color: 'black', fontSize: 55, paddingHorizontal: 10, marginBottom: 35
                    }}></Ionicons>
                    <View style={{alignItems:'center'}}>
                        <MaterialCommunityIcons name="circle-outline" style={{
                            color: 'transparent', fontSize: 200
                        }}></MaterialCommunityIcons>
                    </View>
                    <Ionicons name='ios-settings' style={{
                        color: 'black', fontSize: 55, paddingHorizontal: 10, marginBottom: 35
                    }}></Ionicons>
                </View>

            </View>
        );
    }
}

export default TimerComponent;

