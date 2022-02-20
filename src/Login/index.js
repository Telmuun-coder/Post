import React, {useState, useLayoutEffect} from 'react';
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
  Image
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
  const [phoneNumber, setPhoneNumber] = useState(''); //'99882753'
  const [password, setPassword] = useState(''); //'Telmuun8989'
  const [loader, setLoader] = useState(false);
  const [remember, setRemember] = useState(true);

  const save = (saveOrNot) => {
    setRemember(saveOrNot);
  }

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

      if(remember) AsyncStorage.multiSet([tok, userId, userAuthInfo]);
      else AsyncStorage.multiSet([tok, userId]);

      setLoader(false);
      login(res.token);
    }catch(e){
      console.log("login error in second catch", e);
      setLoader(false);
    }
  }

  useLayoutEffect(() => {
    const fillData = async () => {
      let userData = await AsyncStorage.getItem('userAuthInfo');
      if(userData){
        userData = JSON.parse(userData);
        setPhoneNumber(userData.username);
        setPassword(userData.password);
      }
    };
    fillData();
  },[])


  return (
    <SafeAreaView style={{flex: 1}}>
     
      <View style={styles.container}>

          <Image source={require('../images/Parking.png')} style={{width: 271, height: 83, marginBottom: 30, tintColor: 'black'}}/>

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


        <View style={styles.nuutsInside}>
          <View style={styles.nuuts}>
            <Check onPress={save} remember={remember}/>
            <TouchableOpacity>
              {/* <Text style={{color: '#707070', fontSize: 10}}>
                {'Нууц үг мартсан'.toUpperCase()}
              </Text> */}
            </TouchableOpacity>
          </View>
          </View>


        <Button
          title="НЭВТРЭХ"
          onClick={newLogin}
        />

        </View>

      <Loader visible={loader} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nuuts: {
    marginTop: 20,
    flexDirection: 'row',
    // backgroundColor: 'yellow',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nuutsInside: {
    width: '65%',
    height: 50,
    marginBottom: 20
  },
  buttons: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 50,
    minHeight: 50,
  },
});

export default Login;
