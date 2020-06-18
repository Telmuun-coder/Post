import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Checker = props => {
  const [fill, setFill] = useState(true);
  return (
    <View
      style={styles.checkBox}
      onStartShouldSetResponder={() => setFill(fill ? false : true)}>
      {fill && (
        <LinearGradient
          useAngle={true}
          angle={170}
          angleCenter={{x: 0.5, y: 0.5}}
          colors={['#FF7979', '#AF0065']}
          style={styles.linearGradient}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
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
