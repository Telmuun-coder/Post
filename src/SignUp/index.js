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
  Platform,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../Components/Button';
import Input from '../Components/Input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import ImagePicker from 'react-native-image-picker';
import {AuthContext} from '../Components/AuthContext.js';
import Loader from '../Components/Loader';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const options = {
  title: 'Нүүр зураг сонгох',
  takePhotoButtonTitle: 'Зураг авч оруулах...',
  chooseFromLibraryButtonTitle: 'Зургийн цомгоос сонгох...',
  quality: 1,
  // maxWidth: 500,
  // maxHeight: 150,
};

const SignUp = props => {
  const [url, setUrl] = useState('sda');
  const getAvatar = () => {
    ImagePicker.showImagePicker(options, res => {
      if (res.didCancel) console.warn('really bitch');
      else if (res.error) console.warn(res.error);
      else setUrl(res.uri);
    });
  };
  const {register} = React.useContext(AuthContext);
  const [phoneNumber, setPhoneNumber] = useState('99882753');
  const [password, setPassword] = useState('pass');
  const [loader, setLoader] = useState(false);
  return (
    <SafeAreaView style={styles.containerView}>
      <StatusBar barStyle="white-content" />
      <Loader visible={loader} />
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
              <Input
                title="Таны нэр"
                type="carNum"
                onFocus={() => null}
                onChange={() => null}
              />
              <Input
                title="Утасны дугаар"
                type="number"
                value={phoneNumber}
                onFocus={() => null}
                onChange={setPhoneNumber}
              />
              <Input
                title="Нууц үг"
                type="password"
                onFocus={() => null}
                value={password}
                onChange={setPassword}
              />
              <Input
                title="Нууц үг давтах"
                type="password"
                onFocus={() => null}
                onChange={() => null}
              />
              <Input
                title="Тээврийн хэрэгслийн дугаар"
                type="carNum"
                onFocus={() => null}
                onChange={() => null}
              />

              <TouchableOpacity
                style={styles.zuragOruulah}
                onPress={() => getAvatar()}>
                <Text style={styles.headTitle}>Зураг оруулах</Text>
                <View
                  style={{
                    alignSelf: 'center',
                    marginTop: '18%',
                    //backgroundColor: 'red',
                  }}>
                  <Icon
                    name="ios-add-circle-outline"
                    size={24}
                    color="#C4C4C4"
                  />
                </View>
                <Image style={styles.avatar} source={{uri: url}} />
              </TouchableOpacity>
            </View>
            <View style={styles.buttons}>
              <Button
                title="БҮРТГҮҮЛЭХ"
                onClick={async () => {
                  register(phoneNumber, password);
                  setLoader(true);
                  await setTimeout(() => {
                    setLoader(false);
                    props.navigation.pop();
                  }, 1000);
                }}
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
  avatar: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.3,
    borderRadius: windowWidth * 0.3,
    position: 'absolute',
    top: 20,
    left: windowWidth * 0.2,
    zIndex: 1,
  },
  containerView: {
    backgroundColor: 'white',
    flex: 1,
    // height: windowHeight,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },

  buttons: {
    height: '15%',
    // backgroundColor: 'red',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginTop: 5,
  },

  center: {
    // flex: 10,
    height: '70%',
    // marginTop: 20,
    // backgroundColor: 'yellow',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  head: {
    height: '7%',
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
    // backgroundColor: 'purple',
    height: 150,
    width: windowWidth * 0.7,
    borderRadius: 20,
  },
});

export default SignUp;
