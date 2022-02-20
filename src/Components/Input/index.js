import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, TextInput} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Input = props => {
  const [val, setVal] = useState(props.value ? props.value : '');
  return (
    <View style={[styles.inputContainer, props.danger && styles.danger, props.style && props.style]}>
      <Text style={styles.type}>{props.title}</Text>
      <TextInput
        onFocus={() => {
          props.onFocus();
          props.onChange(val);
        }}
        // onBlur={() => console.log('focus lost')}
        onChangeText={e => {
          props.onChange(e);
          setVal(e);
        }}
        placeholder={props.placeHolder ? props.placeHolder : null}
        style={styles.input}
        maxLength={props.type === 'number' ? 12 : 16}
        autoCorrect={false}
        autoFocus={props.focus}
        value={val}
        keyboardType={props.type === 'number' ? 'phone-pad' : 'default'}
        secureTextEntry={props.type === 'password' ? true : false}
        autoCapitalize={props.autoCapitalize ? props.autoCapitalize : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    // marginBottom: 30,
    backgroundColor: '#F7F7F7',
    width: windowWidth * 0.7,
    height: windowHeight * 0.065,
    paddingTop: 3,
    paddingHorizontal: 20,
    marginBottom: 20,
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
  danger: {borderWidth: 0.5, borderColor: 'red'},
});

export default Input;
