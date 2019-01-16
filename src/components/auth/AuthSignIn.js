/* eslint-disable react/jsx-no-bind, react-native/no-inline-styles */
import React, { Component } from 'react';
import { Keyboard, Text, View, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import LISignIn from './AuthLinkedInButtonAndFlow';
import { Form } from 'native-base';

import {
  CustomAuthInput,
  CustomButton,
  authStyles,
  backgroundImage
} from './common';
import Loader from './common/Loader';

type AuthSignInProps = {
  loginUser: Function,
  navigation: Object,
  commonLoadingStatus: Boolean
};

class AuthSignIn extends Component<AuthSignInProps> {
  state = {
    password: ''
  };

  render() {
    const pswfield = !this.state.forgotPW ? (
      <CustomAuthInput
        secureTextEntry
        placeholder="Password"
        label="Password"
        value={this.state.password}
        onChangeText={password => this.setState({ password })}
      />
    ) : null;
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
              placeholder="Email"
              label="Email"
              value={this.state.email}
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={email => this.setState({ email })}
            />
            {pswfield}

            <CustomButton
              icon="md-mail"
              onPress={async () => {
                await this.props.commonLoadingStatus(true);
                this.props.loginUser(this.state.email, this.state.password);
                Keyboard.dismiss();
              }}
            >
              SIGN IN
            </CustomButton>
            <LISignIn />
            <Text
              onPress={() => this.props.navigation.navigate('signUp')}
              style={authStyles.clickableText}
            >
              SIGN UP FOR SP8CES
            </Text>
            <Text
              onPress={() => this.props.navigation.navigate('forgotPassword')}
              style={authStyles.clickableText}
            >
              HAVING TROUBLE SIGNING IN?
            </Text>
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
)(AuthSignIn);
