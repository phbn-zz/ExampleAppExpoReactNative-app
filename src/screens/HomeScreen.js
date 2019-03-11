import React, { Component } from 'react';
import { Text, Button } from 'native-base';

type HomeScreenProps = {};

class HomeScreen extends Component<HomeScreenProps> {
	render() {
		return (
			<Container>
				<Text>Congratulations! You signed into my mock up app.</Text>/Text>
			</Container>
		);
	}
}

export default HomeScreen;
