import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, ActivityIndicator, Image } from 'react-native';

import { Container } from 'native-base';
import Swiper from 'react-native-swiper';
import AppIntroSlider from 'react-native-app-intro-slider';

import Timer from './Components/Timer';
import Data from './Components/Data';

import { LinearGradient } from 'expo-linear-gradient';

const slides = [
  {
    key: 1,
    title: 'Thanks Downloading\n\nSportTimer',
    text: '',
    image: require('./assets/intro1.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: 'Sport Timer',
    text: 'Will help you to improve your regularity\nin your training',
    image: require('./assets/intro2.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 3,
    title: 'App in Beta',
    text: 'Now, sport us !',
    image: require('./assets/intro3.png'),
    backgroundColor: '#19B1F0',
  }
];

const styles = StyleSheet.create({
  slideDefault: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#9DD6EB',
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

const style_slide = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain'
  },
  text: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 30,
  },
  title: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false,
      loading: true,
      NbRepetitions: 3,
      TimeExec: 45,
      TimeRest: 15
    };
    this.getData = this.getData.bind(this)

  }

  componentDidMount() {
    AsyncStorage.getItem('first_time').then((value) => {
      this.setState({ showRealApp: !!value, loading: false});
    })
  }

  _onDone = () => {
    AsyncStorage.setItem('first_time', 'true').then(() => {
      this.setState({ showRealApp: true});
      // this.props.navigation.navigation('Home');
    });
  };

  _onSkip = () => {
    AsyncStorage.setItem('first_time', 'true').then(() => {
      this.setState({ showRealApp: true });
        // this.props.navigation.navigate('Home');
    });
  };

  getData(nb, type) {
    if (type == 'NbRepetitions') {
      this.setState({
        NbRepetitions: nb
      });
    }
    if (type == 'TimeExec') {
      this.setState({
        TimeExec: nb
      });
    }
    if (type == 'TimeRest') {
      this.setState({
        TimeRest: nb
      });
    }
  }
  _renderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 100
        }}>
        <Text style={style_slide.title}>{item.title}</Text>
        <Image style={style_slide.image} source={item.image} />
        <Text style={style_slide.text}>{item.text}</Text>
      </View>
    );
  }
  render() {
    if (this.state.showRealApp) {
      return (
        <Container>
          <LinearGradient colors={['#5E9DD7', '#6785C6', '#4c669f', '#3b5998', '#192f6a']} style={{flex:1}}>

            <Swiper
            loop={false}
            showsPagination={false}
            index={1}
            >

              <View style={styles.slideDefault}>
                <Data sendData={this.getData}></Data>
              </View>

              <View style={styles.slideDefault}>
                <Timer NbRepetitions={this.state.NbRepetitions} TimeExec={this.state.TimeExec} TimeRest={this.state.TimeRest}></Timer>
              </View>

              <View style={styles.slideDefault}>
                <Text style={styles.text}>Settings In Development</Text>
              </View>

            </Swiper>
          </LinearGradient>
        </Container>
      );
    } else {
      return (
        <Container>
          <AppIntroSlider
          renderItem={this._renderItem}
          data={slides}
          onDone={this._onDone}
          />
        </Container>
      )
    }
  }
}

