import React, {useState} from 'react';
import {View, Modal, StyleSheet, Text, Dimensions} from 'react-native';
import Button from '../Components/Button';
import Input from '../Components/Input';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const ModalMe = props => {
  const [modalVisible, setModalVisible] = useState(props.showModal);
  const closeModal = () => setModalVisible(!modalVisible);
  return (
    <Modal animationType="slide" visible={modalVisible} transparent={true}>
      <View style={styles.container}>
        <Text style={styles.title}>
          ДУГААР{props.add ? ' НЭМЭХ' : ' ЗАСАХ'}
        </Text>
        <Input title="Тээврийн хэрэгслийн дугаар" type="carNum" />
        {props.add && (
          <View style={{alignItems: 'center'}}>
            <Text style={styles.ex}>
              Таны нэмсэн тээврийн хэрэгслийн дугаар
            </Text>
            <Text style={styles.ex}>7 хоногын дараа уг жагсаалтаас</Text>
            <Text style={styles.ex}>устгагдах болно</Text>
          </View>
        )}
        <Button
          title={props.add ? 'БҮРТГҮҮЛЭХ' : 'ЗАСАХ'}
          onClick={closeModal}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: windowHeight * 0.45,
    marginTop: windowHeight * 0.2,
    backgroundColor: 'blue',
    alignSelf: 'center',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: 50,
    paddingTop: 30,
  },
  title: {
    fontSize: 16,
    color: '#707070',
  },
  ex: {
    color: '#BFBFBF',
    fontSize: 12,
  },
});
export default ModalMe;
