import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

// import { Container, Content, Header, Item, Input, Button } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
    slideDefault: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB',
    },
    text: {
      color: 'white',
      fontSize: 30,
      fontWeight: 'bold',
    },
});

class TimerComponent extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{
                    flex: 1, justifyContent: 'space-between'
                }}>

                    <View style={styles.slideDefault}>
                        <Text style={styles.text}>Timer</Text>
                    </View>
                    <View style={{
                        alignItems: 'flex-end',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 10,
                        marginBottom: 15

                    }}>
                        <Ionicons name='ios-stats' style={{
                            color: 'white', fontSize: 55, paddingHorizontal: 10, marginBottom: 35
                        }}></Ionicons>
                        <View style={{alignItems:'center'}}>
                            <MaterialCommunityIcons name="circle-outline" style={{
                                color: 'transparent', fontSize: 200
                            }}></MaterialCommunityIcons>
                        </View>
                        <Ionicons name='ios-settings' style={{
                            color: 'white', fontSize: 55, paddingHorizontal: 10, marginBottom: 35
                        }}></Ionicons>
                    </View>

                </View>
            </View>
        );
    }
}

export default TimerComponent;

