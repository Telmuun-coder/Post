import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Constants from './Constants';

export const request = async (type, url, data, reqName, callback) => {
  const token = await AsyncStorage.getItem('token');
  axios.defaults.headers = {Authorization: token};

//   console.log(token);

  return new Promise(async (resolve, reject) => {
    try {
      let res = null;
      if (type == 'get')
        res = await axios.get(Constants.redpoint + url, data && data);
      else if (type == 'post')
        res = await axios.post(Constants.redpoint + url, data && data);
      else if(type == 'put')
        res = await axios.put(Constants.redpoint + url, data && data);

      if (res.data.status == 'SUCCESS') {
        resolve(res.data);
      } else {
        reject(res.data.message);
      }
    } catch (e) {
      callback();
      console.log('error by' + reqName, e);
    }
  });
};

export const uploadImage = async (localUrl) => {
  const token = await AsyncStorage.getItem('token');
  axios.defaults.headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
  };

  return new Promise(async (resolve, reject) => {
    try {
      let formdata = new FormData();
      formdata.append('fileName', '1');
      formdata.append('fileType', '1');
      formdata.append('file', {
        uri: localUrl,
        name: 'image.jpg',
        type: 'image/jpeg',
      });
    
      const res = await axios.post(Constants.API_CDN+`u`, formdata);

      if (res.data.status == '000') {
        console.log(res.data.message + "image uploaded");
        resolve(res.data.entity);
      } else {
        reject(res.data.messages);
      }
    } catch (e) {
      console.log('error by' + reqName, e);
    }
  });
}
