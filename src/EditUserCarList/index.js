import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  Modal,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../Components/Button';
import Input from '../Components/Input';
import OwnNumber from '../Components/OwnNumber';
import AntiIcon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import ActivityIndicatorView from '../Components/ActivityIndicatorView';

const {width, height} = Dimensions.get('window');

const EditUserCarList = props => {
  const userData = useRef();
  const editingItem = useRef();
  const [mode, setMode] = useState('add');
  const [modal, setModal] = useState(false);
  const [value, setValue] = useState(null);
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState([]);

  useLayoutEffect(() => {
    const getInfo = async () => {
      let userInfo = await AsyncStorage.getItem('userInfo');
      let userCars = await AsyncStorage.getItem('userCars');
      if(userInfo) userInfo = JSON.parse(userInfo);
      if(userCars) userCars = JSON.parse(userCars);

      // console.log(userCars);

      userData.current = {
        userInfo,
        userCars
      };
      setCars([...userCars]);
    }
    getInfo();
  },[])

  const isContain = number => {
    const t = cars.filter(e => e.userCarId === number.toUpperCase());
    return t.length === 0 ? true : false;
  };

  const carNumChecker = num => num.length >= 6 && num.replace(/[^0-9]/g, '').length === 4 && isContain(num);

  const onChange = (plateNumber) => {
    if (carNumChecker(plateNumber)) {
      setValue(plateNumber);
      setValid(false);
    } else setValid(true);
  }

  const addUserCar = async () => {
    setModal(false);
    setLoading(true);

    const data = {
      rpUserId: userData.current.userInfo.userId,
      plateNumber: value
    }

    try{
      axios.defaults.headers = {Authorization: null};
      const res = await axios.post(`http://api.minu.mn/parking/paUserCar`, data);
      if(res.data.status == '000') {
        setCars(prev => ([...prev,res.data.entity]));
        setValue(null);
        setLoading(false);
      }else{
        setLoading(false);
      }
    }catch(e){
      console.log("add user car: ", e);
      alert(e);
      // this.setState({ cars:  prevCars});
    }
  }

  const onEdit = (item) => {
    editingItem.current = item;
    setMode('edit');
    setValue(item.plateNumber);
    setModal(true);
  }

  const editItem = async () => {
    // PUT
    // /parking/paUserCar

    let oldTmp = [...cars];
    let tmp = [...cars];
    let beforeItemIndex = tmp.findIndex(e => e.userCarId == editingItem.current.userCarId);
    tmp[beforeItemIndex].plateNumber = value;
    setCars(tmp);
    setModal(false);


    const data = {
      userCarId: editingItem.current.userCarId,
      plateNumber: value
    };

    try{
      axios.defaults.headers = {Authorization: null};

      const res = await axios.put('http://api.minu.mn/parking/paUserCar', data);
      if(res.data.status == '000') {
        console.log("update success", res.data.entity);
        await AsyncStorage.setItem("userCars", JSON.stringify(tmp));
      }else{
        alert(res.data.message);
        setCars(oldTmp);
      }
    }catch(e){
      console.log("update user car error in second catch", e);
      alert(e);
      setCars(oldTmp);
    }
  }

  const onDelete = (item) => Alert.alert(
    "Анхаараарай!",
    `Та ${item.plateNumber} тээврийн хэрэгслийн дугаарыг устгах уу?`,
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => deleteItem(item) }
    ]
  )

  const deleteItem = async (item) => {

    setCars(prev => (prev.filter( e => e.userCarId != item.userCarId)));

      try{
        axios.defaults.headers = {Authorization: null};
  
        const res = await axios.delete(`http://api.minu.mn/parking/paUserCar/${item.userCarId}`);
        if(res.data.status == '000') {
          console.log("user car delete success");
          await AsyncStorage.setItem("userCars", JSON.stringify(cars.filter(e => e.userCarId != item.userCarId)));
        }else{
          setCars(prev => ([...prev, item]));
        }
      }catch(e){
        console.log("update visitors error in second catch", e);
        alert(e);
        setCars(prev => ([...prev, item]));
      }
  }

  return (
    <SafeAreaView style={styles.containerView}>
      <StatusBar barStyle="white-content" />
      <KeyboardAvoidingView style={{flex: 1}} enabled keyboardVerticalOffset={100} behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <View style={{flex: 1}}>
            <View style={styles.head}>
              <Text style={{color: '#707070', fontSize: 16}}> МЭДЭЭЛЭЛ ЗАСАХ </Text>
            </View>
            <View style={styles.center}>
              <ScrollView style={{marginTop: 20}}>
                {
                    cars.length == 0 
                    ? <Text style={{color: '#707070'}}>Бүртгэлтэй тээврийн хэрэгсэл байхгүй байна.</Text>
                    : cars.map((e,i) => 
                        <OwnNumber
                            key={e.userCarId}
                            num={i+1}
                            carNum={e.plateNumber}
                            editItem={() => onEdit(e)}
                            deleteItem={() => onDelete(e)}
                        />)
                }
              </ScrollView>
              <TouchableOpacity style={styles.addBtn} onPress={()=>{setMode('add'); setModal(true);}}>
                <AntiIcon name="pluscircleo" size={25} color="#707070"/>
              </TouchableOpacity>
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Text style={{color: '#707070', fontSize: 16}}>
                  {'БУЦАХ'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
      </KeyboardAvoidingView>

      <ActivityIndicatorView animating={loading}/>

      <Modal
          style={{justifyContent: 'center', alignItems: 'center', flex: 1}}
          onRequestClose={() => setModal(false)}
          animationType="slide"
          visible={modal}
          transparent={true}>

          <View style={styles.shadow} onStartShouldSetResponder={() => setModal(false)}/>

          <View style={[ styles.ModalContainer ]}>

            <Text style={styles.ModalTitle}> ДУГААР {mode == 'add' ? 'НЭМЭХ' : 'ЗАСАХ'}</Text>

            <Input
              focus={true}
              title="Тээврийн хэрэгслийн дугаар"
              placeHolder="0000ААА"
              type="carNum"
              value={value}
              onFocus={() => null}
              onChange={onChange}
              autoCapitalize='characters'
            />

            <Button
              disabled={valid}
              title={mode == 'add' ? 'НЭМЭХ' : 'ЗАСАХ'}
              onClick={() => mode == 'add' ? addUserCar() : editItem()}
            />

          </View>

        </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  addBtn: {
    backgroundColor: '#FFF',
    margin: 10,
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  containerView: {
    backgroundColor: 'white',
    flex: 1,
    width: '100%',
    // height: height,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },

  buttons: {
    flex: 0.3,
    // backgroundColor: 'red',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
    marginTop: 5,
    minHeight: 70,
    paddingBottom: 40,
  },

  center: {
    flex: 7,
    marginTop: 20,
    // backgroundColor: 'yellow',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  head: {
    flex: 0.7,
    // backgroundColor: 'gray',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headTitle: {
    color: '#BFBFBF',
    fontSize: 10,
    marginLeft: 20,
    marginTop: 5,
  },
  zuragOruulah: {
    backgroundColor: '#F7F7F7',
    height: 150,
    borderRadius: 20,
    marginBottom: 40,
  },

  shadow: {
    //flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
  },
  ModalContainer: {
    opacity: 1,
    width: '90%',
    height: height * 0.45,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: 50,
    paddingTop: 30,
    marginTop: height * 0.1,
  },
  // active: {marginTop: height * 0.1},
  ModalTitle: {
    fontSize: 16,
    color: '#707070',
  },
});

export default EditUserCarList;
