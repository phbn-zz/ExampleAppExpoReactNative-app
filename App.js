import React, { Component } from "react";
import { AppLoading, Asset } from "expo";
import { Root, StyleProvider } from "native-base";

import { Provider } from "react-redux";
import { store } from "./src/store/store";

import AppNavigator from "./src/navigation/NavigationStructure";

class App extends Component {
  state = {
    isReady: false
  };

  async _cacheResourcesAsync() {
    const images = [require("./assets/images/background.png")];

    const cacheImages = images.map(image =>
      Asset.fromModule(image).downloadAsync()
    );
    return Promise.all(cacheImages);
  }

  render() {
    //Preloading assets
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => {
            this.setState({ isReady: true });
            console.log("Cached assets");
          }}
          onError={console.warn}
        />
      );
    }

    return (
      <Provider store={store}>
        <StyleProvider style={getTheme(material)}>
          <Root>
            <AppNavigator ref={setNavigator} />
          </Root>
        </StyleProvider>
      </Provider>
    );
  }
}

export default App;
