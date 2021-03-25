import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../Components/Button';
import Input from '../Components/Input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

const windowHeight = Dimensions.get('window').height;

const ChangePass = props => {
  return (
    <SafeAreaView style={styles.containerView}>
      <StatusBar barStyle="white-content" />
      <KeyboardAvoidingView
        style={{flex: 1}}
        enabled
        keyboardVerticalOffset={100}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <KeyboardAwareScrollView
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={{height: windowHeight}}>
            <View style={styles.head}>
              <Text style={{color: '#707070', fontSize: 16}}>
                НУУЦ ҮГ СОЛИХ
              </Text>
            </View>
            <View style={styles.center}>
              <Input
                title="Шинэ нууц үг"
                type="password"
                onFocus={() => null}
              />
              <Input
                title="Шинэ нууц үг давтах"
                type="password"
                onFocus={() => null}
              />
              <Input
                title="Хуучин нууц үг"
                type="password"
                onFocus={() => null}
              />
            </View>
            <View style={styles.buttons}>
              <Button
                title="НУУЦ ҮГ СОЛИХ"
                onClick={() => props.navigation.goBack()}
              />
              <TouchableOpacity
                style={{marginTop: 50}}
                onPress={() => props.navigation.goBack()}>
                <Text style={{color: '#707070', fontSize: 12}}>
                  {'ЦУЦЛАХ'.toUpperCase()}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerView: {
    backgroundColor: 'white',
    flex: 1,
    // height: windowHeight,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },

  buttons: {
    flex: 3,
    // backgroundColor: 'red',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 5,
    minHeight: 70,
    paddingBottom: 200,
  },

  center: {
    flex: 3,
    marginTop: 20,
    // backgroundColor: 'yellow',
    justifyContent: 'space-between',
  },
  head: {
    flex: 2,
    // backgroundColor: 'gray',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headTitle: {
    color: '#BFBFBF',
    fontSize: 10,
    marginLeft: 20,
    marginTop: 5,
  },
  zuragOruulah: {
    backgroundColor: '#F7F7F7',
    height: 150,
    borderRadius: 20,
    marginBottom: 40,
  },
});

export default ChangePass;
