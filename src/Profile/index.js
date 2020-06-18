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
  };
  gettingNewnumber = e => this.setState({addingNumber: e});
  modalMoveTogle = () =>
    this.setState(Prev => {
      return {inputActive: !this.state.inputActive};
    });
  closeModal = () => {
    this.setState({showModal: false, add: true});
    this.modalMoveTogle();
  };
  openModal = () => {
    this.setState({showModal: true});
  };
  addNumber = () => {
    this.setState({showModal: true});
  };
  dateFormatter = oldDate => {
    const d = oldDate === 'new' ? new Date() : new Date(oldDate);
    const datestring =
      d.getFullYear() +
      '.' +
      ('0' + (d.getMonth() + 1)).slice(-2) +
      '.' +
      ('0' + (oldDate === 'new' ? d.getDate() + 7 : d.getDate())).slice(-2);

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
  addItem = () => {
    const item = {
      carNum: this.state.addingNumber,
      date: this.dateFormatter('new'),
      state: false,
    };
    this.setState(Prev => {
      return {cars: [item, ...this.state.cars]};
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
          // style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };
  openModalByEdit = i => {
    this.setState({add: false, indexOfEdit: i});
    this.openModal();
  };

  updateItem = () => {
    let tmp = this.state.cars[this.state.indexOfEdit];
    tmp.carNum = this.state.addingNumber;
    const l = this.state.cars.length;
    this.setState(Prev => {
      if (this.state.indexOfEdit === 0)
        return {cars: [tmp, ...this.state.cars.slice(1, l)]};
      else if (this.state.indexOfEdit === l - 1)
        return {cars: [...this.state.cars.slice(0, l - 1), tmp]};
      else
        return {
          cars: [
            ...this.state.cars.slice(0, this.state.indexOfEdit),
            tmp,
            ...this.state.cars.slice(this.state.indexOfEdit + 1, l),
          ],
        };
    });
  };
  render() {
    return (
      <View style={styles.Container}>
        <Modal
          onRequestClose={() => this.closeModal()}
          animationType="slide"
          visible={this.state.showModal}
          transparent={true}>
          <View
            style={{
              //flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              position: 'absolute',
              top: 0,
              left: 0,
              width: windowWidth,
              height: windowHeight,
            }}
            onStartShouldSetResponder={() => this.closeModal()}
          />
          <View
            style={[
              styles.ModalContainer,
              this.state.inputActive ? styles.active : null,
            ]}>
            <Text style={styles.ModalTitle}>
              ДУГААР{this.state.add ? ' НЭМЭХ' : ' ЗАСАХ'}
            </Text>
            <Input
              title="Тээврийн хэрэгслийн дугаар"
              type="carNum"
              onActive={this.modalMoveTogle}
              onChange={this.gettingNewnumber}
            />
            {this.state.add && (
              <View style={{alignItems: 'center'}}>
                <Text style={styles.ModalTailbar}>
                  Таны нэмсэн тээврийн хэрэгслийн дугаар
                </Text>
                <Text style={styles.ModalTailbar}>
                  7 хоногын дараа уг жагсаалтаас
                </Text>
                <Text style={styles.ModalTailbar}>устгагдах болно.</Text>
              </View>
            )}
            <Button
              title={this.state.add ? 'БҮРТГҮҮЛЭХ' : 'ЗАСАХ'}
              onClick={() => {
                this.state.add ? this.addItem() : this.updateItem();
                this.closeModal();
              }}
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
          {this.state.cars.map((e, i) => {
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
          })}
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
    width: 30,
    height: 30,
    // backgroundColor: 'red',
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
});

export default Profile;
