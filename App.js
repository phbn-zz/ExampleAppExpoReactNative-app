import React, { Component } from 'react';
import { AppLoading, Asset } from 'expo';

import { Root, StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';

import { Provider } from 'react-redux';
import { store } from './src/store/store';

import AppNavigator from './src/navigation/NavigationStructure';

function cacheFonts(fonts) {
	return fonts.map(font => Font.loadAsync(font));
}

function cacheImages(images) {
	images.map(image => Asset.fromModule(image).downloadAsync());
}

class App extends Component {
	state = {
		isReady: false
	};

	async _cacheResourcesAsync() {
		const fontAssets = cacheFonts([
			require('./assets/fonts/Montserrat/Montserrat-Regular.ttf')
		]);

		const imageAssets = cacheImages([
			require('./assets/images/background.png')
		]);

		return Promise.all(...imageAssets, ...fontAssets);
	}

	render() {
		//Preloading assets
		if (!this.state.isReady) {
			return (
				<AppLoading
					startAsync={this._cacheResourcesAsync}
					onFinish={() => {
						this.setState({ isReady: true });
						console.log('Cached assets');
					}}
					onError={console.warn}
				/>
			);
		}

		return (
			<Provider store={store}>
				<StyleProvider style={getTheme(material)}>
					<Root>
						<AppNavigator />
					</Root>
				</StyleProvider>
			</Provider>
		);
	}
}

export default App;
