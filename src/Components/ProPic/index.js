import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ProPic = ({userInfo}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={[styles.pic,{position: 'absolute'}]} source={require('../../images/unnamed.png')} />
        <Image style={styles.pic} source={userInfo ? {uri: userInfo.profileImg} : require('../../images/pro.jpg')} />
      </View>
      <Text style={{fontSize: 16, color: '#C0C0C0'}}>{userInfo && userInfo.firstName}</Text>
      {userInfo.plateNumbers.length > 0 
        ?  <Text style={{fontSize: 24, color: '#707070'}}>{userInfo && userInfo.plateNumbers[0].plateNumber}</Text>
        :  <Text style={{fontSize: 12, color: '#707070'}}>Бүртгэлтэй дугаар байхгүй байна.</Text>
      }
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
