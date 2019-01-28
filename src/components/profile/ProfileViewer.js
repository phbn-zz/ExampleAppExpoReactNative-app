import React, { Component } from 'react';
import { Image, Linking } from 'react-native';
import { Text, Container, Button } from 'native-base';
import firebase from '../../services/firebase';
import { show_error } from '../../actions';

type ProfileViewerProps = {
	profileObject: Object,
	navigation: Object,
	name: String
};

const styles = {
	header: {
		backgroundColor: '#fcd443',
		height: 200
	},
	headerContent: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	links: {
		fontSize: 17,
		color: 'blue',
		marginTop: 30,
		textAlign: 'center'
	},
	avatar: {
		width: 130,
		height: 130,
		borderRadius: 63,
		borderWidth: 4,
		borderColor: 'white',
		marginBottom: 10,
		alignSelf: 'center',
		position: 'absolute',
		marginTop: 20
	},
	name: {
		fontSize: 22,
		color: '#FFFFFF',
		fontWeight: '600'
	},
	body: {
		marginTop: 40,
		alignItems: 'center',
		justifyContent: 'center'
	},
	info: {
		fontSize: 16,
		color: '#696969',
		marginTop: 10
	},
	description: {
		fontSize: 16,
		color: '#696969',
		marginTop: 10,
		textAlign: 'center'
	},
	descriptionHeadline: {
		fontSize: 18,
		color: '#424746',
		marginTop: 10,
		textAlign: 'center'
	},
	buttonContainer: {
		alignSelf: 'center',
		marginTop: 30,
		height: 45,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 20,
		width: 250,
		borderRadius: 30,
		backgroundColor: '#00a590'
	}
};

export default class ProfileViewer extends Component<ProfileViewerProps> {
	state = {
		poking: false
	};

	static navigationOptions = ({ navigation }) => ({
		title: navigation.state.params.profileObject.name
	});

	/*async poke(uid) {
    this.setState({ poking: true });
    const response = await firebase
      .functions()
      .httpsCallable('notifications')(uid);
    this.setState({ response: response.data, poking: false });
  }*/

	render() {
		const {
			photo,
			headline,
			industry,
			name,
			intro,
			website
		} = this.props.navigation.state.params.profileObject;
		console.log(this.props.navigation.state.params.profileObject);
		return (
			<Container>
				<Container style={styles.header}>
					<Container>
						<Image
							style={styles.avatar}
							source={{
								uri:
									photo ||
									'https://firebasestorage.googleapis.com/v0/b/sp8ces-778ef.appspot.com/o/userPhotos%2Fprofile_avatar.png?alt=media&token=b380e27e-d2e9-47bc-bfea-f09c571635d3'
							}}
						/>
					</Container>
					<Container style={styles.headerContent}>
						<Text style={styles.info}>{headline}</Text>
						<Text style={styles.info}>{industry}</Text>
					</Container>
				</Container>
				<Container style={styles.body}>
					<Text style={styles.descriptionHeadline}>Talk to me about:</Text>
					<Text style={styles.description}>{intro}</Text>
					<Text
						style={styles.links}
						onPress={() => {
							Linking.canOpenURL(website).then(supported => {
								if (supported) {
									return Linking.openURL(website).catch(err =>
										console.error('An error occurred', err)
									);
								}

								return show_error('Website URL is invalid');
							});
						}}
					>
						{website || ''}
					</Text>
				</Container>
			</Container>
		);
	}
}
