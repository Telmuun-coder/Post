import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {SwipeRow} from 'react-native-swipe-list-view';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const behindBtnFontSize = windowWidth < 410 ? 10 : 12;

class OwnNumber extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   opened: false,
    // };

  }

  render() {
    return (
      <SwipeRow ref={ref => (this.refer = ref)} disableLeftSwipe disableRightSwipe stopLeftSwipe={20} stopRightSwipe={-(60 * 2 + 15)} directionalDistanceChangeThreshold={10} rightOpenValue={-(60 * 2 + 10)}>

        <View style={styles.behindContainer}>
          <TouchableOpacity style={styles.behindTouch} onPress={this.props.editItem}>
            <Text style={styles.behindBtn}>Засах</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.deleteItem} style={[styles.behindTouch, {backgroundColor: '#B00265'}]}>
            <Text style={styles.behindBtn}>Устгах</Text>
          </TouchableOpacity>
        </View>


        <View style={[styles.container]}>

          <View style={styles.idContainer}>
            <Text style={{color: '#707070'}}>{this.props.num}</Text>
          </View>

          <View style={styles.content}>
            {/* <View style={[styles.timeContainer, {opacity: 0}]}> */}
              {/* <Text style={{color: '#BFBFBF'}}>Дуусах хугацаа</Text> */}
              {/* <Text style={{color: '#707070', fontSize: 16}}>{this.props.endDate}</Text> */}
            {/* </View> */}
            <View style={styles.stateContainer}>
              <Text style={{color: '#707070', fontSize: 18, fontWeight: 'bold'}}>{this.props.carNum}</Text>
            </View>
          </View>

          <TouchableOpacity style={{width: 30, alignItems: 'flex-end'}} onPress={() =>
              this.refer.isOpen
                ? this.refer.closeRow()
                : this.refer.manuallySwipeRow(-(60 * 2 + 10))
            }>
            <Icon name="more-vertical" size={25} color="#C4C4C4" />
          </TouchableOpacity>

        </View>
      </SwipeRow>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.9,
    // height: windowHeight * 0.06,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E6E6E6',
    marginBottom: 10,
    // backgroundColor: 'red',
  },
  idContainer: {
    // backgroundColor: 'purple',
    justifyContent: 'center',
    //alignItems: 'center',
    width: '7%',
    height: '80%',
    marginVertical: '1.5%',
    borderRightWidth: 0.5,
    borderRightColor: '#E6E6E6',
  },
  timeContainer: {
    justifyContent: 'space-between',
    paddingVertical: 5
    // backgroundColor: 'blue',
  },
  content: {
    // backgroundColor: 'pink',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  stateContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    //backgroundColor: 'green',
    alignItems: 'flex-end',
  },
  behindBtn: {
    fontFamily: 'Roboto-Regular',
    color: '#fff',
    fontSize: behindBtnFontSize,
  },
  behindTouch: {
    // width: windowHeight * 0.055,
    // height: windowHeight * 0.055,
    width: 50,
    height: 50,
    backgroundColor: '#FD7578',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  behindContainer: {
    // backgroundColor: 'yellow',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 60 * 2,
  },
});

export default OwnNumber;
