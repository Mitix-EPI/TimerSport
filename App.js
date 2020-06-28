import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Container, Content } from 'native-base';
import Swiper from 'react-native-swiper';
import Timer from './Components/Timer.js';

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
  render() {
    return (
      <Container>
          <Swiper
          loop={false}
          showsPagination={false}
          index={1}
          >

            <View style={styles.slideDefault}>
              <Text style={styles.text}>Data</Text>
            </View>

            <View style={styles.slideDefault}>
              <Timer></Timer>
            </View>

            <View style={styles.slideDefault}>
              <Text style={styles.text}>Settings</Text>
            </View>

          </Swiper>
      </Container>
    );
  }
}

