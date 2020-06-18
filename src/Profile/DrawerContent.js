import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {DrawerItem, DrawerContentScrollView} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/AntDesign';

const DrawerContent = props => {
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props} style={{flex: 1}}>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.setting}
            onPress={() => props.navigation.toggleDrawer()}>
            <Icon name="setting" size={25} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <View style={styles.logoContainer}>
          <Text>LOGO</Text>
        </View>
        <View style={{height: 200}}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => props.navigation.navigate('Profile')}>
            <Text style={styles.label}>НҮҮР ХУУДАС</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => props.navigation.navigate('EditInfo')}>
            <Text style={styles.label}>МЭДЭЭЛЭЛ ЗАСАХ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => props.navigation.navigate('ChangePass')}>
            <Text style={styles.label}>НУУЦ ҮГ СОЛИХ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => props.navigation.navigate('Login')}>
            <Text style={styles.label}>ГАРАХ</Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
  setting: {
    zIndex: 100,
    width: 30,
    height: 30,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  iconContainer: {
    width: '100%',
    // backgroundColor: 'yellow',
    alignItems: 'flex-end',
    paddingRight: 30,
    paddingTop: 30,
  },
  logoContainer: {
    backgroundColor: 'gray',
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {color: '#FFFFFF', fontSize: 16, marginLeft: '20%'},
  item: {
    width: '100%',
    flex: 1,
    // backgroundColor: 'red',
    justifyContent: 'center',
  },
});
export default DrawerContent;
