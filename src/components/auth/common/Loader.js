/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-boolean-value */
import React, { Component } from 'react';
import { View, Text, Modal } from 'react-native';
import BouncingPreloader from 'react-native-bouncing-preloader';
import { connect } from 'react-redux';

const icons = [require('../../../assets/icon_round.png')];

const styles = {
  container: {
    paddingTop: 175,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(31,32,36, 0.6)'
  },
  textStyle: {
    fontSize: 22,
    paddingTop: 25,
    color: 'white'
  }
};

type LoaderProps = {
  commonLoading: Boolean,
  Loading: Boolean
};

class Loader extends Component<LoadingProps> {
  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.commonLoading}
        onRequestClose={() => {
          null;
        }}
      >
        <View style={styles.container}>
          <BouncingPreloader
            icons={icons}
            leftRotation="0deg"
            rightRotation="0deg"
            leftDistance={-150}
            rightDistance={-100}
            speed={1500}
          />
          <Text style={styles.textStyle}>Loading...</Text>
        </View>
      </Modal>
    );
  }
}

function mapStateToProps({ session, common }) {
  return {
    loading: session.loading,
    commonLoading: common.loading
  };
}

export default connect(mapStateToProps)(Loader);
