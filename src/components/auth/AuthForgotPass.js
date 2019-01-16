/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/jsx-no-bind */
import React, { Component } from 'react';
import { Keyboard, View, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Form } from 'native-base';

import {
  CustomAuthInput,
  CustomButton,
  authStyles,
  backgroundImage
} from './common';
import Loader from './common/Loader';

type ForgotPassProps = {
  sendPasswordResetEmail: Function,
  navigation: Object
};

class AuthForgotPass extends Component<ForgotPassProps> {
  state = { email: '' };
  render() {
    return (
      <ImageBackground
        source={backgroundImage}
        imageStyle={{ resizeMode: 'cover' }}
        style={{ width: '100%', height: '100%' }}
      >
        <Loader />
        <View style={authStyles.containerFormStyle}>
          <Form style={{ paddingTop: 15, paddingBottom: 15 }}>
            <CustomAuthInput
              placeholder="Enter your email"
              label="Email"
              value={this.state.email}
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={email => this.setState({ email })}
            />
            <CustomButton
              onPress={() => {
                this.props.sendPasswordResetEmail(this.state.email);
                Keyboard.dismiss();
              }}
            >
              REQUEST PASSWORD RESET LINK
            </CustomButton>
          </Form>
        </View>
      </ImageBackground>
    );
  }
}

function mapStateToProps({ session }) {
  return {
    loading: session.loading
  };
}

export default connect(
  mapStateToProps,
  actions
)(AuthForgotPass);
