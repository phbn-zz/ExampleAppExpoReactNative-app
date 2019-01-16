// @flow
import React, { Component } from 'react';
import firebaseService from '../../environments/firebase';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Text } from 'native-base';
import { show_error } from '../../actions/toastActions';
import LinkedInModal from 'react-native-linkedin';
import { connect } from 'react-redux';
import DialogInput from 'react-native-dialog-input'; //Uninstall from packages
import * as actions from '../../actions';
import { withNavigation } from 'react-navigation';

const LI_CLIENT_ID = '78vkfldjmi53ol';
const REDIRECTURI = 'https://www.sp8ces.dk/';
const LI_SECRET_ID = 'rndStringToAvoidDebugError'; // Formality with react-native-linkedin

const Colors = {
  White: '#fafbfd',
  BtnBg: '#0077B5',
  DialogBg: 'rgba(220,220,220, 0.98)'
};

const styles = StyleSheet.create({
  buttonStyle: {
    marginLeft: 10,
    marginRight: 10,
    height: 50,
    backgroundColor: Colors.BtnBg
  },
  buttonTextStyle: {
    color: Colors.White,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1
  },
  linkedInContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

type LISignInProps = {
  loginUserWithToken: Function,
  navigation: Object,
  commonLoadingStatus: Function
};

class LISignIn extends Component<LISignInProps> {
  state = {
    phone: '',
    ref: ''
  };

  async makeStateString() {
    const response = await firebaseService
      .functions()
      .httpsCallable('makeStateString')();
    this.setState({ stateString: response.data });
  }

  submitAuthCode(authCode, stateString) {
    firebaseService
      .functions()
      .httpsCallable('LISignInSignUp')({ authCode, stateString })
      .then(response => {
        console.log(response.data);
        if (response.data.result === 'phoneNumberNeeded') {
          this.props.navigation.navigate('phoneNumber', {
            ref: response.data.ref
          });
          this.props.commonLoadingStatus(false);
        } else if (response.data.result === 'CSRF') {
          this.makeStateString();
          this.props.commonLoadingStatus(false);
          show_error('Something went wrong. Please try again!');
        } else {
          return this.props.loginUserWithToken(response.data.result);
        }
      })
      .catch(error => {
        console.log(error);
        show_error(error.message);
      });
  }

  render() {
    /* eslint-disable react/jsx-no-bind */
    return (
      <View style={styles.linkedInContainer}>
        <LinkedInModal
          ref={ref => {
            this.modal = ref;
          }}
          linkText={null}
          onClose={() => null}
          clientID={LI_CLIENT_ID}
          clientSecret={LI_SECRET_ID}
          redirectUri={REDIRECTURI}
          authState={this.state.stateString}
          shouldGetAccessToken={false}
          onSignIn={this.props.commonLoadingStatus(true)}
          onError={this.props.commonLoadingStatus(false)}
          onSuccess={async data => {
            await this.props.commonLoadingStatus(true);
            this.submitAuthCode(data, this.state.stateString);
          }}
        />
        <Button
          block
          iconLeft
          style={styles.buttonStyle}
          onPress={async () => {
            await this.props.commonLoadingStatus(true);
            await this.makeStateString();
            await this.modal.open();
            this.props.commonLoadingStatus(false);
          }}
        >
          <Icon name="logo-linkedin" />
          <Text style={styles.buttonTextStyle}>SIGN IN WITH LINKEDIN</Text>
        </Button>
      </View>
    );
  }
}

function mapStateToProps({ session }) {
  return {
    loading: session.loading
  };
}

export default withNavigation(
  connect(
    mapStateToProps,
    actions
  )(LISignIn)
);
