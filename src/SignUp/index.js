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

const SignUp = props => {
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
              <Text style={{color: '#707070', fontSize: 16}}>БҮРТГҮҮЛЭХ</Text>
            </View>
            <View style={styles.center}>
              <Input title="Таны нэр" type="carNum" onActive={() => null} />
              <Input
                title="Утасны дугаар"
                type="number"
                onActive={() => null}
              />
              <Input title="Нууц үг" type="password" onActive={() => null} />
              <Input
                title="Нууц үг давтах"
                type="password"
                onActive={() => null}
              />
              <Input
                title="Тээврийн хэрэгслийн дугаар"
                type="carNum"
                onActive={() => null}
              />
              <View style={styles.nuuts}>
                <View style={styles.zuragOruulah}>
                  <Text style={styles.headTitle}>Зураг оруулах</Text>
                  <TouchableOpacity
                    style={{alignSelf: 'center', marginTop: '18%'}}>
                    <Icon
                      name="ios-add-circle-outline"
                      size={24}
                      color="#C4C4C4"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.buttons}>
              <Button
                title="БҮРТГҮҮЛЭХ"
                onClick={() => props.navigation.navigate('Login')}
              />
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Login')}>
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
    flex: 1,
    //backgroundColor: 'red',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 5,
    minHeight: 70,
  },

  center: {
    flex: 10,
    marginTop: 20,
    // backgroundColor: 'yellow',
    justifyContent: 'space-between',
  },
  head: {
    flex: 1,
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

export default SignUp;
