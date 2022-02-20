import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator, Image} from 'react-native';

export default class ActivityIndicatorView extends React.Component {
  render() {
    if (!this.props.animating) {
      return null;
    }

    let backgroundColor = this.props.light ? 'transparent' : 'rgba(0,0,0,0.6)';

    if (this.props.noBackground) {
      backgroundColor = 'transparent';
    }

    let color = this.props.light ? '#666666' : '#fff';
    let textColor = this.props.light ? '#000' : '#fff';

    return (
      <View style={[styles.container, {backgroundColor: backgroundColor}]}>
        <View style={{justifyContent: 'center'}}>
          <ActivityIndicator
            animating={true}
            hidesWhenStopped={true}
            size={this.props.small ? 'small' : 'large'}
            color={color}
          />

          {this.props.noTitle ? null : (
            <Text style={[styles.title, {color: textColor}]}>
              {this.props.title ? this.props.title : 'Түр хүлээнэ үү.'}
            </Text>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },

  title: {
    margin: 8,
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
  },
});
