import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {SwipeRow} from 'react-native-swipe-list-view';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Number extends React.Component {
  constructor(props) {
    super(props);
    // this.rowRefs = new Map();
    // this.refer = React.createRef();
    // this.state = {
    //   // rightSwipe: new SwipeRow(),
    // };
  }

  render() {
    // SwipeRow.handleRightSwipe
    // this.refer.current.handleRightSwipe(-(windowHeight * 0.06 * 2 + 10));
    return (
      <SwipeRow
        // ref={ref => this.rowRefs.set(this.props.num, ref)}
        // ref={this.refer}
        rightOpenValue={-(windowHeight * 0.06 * 2 + 10)}>
        <View style={styles.behindContainer}>
          <TouchableOpacity
            style={styles.behindTouch}
            onPress={() => this.props.openModalByEdit(this.props.num - 1)}>
            <Text style={styles.behindBtn}>Засах</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.deleteItem(this.props.num - 1)}
            style={[styles.behindTouch, {backgroundColor: '#B00265'}]}>
            <Text style={styles.behindBtn}>Устгах</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <View style={styles.idContainer}>
            <Text style={{color: '#707070'}}>{this.props.num}</Text>
          </View>
          <View style={styles.content}>
            <View style={styles.timeContainer}>
              <Text style={{color: '#BFBFBF'}}>Дуусах хугацаа</Text>
              <Text style={{color: '#707070'}}>{this.props.date}</Text>
            </View>
            <View style={styles.stateContainer}>
              <Text style={{color: '#707070'}}>{this.props.carNum}</Text>
              <Text style={{color: this.props.state ? '#44CB33' : '#BFBFBF'}}>
                {this.props.state ? 'ирсэн' : 'ирээгүй'}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={{width: 30, alignItems: 'flex-end'}}>
            <Icon name="md-more" size={25} color="#C4C4C4" />
          </TouchableOpacity>
        </View>
      </SwipeRow>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.06,
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
    fontSize: 13,
  },
  behindTouch: {
    width: windowHeight * 0.055,
    height: windowHeight * 0.055,
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
    width: windowHeight * 0.06 * 2 + 7,
  },
});

export default Number;
