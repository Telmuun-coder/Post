import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image, FlatList, ScrollView} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ProPic = ({userInfo, userCars}) => {
  // const data = [1,2,3,4];
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={[styles.pic,{position: 'absolute'}]} source={require('../../images/unnamed.png')} />
        {userInfo && <Image style={styles.pic} source={{uri: userInfo.profileImg}} />}
      </View>
      <Text style={{fontSize: 16, color: '#C0C0C0'}}>{userInfo && userInfo.firstName}</Text>
      {userCars.length > 0 
        ?   userCars.length < 4 
          ?  <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 30}}>
                {userCars.map((e,i) => <Text key={i+''} style={styles.plate}>{e.plateNumber.toUpperCase()}</Text>)}
             </View>
          :  <ScrollView style={styles.plates} contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}} horizontal>
              {userCars.map((e,i) => <Text key={i+''} style={styles.plate}>{e.plateNumber.toUpperCase()}</Text>)}
            </ScrollView>
        :  <Text style={{fontSize: 12, color: '#707070', opacity: 0.7}}>Бүртгэлтэй дугаар байхгүй байна.</Text>
      }
     
     
      
    </View>
  );
};

const styles = StyleSheet.create({
  plate: {
    fontSize: 18, 
    color: '#707070', 
    marginHorizontal: 8,
    fontWeight: 'bold'
    //  flex: 1,
    //  backgroundColor: 'red'
  },
  plates: {
    // backgroundColor: 'pink',
    width: windowWidth*0.9,
    height: 30
  },
  container: {
    width: windowWidth * 0.6,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    zIndex: -1
    // backgroundColor: 'red',
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
