import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ProPic = props => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.pic} source={require('../../images/pro.jpg')} />
      </View>
      <Text style={{fontSize: 16, color: '#C0C0C0'}}>Тэлмүүн</Text>
      <Text style={{fontSize: 24, color: '#707070'}}>11-11УНA</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.6,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    //backgroundColor: 'red',
  },
  imageContainer: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.3,
    borderRadius: windowWidth * 0.3,
    elevation: 10,
    marginBottom: 15,
  },
  pic: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.3,
    borderRadius: windowWidth * 0.3,
  },
});

export default ProPic;
