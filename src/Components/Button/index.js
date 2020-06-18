import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableHighlight, Text, StyleSheet, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Button = props => {
  return (
    <TouchableHighlight
      onPress={() => alert('hey')}
      style={{borderRadius: 50}}
      onPress={() => props.onClick()}>
      <LinearGradient
        useAngle={true}
        angle={170}
        angleCenter={{x: 0.5, y: 0.5}}
        colors={['#FF7979', '#AF0065']}
        style={styles.linearGradient}>
        <Text style={styles.title}>{props.title}</Text>
      </LinearGradient>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    width: windowWidth * 0.7,
    height: 50,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 16,
  },
});

export default Button;
