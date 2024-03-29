import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Text,
} from 'react-native';
// import AnimatedLoader from 'react-native-animated-loader';
import LoadingView from 'react-native-loading-view';

const Loader = props => {
  return (
    <>
      {props.visible && (
        <View style={styles.containerView}>
          <StatusBar
            //hidden={true}
            backgroundColor="black"
          />
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="black" />
            <Text>Ачаалж байна түр хүлээнэ үү...</Text>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  containerView: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    width: 270,
    height: 60,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 8,
  },
});

export default Loader;
