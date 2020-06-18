import React, {useState} from 'react';
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
import Check from '../Components/Check';
const windowHeight = Dimensions.get('window').height;

const Login = props => {
  const [head, headTogle] = useState(true);
  return (
    <SafeAreaView style={styles.containerView}>
      <StatusBar barStyle="white-content" />
      {true && <View style={styles.head} />}
      <View style={styles.center}>
        <View style={{justifyContent: 'space-between', flex: 2}}>
          <Input title="Нэвтрэх дугаар" type="number" onActive={() => null} />
          <Input title="Нууц үг" type="password" onActive={() => null} />
        </View>
        <View style={styles.nuutsInside}>
          <View style={styles.nuuts}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Check />
              <Text style={{color: '#707070', fontSize: 10}}>
                {'Сануулах'.toUpperCase()}
              </Text>
            </View>
            <TouchableOpacity>
              <Text style={{color: '#707070', fontSize: 10}}>
                {'Нууц үг мартсан'.toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.buttons}>
        <Button
          title="НЭВТРЭХ"
          onClick={() => props.navigation.navigate('Navi')}
        />
        <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')}>
          <Text style={{color: '#707070', fontSize: 12}}>
            {'Бүртгүүлэх'.toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  head: {
    flex: 7,
    // backgroundColor: 'black',
    //height: 100,
    width: '100%',
  },
  containerView: {
    backgroundColor: 'white',
    flex: 1,
    // height: windowHeight,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  nuuts: {
    marginTop: 20,
    flexDirection: 'row',
    // backgroundColor: 'yellow',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nuutsInside: {
    flex: 2,
    // backgroundColor: 'red',
  },
  buttons: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 100,
    minHeight: 80,
  },
  center: {
    flex: 2,
    // backgroundColor: 'green',
    justifyContent: 'space-between',
    minHeight: 220,
  },
});

export default Login;
