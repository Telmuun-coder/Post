import React, {useState, useEffect} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
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
import Drawer from './src/Profile/Drawer';
import Loader from './src/Components/Loader';
import {AuthContext} from './src/Components/AuthContext.js';
import {set} from 'react-native-reanimated';

const Stack = createStackNavigator();

const windowHeight = Dimensions.get('window').height;

const AuthStack = createStackNavigator();
const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator>
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
    </AuthStack.Navigator>
  );
};

const App = () => {
  const [loading, setLoader] = useState(true);
  const [user, setUser] = useState(false);
  useEffect(() => {
    setTimeout(() => setLoader(!loading), 1000);
    // setTimeout(() => setUser({}), 1000);
  }, []);

  const auth = React.useMemo(
    () => ({
      login: (phoneNumber, password) => {
        //console.warn(phoneNumber + ', ' + password);
        setUser(true);
      },
      logout: () => setUser(false), //console.warn('Logout'),
      register: (phoneNumber, password) =>
        console.warn(phoneNumber + ', ' + password),
    }),
    [],
  );
  return (
    <AuthContext.Provider value={auth}>
      <NavigationContainer>
        {/* <AuthStackScreen /> */}
        {loading ? (
          <Loader visible={loading} />
        ) : user ? (
          <Navi />
        ) : (
          <AuthStackScreen />
        )}
        {/* <Stack.Screen
          name="Navi"
          component={Navi}
          options={{headerShown: false}}
        /> */}
      </NavigationContainer>
    </AuthContext.Provider>
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
