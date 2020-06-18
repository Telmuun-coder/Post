import React from 'react';
import {View, Text, StyleSheet, Dimensions, TextInput} from 'react-native';

const windowWidth = Dimensions.get('window').width;

const Input = props => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.type}>{props.title}</Text>
      <TextInput
        onFocus={() => props.onActive()}
        onBlur={() => console.log('focus lost')}
        onChangeText={e => props.onChange(e)}
        style={styles.input}
        maxLength={props.type === 'number' ? 12 : 16}
        autoCorrect={false}
        autoFocus={props.focus}
        keyboardType={props.type === 'number' ? 'phone-pad' : 'default'}
        secureTextEntry={props.type === 'password' ? true : false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    // marginBottom: 30,
    backgroundColor: '#F7F7F7',
    width: windowWidth * 0.7,
    height: 50,
    paddingTop: 3,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  type: {
    color: '#BFBFBF',
    fontSize: 10,
  },
  input: {
    height: 30,
    fontSize: 16,
    padding: 0,
    paddingBottom: 5,
  },
});

export default Input;
