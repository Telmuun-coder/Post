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
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from './src/Components/Button';
import Input from './src/Components/Input';
import Check from './src/Components/Check';
import Login from './src/Login';
import SignUp from './src/SignUp';
import Profile from './src/Profile';
import Navi from './src/Profile/Navi';
import {Header} from 'react-native/Libraries/NewAppScreen';

const Stack = createStackNavigator();

const windowHeight = Dimensions.get('window').height;
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Navi"
          component={Navi}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
});

export default App;
