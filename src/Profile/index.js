import React from 'react';
import {
  View,
  Alert,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Text,
  Modal,
  ActivityIndicator,
} from 'react-native';
import ProPic from '../Components/ProPic';
import Number from '../Components/Number';
import Button from '../Components/Button';
import Icon from 'react-native-vector-icons/AntDesign';
import Input from '../Components/Input';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Profile extends React.Component {
  state = {
    cars: [
      {
        carNum: '11-11УНА',
        data: '2222.22.22',
        state: true,
      },
      {
        carNum: '',
        data: '',
        state: true,
      },
    ],
    showModal: false,
    inputActive: false,
    add: true,
    addingNumber: '',
    indexOfEdit: null,
    oldCarNum: null,
    danger: false,
  };
  isContain = number => {
    let t = this.state.cars.filter(e => e.carNum === number.toUpperCase());
    return t.length === 0 ? true : false;
    // return t.length;
  };
  carNumChecker = num => {
    if (
      num.length >= 7 &&
      num.replace(/[^0-9]/g, '').length === 4 &&
      this.isContain(num)
    )
      return true;
    else return false;
  };
  dateFormatter = oldDate => {
    const today = new Date();
    const d = new Date(
      oldDate === 'new'
        ? today.getTime() + 7 * 24 * 60 * 60 * 1000
        : new Date(oldDate),
    );
    const datestring =
      d.getFullYear() +
      '.' +
      ('0' + (d.getMonth() + 1)).slice(-2) +
      '.' +
      ('0' + d.getDate()).slice(-2);

    return datestring;
  };

  componentDidMount() {
    let tmp = require('./db');
    tmp = tmp.map(e => {
      return {
        carNum: e.carNum,
        date: this.dateFormatter(e.date),
        state: e.state,
      };
    });
    this.setState({cars: tmp});
  }

  gettingNewnumber = e => {
    if (this.carNumChecker(e)) {
      this.setState({addingNumber: e});
      this.setState({danger: false});
    } else this.setState({danger: true});
  };

  modalMoveUp = () => this.setState({inputActive: true});

  modalMoveDown = () => this.setState({inputActive: false});

  closeModal = () => {
    this.setState({
      showModal: false,
      add: true,
      oldCarNum: null,
      danger: false,
    });
    this.modalMoveDown();
  };

  openModal = () => {
    this.setState({showModal: true});
    // this.setState(Prev => {
    //   return {showModal: !Prev.showModal};
    // });
  };
  openModalByEdit = (i, oldCarNum) => {
    this.setState({add: false, indexOfEdit: i, oldCarNum});
    console.log(oldCarNum);
    this.openModal();
  };

  addNumber = () => this.setState({showModal: true});

  addItem = () => {
    const item = {
      carNum: this.state.addingNumber,
      date: this.dateFormatter('new'),
      state: false,
    };
    this.setState(Prev => {
      return {cars: [item, ...Prev.cars]};
    });
  };
  deleteItem = index => {
    Alert.alert(
      'Анхаар!',
      'Тээврийн хэрэгслийн дугаарыг устгах уу?',
      [
        {text: 'Үгүй', onPress: () => console.log('I knew youu')},
        {
          text: 'Тийм',
          onPress: () => {
            const removed = this.state.cars.filter(
              (e, i) => e.carNum !== this.state.cars[index].carNum,
            );
            this.setState({cars: removed});
          },
        },
      ],
      {cancelable: false},
    );
  };

  updateItem = () => {
    let tmp = this.state.cars[this.state.indexOfEdit];
    tmp.carNum = this.state.addingNumber;
    const l = this.state.cars.length;
    this.setState(Prev => {
      if (this.state.indexOfEdit === 0)
        return {cars: [tmp, ...Prev.cars.slice(1, l)]};
      else if (this.state.indexOfEdit === l - 1)
        return {cars: [...Prev.cars.slice(0, l - 1), tmp]};
      else
        return {
          cars: [
            ...this.state.cars.slice(0, Prev.indexOfEdit),
            tmp,
            ...this.state.cars.slice(Prev.indexOfEdit + 1, l),
          ],
        };
    });
  };
  submitModal = () => {
    this.state.add ? this.addItem() : this.updateItem();
    this.closeModal();
  };

  render() {
    return (
      <View style={styles.Container}>
        {/* <ActivityIndicator size="large" color="#AF0065" /> */}
        <Modal
          onRequestClose={() => this.closeModal()}
          animationType="slide"
          visible={this.state.showModal}
          transparent={true}>
          <View
            style={styles.shadow}
            onStartShouldSetResponder={() => this.closeModal()}
          />
          <View
            style={[
              styles.ModalContainer,
              this.state.inputActive && styles.active,
            ]}>
            <Text style={styles.ModalTitle}>
              ДУГААР{this.state.add ? ' НЭМЭХ' : ' ЗАСАХ'}
            </Text>
            <Input
              danger={this.state.danger}
              focus={true}
              title="Тээврийн хэрэгслийн дугаар"
              placeHolder="00-00ААА"
              type="carNum"
              value={this.state.oldCarNum}
              onFocus={this.modalMoveUp}
              onChange={this.gettingNewnumber}
            />
            {this.state.add && (
              <View style={{alignItems: 'center'}}>
                <Text style={styles.ModalTailbar}>
                  {
                    'Таны нэмсэн тээврийн хэрэгслийн дугаар\n 7 хоногын дараа уг жагсаалтаас\n устгагдах болно.'
                  }
                </Text>
              </View>
            )}
            <Button
              disabled={this.state.danger}
              title={this.state.add ? 'БҮРТГҮҮЛЭХ' : 'ЗАСАХ'}
              onClick={() => this.submitModal()}
            />
          </View>
        </Modal>
        <View style={styles.picContainer}>
          <ProPic />
        </View>
        <TouchableOpacity
          style={styles.setting}
          onPress={() => this.props.navigation.toggleDrawer()}>
          <Icon name="setting" size={25} color="#C4C4C4" />
        </TouchableOpacity>
        <ScrollView
          // showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          style={styles.listContainerS2}>
          {this.state.cars.length === 0 ? (
            <Text style={{color: '#C0C0C0', width: '80%'}}>
              Тээврийн хэрэгслийн дугаарын жагсаалт хоосон байна.
            </Text>
          ) : (
            this.state.cars.map((e, i) => {
              return (
                <View key={e.carNum}>
                  <Number
                    num={i + 1}
                    date={e.date}
                    carNum={e.carNum}
                    state={e.state}
                    deleteItem={this.deleteItem}
                    openModalByEdit={this.openModalByEdit}
                  />
                </View>
              );
            })
          )}
        </ScrollView>
        <View style={styles.btnContainer}>
          <Button title="Дугаар нэмэх" onClick={this.openModal} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    // flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: windowWidth,
    height: windowHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  picContainer: {
    padding: 20,
    paddingTop: 40,
    flex: 3,
    // backgroundColor: 'pink',
    justifyContent: 'center',
  },
  listContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainerS2: {
    height: windowHeight * 0.35,
    // backgroundColor: 'blue',
    width: '100%',
  },
  btnContainer: {
    flex: 1.5,
    marginTop: 20,
  },
  setting: {
    width: 40,
    height: 40,
    //backgroundColor: 'red',
    position: 'absolute',
    right: 30,
    top: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  ModalContainer: {
    opacity: 1,
    width: '90%',
    height: windowHeight * 0.45,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: 50,
    paddingTop: 30,
    marginTop: windowHeight * 0.2,
  },
  active: {marginTop: windowHeight * 0.1},
  ModalTitle: {
    fontSize: 16,
    color: '#707070',
  },
  ModalTailbar: {
    color: '#BFBFBF',
    fontSize: 12,
  },
  shadow: {
    //flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: windowWidth,
    height: windowHeight,
  },
});

export default Profile;
