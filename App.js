import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Container } from 'native-base';
import Swiper from 'react-native-swiper';

import Timer from './Components/Timer';
import Data from './Components/Data';

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

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      NbRepetitions: 3,
      TimeExec: 45,
      TimeRest: 15
    };
    this.getNbRepetitions = this.getNbRepetitions.bind(this)
    this.getTimeExec = this.getTimeExec.bind(this)
    this.getTimeRest = this.getTimeRest.bind(this)

  }
  getNbRepetitions(nbRep) {
    this.setState({
      NbRepetitions: nbRep
    })
  }
  getTimeExec(timeExec) {
    this.setState({
      TimeExec: timeExec
    })
  }
  getTimeRest(timeRest) {
    this.setState({
      TimeRest: timeRest
    })
  }

  render() {
    return (
      <Container>
          <Swiper
          loop={false}
          showsPagination={false}
          index={1}
          >

            <View style={styles.slideDefault}>
              <Data sendRepetitions={this.getNbRepetitions} sendTimeExec={this.getTimeExec} sendTimeRest={this.getTimeRest} ></Data>
            </View>

            <View style={styles.slideDefault}>
              <Timer NbRepetitions={this.state.NbRepetitions} TimeExec={this.state.TimeExec} TimeRest={this.state.TimeRest}></Timer>
            </View>

            <View style={styles.slideDefault}>
              <Text style={styles.text}>Settings</Text>
            </View>

          </Swiper>
      </Container>
    );
  }
}

