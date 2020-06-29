import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Button } from 'native-base';

import Counter from "react-native-counters"; //npm i react-native-counters --save

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
        marginBottom: -50,
    },
    slideDefault: {
      paddingVertical: 30,
      alignItems: 'center',
      backgroundColor: '#9DD6EB',
    },
    title: {
      paddingVertical: 10,
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

class DataComponent extends Component {
    onChangeNbRepetitions(number, type) {
        console.log(number, type)
        console.log("NbRepetitions")
        // this.props.sendRepetitions(number)
        this.props.sendData(number, 'NbRepetitions')
    }
    onChangeTimeExec(number, type) {
        console.log(number, type)
        console.log("TimeExec")
        // this.props.sendTimeExec(number)
        this.props.sendData(number, 'TimeExec')
    }
    onChangeTimeRest(number, type) {
        console.log(number, type)
        console.log("TimeRest")
        this.props.sendData(number, 'TimeRest')
        // this.props.sendRTimeRest(number)
    }
    render() {
        return (
            <Container>
                <View style={styles.main}>

                    <View style={styles.slideDefault}>
                        <Text style={{fontSize: 25}}>Number of Repetitions</Text>
                        <Counter
                        howMuchEachTime={1}
                        start={3} min={1} max={30}
                        buttonStyle={{borderColor: 'transparent', borderRadius:25}}
                        minusIcon={() => <Ionicons name="ios-remove-circle" color='#FF2D00' size={50}></Ionicons>}
                        plusIcon={() => <Ionicons name="ios-add-circle" color='#00FF36' size={50}></Ionicons>}
                        onChange={this.onChangeNbRepetitions.bind(this)}
                        ></Counter>
                    </View>

                    <View style={styles.slideDefault}>
                        <Text style={{fontSize: 25}}>Time for each exercise (in sec)</Text>
                        <Counter
                        howMuchEachTime={5}
                        start={45} min={20} max={600}
                        buttonStyle={{borderColor: 'transparent', borderRadius:25}}
                        minusIcon={() => <Ionicons name="ios-remove-circle" color='#FF2D00' size={50}></Ionicons>}
                        plusIcon={() => <Ionicons name="ios-add-circle" color='#00FF36' size={50}></Ionicons>}
                        onChange={this.onChangeTimeExec.bind(this)}
                        ></Counter>
                    </View>

                    <View style={styles.slideDefault}>
                        <Text style={{fontSize: 25}}>Time for each rest (in sec)</Text>
                        <Counter
                        howMuchEachTime={5}
                        start={15} min={5} max={300}
                        buttonStyle={{borderColor: 'transparent', borderRadius:25}}
                        minusIcon={() => <Ionicons name="ios-remove-circle" color='#FF2D00' size={50}></Ionicons>}
                        plusIcon={() => <Ionicons name="ios-add-circle" color='#00FF36' size={50}></Ionicons>}
                        onChange={this.onChangeTimeRest.bind(this)}
                        ></Counter>
                    </View>

                </View>

                <View style={{
                    alignItems: 'flex-end',
                    flexDirection: 'row-reverse',
                    backgroundColor: '#9DD6EB',
                }}>
                    <MaterialCommunityIcons name="timer" style={{color: 'white', fontSize: 55, paddingHorizontal: 20, marginBottom: 50}}></MaterialCommunityIcons>
                </View>
            </Container>
        );
    }
}

export default DataComponent;
