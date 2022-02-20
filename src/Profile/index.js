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
import { request, requestParking } from '../../tools';
import AsyncStorage from '@react-native-community/async-storage';
import ActivityIndicatorView from '../Components/ActivityIndicatorView';
import Constants from '../../Constants';
import dateFormat from 'dateformat';
import axios from 'axios';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const behindBtnFontSize = windowWidth < 410 ? 10 : 12;

class Profile extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      loading: false,
      adding: 0,
      userInfo: null,
      userCars: [
          // { 
          //   userCarId: "1629279750189",
          //   rpUserId: "101491192701790",
          //   plateNumber: "5772УАЕ"
          // }
      ],
      cars: [],
      showModal: false,
      inputActive: false,
      add: true,
      addingNumber: '',
      indexOfEdit: null,
      oldCarNum: null,
      danger: false,
    };

  }


  componentDidMount() {
    this.getUserInfo();
    this._unsubscribe = this.props.navigation.addListener(
        'focus',
        () => {
          if(this.state.userInfo && this.state.userInfo.userId)
            this.getUserCarList(this.state.userInfo.userId);
        }
    );
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  getUserInfo = async () => {

    this.setState({loading: true});

    try{
      const res = await request('get', 'redpointapi/user/data', null, 'get userData: ', () => null);

      
      // console.log('userInfo:',JSON.stringify(res.data));
      this.getUserCarList(res.data.userId);
      this.getVisitors(res.data.userId);
      this.setState({ userInfo: res.data});
      AsyncStorage.setItem('userInfo', JSON.stringify(res.data));
      // const tok = ['token', res.token];
      // const user = ['userId', res.userId];
      // AsyncStorage.multiSet([tok, user]);
    }catch(e){
      console.log("get user data error in second catch", e);
    }
  }

  isContain = number => {
    let t = this.state.cars.filter(e => e.plateNumber === number.toUpperCase());
    return t.length === 0 ? true : false;
    // return t.length;
  };

  carNumChecker = num => {
    if (
      num.length >= 6 &&
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

  getVisitors = async (userId) => {
    // console.log(userId);
    try{
      const res = await requestParking('get', `paVisitor/findByRpUserId/${userId}`, null, 'get visitor list: ', () =>  this.setState({loading: false}));
      // console.log(res.entity);
      this.setState({
        cars: res.entity,
        loading: false
      });
      // this.setState({ cars: res.data});
    }catch(e){
      console.log("get visitors error in second catch", e);
      this.setState({loading: false});
    }
    
  }


  getUserCarList = async (userId) => {
    try{
      axios.defaults.headers = {Authorization: null};
      const res = await axios.get(`http://api.minu.mn/parking/paUserCar/findByRpUserId/${userId}`);
      if(res.data.status == '000') {
        console.log("user car list success");
        this.setState({  
          userCars:  res.data.entity
        });
        AsyncStorage.setItem('userCars',JSON.stringify(res.data.entity));
      }else{
        // this.setState({ loading: false });
      }
    }catch(e){
      console.log("get user cars error in second catch", e);
      alert(e);
      // this.setState({ cars:  prevCars});
    }
  }


  gettingNewnumber = e => {
    if (this.carNumChecker(e)) {
      this.setState({addingNumber: e});
      this.setState({danger: false});
    } else this.setState({danger: true});
  };

  // modalMoveUp = () => this.setState({inputActive: true});

  // modalMoveDown = () => this.setState({inputActive: false});

  closeModal = () => {
    this.setState({
      showModal: false,
      add: true,
      oldCarNum: null,
      danger: false,
      indexOfEdit: null
    });
    // this.modalMoveDown();
  };

  openModal = () => {
    this.setState({showModal: true});
    // this.setState(Prev => {
    //   return {showModal: !Prev.showModal};
    // });
  };
  openModalByEdit = (i, item) => {
    this.setState({add: false, indexOfEdit: i, oldCarNum: item.plateNumber}, () => this.openModal());
    // console.log(oldCarNum);
  };

  addNumber = () => this.setState({showModal: true});

  addItem = async () => {

    const data = {  
      hostUserId: this.state.userInfo.userId,
      plateNumber: this.state.addingNumber.toUpperCase(),
      startDate: dateFormat(new Date(), 'yyyy-mm-dd'),
      expireDate: dateFormat(new Date().setDate(new Date().getDate() + 3), 'yyyy-mm-dd')
    }

    // console.log(data);

    const prevCars = [...this.state.cars];
    this.setState(Prev => ({cars: [data, ...Prev.cars]}));

    try{
      const res = await axios.post('http://api.minu.mn/parking/paVisitor', data);
      if(res.data.status == '000') {

      }else{
        this.setState({ cars:  prevCars})
      }
    }catch(e){
      console.log("create visitors error in second catch", e);
      alert(e);
      this.setState({ cars:  prevCars});
    }

  };

  deleteItem = id => {
    Alert.alert(
      'Анхаар!',
      'Тээврийн хэрэгслийн дугаарыг устгах уу?',
      [
        {text: 'Үгүй', onPress: () => console.log('I knew youu')},
        {
          text: 'Тийм',
          onPress: () => this.deleteVisitor(id)
        },
      ],
      {cancelable: false},
    );
  };

  deleteVisitor = async (visitId) => {

    const cars = [...this.state.cars];
  
    const removed = this.state.cars.filter(
      (e, i) => e.visitorId !== visitId,
    );

    this.setState({cars: removed});

    try{
      const res = await axios.delete(`http://api.minu.mn/parking/paVisitor/${visitId}`);
      if(res.data.status == '000') {
        console.log("delete success");
      }else{
        this.setState({ cars})
      }
    }catch(e){
      console.log("delete visitors error in second catch", e);
      alert(e);
      this.setState({ cars });
    }
  }

  updateItem = async () => {
    console.log("editing index: ", this.state.indexOfEdit);
    const prevCars = [...this.state.cars];
    let cars = [...this.state.cars];
    const item = this.state.cars[this.state.indexOfEdit];
    console.log("item: ", item);
    cars[this.state.indexOfEdit] = {
      ...item,
      plateNumber: this.state.addingNumber,
      startDate: this.state.adding == 0 ? item.startDate : dateFormat(new Date(), 'yyyy-mm-dd'),
      expireDate: this.state.adding == 0 ? item.startDate : dateFormat(new Date().setDate(new Date().getDate() + this.state.adding), 'yyyy-mm-dd')
    };

    const data = {
      visitorId: cars[this.state.indexOfEdit].visitorId,
      plateNumber: this.state.addingNumber,
      startDate: this.state.adding == 0 ? item.startDate : dateFormat(new Date(), 'yyyy-mm-dd'),
      expireDate: this.state.adding == 0 ? item.startDate : dateFormat(new Date().setDate(new Date().getDate() + this.state.adding), 'yyyy-mm-dd')
    };
    this.setState({cars, adding: 0});
    console.log("seding:",data);
    try{
      axios.defaults.headers = {Authorization: null};

      const res = await axios.put('http://api.minu.mn/parking/paVisitor', data);
      if(res.data.status == '000') {
        console.log("update success", res.data.entity);
      }else{
        this.setState({ cars:  prevCars})
      }
    }catch(e){
      console.log("update visitors error in second catch", e);
      alert(e);
      this.setState({ cars:  prevCars});
    }
  };

  submitModal = () => {
    this.state.add ? this.addItem() : this.updateItem();
    this.closeModal();
  };

  addCar = () => {

  }

  extendDay = (day) => {
    this.setState(prev => ({adding: prev.adding == day ? 0 : day}));
  }

  render() {
    return (
      <View style={styles.Container}>

        <View style={styles.picContainer}>
          <ProPic userInfo={this.state.userInfo} userCars={this.state.userCars}/>
        </View>

        <TouchableOpacity style={styles.setting} onPress={() => this.props.navigation.toggleDrawer()}>
          <Icon name="setting" size={25} color="#C4C4C4" />
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.addOwnPlate} onPress={this.addCar}>
          <Icon name="pluscircleo" size={25} color="#C4C4C4" />
        </TouchableOpacity> */}


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
                <View key={i+''}>
                  <Number
                    num={i + 1}
                    startDate={e.startDate}
                    endDate={e.expireDate}
                    carNum={e.plateNumber}
                    // state={e.state}
                    deleteItem={() => this.deleteItem(e.visitorId)}
                    openModalByEdit={() => this.openModalByEdit(i, e)}
                  />
                </View>
              );
            })
          )}
        </ScrollView>

        <View style={styles.btnContainer}>
          <Button title="Дугаар нэмэх" onClick={this.openModal} />
        </View>

        <Modal
          style={{justifyContent: 'center', alignItems: 'center', flex: 1}}
          onRequestClose={() => this.closeModal()}
          animationType="slide"
          visible={this.state.showModal}
          transparent={true}>

          <View style={styles.shadow} onStartShouldSetResponder={() => this.closeModal()}/>

          <View style={[ styles.ModalContainer ]}>

            <Text style={styles.ModalTitle}> ДУГААР{this.state.add ? ' НЭМЭХ' : ' ЗАСАХ'} </Text>

            <Input
              // danger={this.state.danger}
              focus={true}
              title="Тээврийн хэрэгслийн дугаар"
              placeHolder="0000ААА"
              type="carNum"
              value={this.state.oldCarNum}
              // onFocus={this.modalMoveUp}
              onFocus={() => null}
              autoCapitalize='characters'
              onChange={this.gettingNewnumber}
            />

            {this.state.add 
            ? (<View style={{alignItems: 'center'}}>
                <Text style={styles.ModalTailbar}>
                  { 'Таны нэмсэн тээврийн хэрэгслийн дугаар 3 хоногын дараа уг жагсаалтаас устгагдах болно.' }
                </Text>
               </View>) 
            : (
                <View style={styles.extendContainer}>
                  <Text style={styles.extendDayTxt}>Хоног сунгах</Text>
                  <View style={styles.buttons}>
                    <TouchableOpacity onPress={() => this.extendDay(1)} style={[styles.behindTouch, this.state.adding == 1 && {backgroundColor: '#AF0065'}]}>
                      <Text style={styles.behindBtn}>+1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.extendDay(2)} style={[styles.behindTouch, this.state.adding == 2 && {backgroundColor: '#AF0065'}]}>
                      <Text style={styles.behindBtn}>+2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.extendDay(3)} style={[styles.behindTouch, this.state.adding == 3 && {backgroundColor: '#AF0065'}]}>
                      <Text style={styles.behindBtn}>+3</Text>
                    </TouchableOpacity>
                  </View>
                </View>
            )}

            <Button
              disabled={this.state.danger}
              title={this.state.add ? 'БҮРТГҮҮЛЭХ' : 'ЗАСАХ'}
              onClick={() => this.submitModal()}
            />

          </View>

        </Modal>
        
        <ActivityIndicatorView animating={this.state.loading}/>
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
    padding: 10,
    paddingTop: 10,
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
  addOwnPlate: {
    width: 40,
    height: 40,
    //backgroundColor: 'red',
    position: 'absolute',
    left: 30,
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
    marginTop: windowHeight * 0.1,
  },
  // active: {marginTop: windowHeight * 0.1},
  ModalTitle: {
    fontSize: 16,
    color: '#707070',
  },
  ModalTailbar: {
    color: '#BFBFBF',
    fontSize: 12,
    textAlign: 'center'
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
  behindBtn: {
    fontFamily: 'Roboto-Regular',
    color: '#fff',
    fontSize: 18,
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
  extendContainer: {

  },
  extendDayTxt: {
    fontSize: 16,
    color: '#000',
    opacity: 0.6,
    alignSelf: 'center',
    textAlign: 'center'
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '90%',
    marginVertical: 10
  }
});

export default Profile;
