/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable import/no-namespace */

import React, { Component } from "react";
import { Text, Linking, ImageBackground, Platform } from "react-native";
import { Container } from "native-base";
import { CustomButton } from "../auth/common/";
import { IntentLauncherAndroid, Location } from "expo";
import { connect } from "react-redux";
import * as actions from "../../actions";

const styles = {
  containerStyle: {
    flex: 1,
    justifyContent: "center"
  },
  textStyle: {
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
    margin: 25
  }
};

type MapScreenPropsType = {
  setLocationProviderStatus: Function,
  fetchSpaces: Function,
  setUserLocation: Function
};

class LocationBox extends Component<MapScreenPropsType> {
  async reinitializeLocation() {
    console.log("executing after function");
    const status = await Location.getProviderStatusAsync();
    console.log(status);
    if (status.locationServicesEnabled === true) {
      const curLocation = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true
      });
      this.props.setLocationProviderStatus(true);
      this.props.fetchSpaces(curLocation);
      this.props.setUserLocation(curLocation);
      // const subscriber =

      await Location.watchPositionAsync(
        { distanceInterval: 50, enableHighAccuracy: true },
        location => {
          this.props.setUserLocation(location);
        }
      );
    }
  }

  render() {
    return (
      <ImageBackground
        source={require("../../assets/images/DarkMap.jpg")}
        imageStyle={{ resizeMode: "cover" }}
        style={{
          flex: 1,
          width: "100%",
          height: "100%"
        }}
      >
        <Container style={styles.containerStyle}>
          <Text style={styles.textStyle}>
            Enable location information to view Sp8ces in your area and
            check-in.
          </Text>
          <CustomButton
            onPress={() => {
              if (Platform.OS === "android") {
                IntentLauncherAndroid.startActivityAsync(
                  IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS
                ).then(async () => {
                  await this.reinitializeLocation();
                });
              } else {
                Linking.openURL("app-settings:").then(async () => {
                  await this.reinitializeLocation();
                });
              }
            }}
          >
            Open Location Information Settings
          </CustomButton>
        </Container>
      </ImageBackground>
    );
  }
}

function mapStateToProps({ space }) {
  return {
    location_available: space.location_available
  };
}

export default connect(
  mapStateToProps,
  actions
)(LocationBox);
