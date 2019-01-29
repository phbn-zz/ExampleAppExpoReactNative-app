/* eslint-disable react/jsx-no-bind, react-native/no-inline-styles */
import React, { Component } from 'react';
import { Text, Dimensions, Image, ImageBackground, View } from 'react-native';
import { Container, Button, Form } from 'native-base';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import * as actions from '../../actions';

import LISignIn from './AuthLinkedInButtonAndFlow';
import {
	authColors,
	authStyles,
	backgroundImage,
	CustomButton
} from './common';
import Loader from './common/Loader';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type AuthProps = {
	navigation: Object,
	commonLoadingStatus: Function
};

// eslint-disable-next-line react/prefer-stateless-function
class AuthWelcome extends Component<AuthProps> {
	render() {
		//this.props.commonLoadingStatus(false); //For testing purposes
		return (
			<ImageBackground
				source={backgroundImage}
				imageStyle={{ resizeMode: 'cover' }}
				style={{ width: '100%', height: '100%' }}
			>
				<Loader />
				<Animatable.View
					style={{
						justifyContent: 'center',
						paddingTop: 10,
						paddingBottom: 20,
						alignItems: 'center',
						flex: 1
					}}
					animation="fadeInDown"
				>
					<Image
						source={require('../../../assets/logo.png')}
						style={{
							width: windowWidth * 0.67,
							height: windowHeight * 0.67,
							paddingBottom: 50
						}}
						resizeMode="contain"
					/>
				</Animatable.View>
				<View style={authStyles.containerStyle}>
					<Text style={authStyles.txtGreet}>
						You're hungry? Let's fix that...
					</Text>
					<Form>
						<LISignIn />
						<CustomButton
							icon="md-mail"
							onPress={() => {
								this.props.navigation.navigate('signUp');
							}}
							style={authStyles.buttonStyle}
						>
							SIGN UP
						</CustomButton>
						<Button
							hasText
							transparent
							style={{ alignSelf: 'center', bottom: 10 }}
							onPress={() => {
								this.props.navigation.navigate('signIn');
							}}
						>
							<Text style={authStyles.txtGrey}>Already have an account? </Text>
							<Text style={authStyles.clickableText}>Sign In</Text>
						</Button>
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
)(AuthWelcome);
