/* eslint-disable react/jsx-no-bind */
import React, { Component } from "react";
import {
  Keyboard,
  ScrollView,
  Text,
  ImageBackground,
  KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import * as actions from "../../actions";
import LISignIn from "./AuthLinkedInButtonAndFlow";
import { Form } from "native-base";

import {
  CustomAuthInput,
  CustomButton,
  authStyles,
  backgroundImage
} from "./common";
import Loader from "./common/Loader";

type AuthSignUpProps = {
  signupUser: Function,
  commonLoadingStatus: Boolean
};

class AuthSignUp extends Component<AuthSignUpProps> {
  state = {
    email: "",
    password: "",
    phone: "",
    first_name: "",
    last_name: ""
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
        imageStyle={{ resizeMode: "cover" }}
        style={{ width: "100%", height: "100%" }}
      >
        <ScrollView>
          <KeyboardAvoidingView
            behaviour="padding"
            style={authStyles.containerFormStyle}
          >
            <Loader />
            <Form style={{ paddingTop: 15, paddingBottom: 15 }}>
              <CustomAuthInput
                placeholder="First Name"
                label="First name"
                value={this.state.first_name}
                onChangeText={first_name => this.setState({ first_name })}
              />
              <CustomAuthInput
                placeholder="Last Name"
                label="last name"
                value={this.state.last_name}
                onChangeText={last_name => this.setState({ last_name })}
              />
              <CustomAuthInput
                placeholder="Phone Number"
                label="Phone"
                value={this.state.phone}
                keyboardType="phone-pad"
                onChangeText={phone => this.setState({ phone })}
              />
              <CustomAuthInput
                placeholder="Enter Email"
                label="Email"
                value={this.state.email}
                keyboardType="email-address"
                onChangeText={email => this.setState({ email })}
              />
              {pswfield}
              <CustomButton
                icon="md-mail"
                onPress={async () => {
                  await this.props.commonLoadingStatus(true);
                  this.props.signupUser({
                    email: this.state.email,
                    password: this.state.password,
                    phone: this.state.phone,
                    first_name: this.state.first_name,
                    last_name: this.state.last_name
                  });
                  Keyboard.dismiss();
                }}
                style={authStyles.buttonStyle}
              >
                CREATE ACCOUNT
              </CustomButton>
              <LISignIn />
              <Text
                style={authStyles.clickableText}
                onPress={() => {
                  this.props.navigation.navigate("signIn");
                }}
              >
                SIGN IN
              </Text>
            </Form>
          </KeyboardAvoidingView>
        </ScrollView>
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
)(AuthSignUp);
