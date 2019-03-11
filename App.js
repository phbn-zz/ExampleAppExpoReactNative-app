import React, { Component } from "react";
import { AppLoading, Asset } from "expo";
import { YellowBox } from "react-native";

import { Root, StyleProvider, Image } from "native-base";
import getTheme from "./native-base-theme/components";
import material from "./native-base-theme/variables/material";
// import { FontAwesome } from '@expo/vector-icons';

import { Provider } from "react-redux";
import store from "./src/store/store";

import AppNavigator from "./src/navigation/NavigationStructure";

// ignore specific yellowbox warnings
YellowBox.ignoreWarnings([
  "Require cycle:",
  "Setting a timer",
  "Warning: Can't call setState"
]);

function cacheImages(images) {
  return images.map(image => {
    if (image === "string") {
      return Image.prefetch(image);
    }
    return Asset.fromModule(image).downloadAsync();
  });
}

class App extends Component {
  state = { isReady: false };

  async _cacheResourcesAsync() {
    const imageAssets = cacheImages([
      require("./assets/images/background.jpg")
    ]);

    await Promise.all(...imageAssets);
  }

  render() {
    //Preloading assets
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => {
            this.setState({ isReady: true });
            console.log(this.state.isReady);
            console.log("Cached assets");
          }}
          onError={error => {
            console.log(error);
          }}
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
