/* eslint-disable react/jsx-no-bind, react-native/no-inline-styles */
import React, { Component } from 'react';
import firebase from '../../services/firebase';
import { View, ImageBackground } from 'react-native';
import { show_error } from '../../actions/toastActions';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import {
	CustomAuthInput,
	CustomButton,
	authStyles,
	backgroundImage
} from './common';
import Loader from './common/Loader';

type PhoneNumberProps = {
	loginUserWithToken: Function,
	navigation: Object,
	commonLoadingStatus: Function
};

class PhoneNumberScreen extends Component<PhoneNumberProps> {
	state = { PhoneNumber: '' };

	submitPhoneNumber(phone, ref) {
		this.props.commonLoadingStatus(true);
		firebase
			.functions()
			.httpsCallable('createLIUserWithPhone')({ phone, ref })
			.then(response => {
				console.log(response);
				this.props.loginUserWithToken(response.data);
			})
			.catch(error => {
				console.log(error);
				this.props.commonLoadingStatus(false);
				show_error(error.message);
			});
	}

	render() {
		const { ref } = this.props.navigation.state.params;

		return (
			<ImageBackground
				source={backgroundImage}
				imageStyle={{ resizeMode: 'cover' }}
				style={{ width: '100%', height: '100%' }}
			>
				<Loader />
				<View style={authStyles.containerFormStyle}>
					<CustomAuthInput
						placeholder="+XX XX XX XX XX"
						label="PhoneNumber"
						value={this.state.phone}
						keyboardType="phone-pad"
						autoCapitalize="none"
						onChangeText={PhoneNumber => {
							this.setState({ PhoneNumber });
						}}
					/>
					<CustomButton
						onPress={() => {
							this.submitPhoneNumber(this.state.PhoneNumber, ref);
						}}
					>
						Submit
					</CustomButton>
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
)(PhoneNumberScreen);
