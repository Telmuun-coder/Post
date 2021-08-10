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
import {AuthContext} from '../Components/AuthContext.js';
import Loader from '../Components/Loader';
import { request } from '../../tools';
import AsyncStorage from '@react-native-community/async-storage';
const windowHeight = Dimensions.get('window').height;

const Login = props => {
  const [head, headTogle] = useState(true);
  const {login} = React.useContext(AuthContext);
  const [phoneNumber, setPhoneNumber] = useState('99882753');
  const [password, setPassword] = useState('pass');
  const [loader, setLoader] = useState(false);

  const newLogin = async () => {
    setLoader(true);

    const data = {
      username: phoneNumber,
      password: password,
      systemName: 'redPoint',
      // device: UserUtil.getDeviceInfo(),
    }

    try{
      const res = await request('post', 'redpointapi/user/login', data, 'login: ', () => setLoader(false));
      const tok = ['token', res.token];
      const userId = ['userId', res.userId];
      const userAuthInfo = ['userAuthInfo', JSON.stringify({username: phoneNumber, password})];
      AsyncStorage.multiSet([tok, userId, userAuthInfo]);
      setLoader(false);
      login(res.token);
    }catch(e){
      console.log("login error in second catch", e);
      setLoader(false);
    }
  }


  return (
    <SafeAreaView style={styles.containerView}>
      <StatusBar barStyle="white-content" />
      <Loader visible={loader} />
      {true && <View style={styles.head} />}
      <View style={styles.center}>
        <View style={{justifyContent: 'space-between', flex: 2}}>
          {/* <Text style={{color: 'red', alignSelf: 'center'}}>
            I'm your error.
          </Text> */}
          <Input
            title="Нэвтрэх дугаар"
            type="number"
            onFocus={() => null}
            value={phoneNumber}
            onChange={setPhoneNumber}
            focus={false}
          />
          <Input
            title="Нууц үг"
            type="password"
            onFocus={() => null}
            value={password}
            onChange={setPassword}
            focus={false}
          />
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
          onClick={newLogin}
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
