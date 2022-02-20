import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Checker = props => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => props.onPress(!props.remember)}>
      <View  style={styles.checkBox}>
      {props.remember && (
        <LinearGradient
          useAngle={true}
          angle={170}
          angleCenter={{x: 0.5, y: 0.5}}
          colors={['#FF7979', '#AF0065']}
          style={styles.linearGradient}
        />
      )}
        </View>
       <Text style={{color: '#707070', fontSize: 10}}>САНУУЛАХ</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBox: {
    borderWidth: 1,
    width: 24,
    height: 24,
    borderRadius: 20,
    borderColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  linearGradient: {
    width: 14,
    height: 14,
    borderRadius: 50,
    
  },
});

export default Checker;
