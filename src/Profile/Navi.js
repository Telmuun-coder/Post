import React from 'react';
import {View} from 'react-native';
import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Profile from './index';
import Login from '../Login';
import EditInfo from '../EditInfo';
import ChangePass from '../ChangePass';
import DrawerContent from './DrawerContent';
import EditUserCarList from '../EditUserCarList';

const Drawer = createDrawerNavigator();

const Navi = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      initialRouteName="Profile"
      drawerPosition="right"
      drawerContentOptions={{
        activeBackgroundColor: 'transparent',
        activeTintColor: '#FFFFFF',
        inactiveTintColor: '#FFFFFF',
      }}
      screenOptions={{
        swipeEnabled: false,
      }}>
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerLabel: 'НҮҮР ХУУДАС',
        }}
      />
      <Drawer.Screen name="EditInfo" component={EditUserCarList} />
      {/* <Drawer.Screen name="EditInfo" component={EditInfo} /> */}
      {/* <Drawer.Screen name="ChangePass" component={ChangePass} /> */}
      {/* <Drawer.Screen name="Login" component={Login} /> */}
    </Drawer.Navigator>
  );
};
export default Navi;
