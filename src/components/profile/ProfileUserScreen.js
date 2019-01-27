/* eslint-disable react/jsx-no-bind */
import React, { Component } from 'react';
import { FlatList, Image } from 'react-native';
import ProfileCard from './ProfileCard';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Loader } from '../common';

// const screenWidth = Dimensions.get('window').width;
// const rowWidth = screenWidth / 2;

class ProfileGrid extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isReady: false
		};
		this.cacheProfiles();
	}

	async cacheProfiles() {
		await this.props.getProfiles();
		console.log('Got checked in profiles...');
		await this.setState({ profiles: this.props.profiles.checked_in_profiles });
		const avatar = this.props.profiles.checked_in_profiles.map(
			object => object.photo
		);
		const cacheImages = avatar.map(photo => {
			if ((photo === '') | (photo === null)) {
				return null;
			}
			return Image.prefetch(photo).catch(() => null);
		});

		return Promise.all(cacheImages).then(() => {
			this.setState({ profiles: this.props.profiles.checked_in_profiles });
			console.log('Cached all profiles');
			this.setState({ isReady: true });
		});
	}

	render() {
		if (!this.state.isReady) {
			return <Loader />;
		}
		return (
			<FlatList
				style={{ margin: 5 }}
				data={this.state.profiles}
				numColumns={2}
				keyExtractor={item => item.user}
				renderItem={({ item }) => (
					<ProfileCard
						name={item.name}
						photo={item.photo}
						headline={item.headline}
						profileObject={item}
					/>
				)}
			/>
		);
	}
}

function mapStateToProps({ profiles, session, space }) {
	return { profiles, session, space };
}

export default connect(
	mapStateToProps,
	actions
)(ProfileGrid);
