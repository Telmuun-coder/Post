import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableHighlight, Text, StyleSheet, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Button = props => {
  return (
    <TouchableHighlight
      disabled={props.disabled}
      style={[{borderRadius: 50}, props.disabled && styles.dis]}
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
    height: windowHeight * 0.065,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dis: {
    opacity: 0.5,
  },
  title: {
    color: 'white',
    fontSize: 16,
  },
});

export default Button;
