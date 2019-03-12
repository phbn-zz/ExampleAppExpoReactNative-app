import React, { Component } from "react";
import firebaseService from "../services/firebase";
import { View, Text, Image, Dimensions } from "react-native";
import { Spinner } from "native-base";
import { connect } from "react-redux";
import * as actions from "../actions";
import { CustomButton } from "../components/auth/common/CustomButton";

type HomeScreenProps = {
  profile: Object
};

const width = Dimensions.get("window").width;
//const height: Dimensions.get('window').height

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  userContainer: {
    padding: 20,
    width: width * 0.9,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  picture: {
    width: 200,
    height: 200,
    borderRadius: 100,
    resizeMode: "cover",
    marginBottom: 15,
    borderColor: "black",
    borderWidth: 1,
    alignSelf: "center"
  },
  intro: {
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 10,
    marginRight: 10
  },
  item: {
    flexDirection: "row",
    marginVertical: 5
  },
  label: {
    marginRight: 10
  },
  value: {
    fontWeight: "bold",
    marginLeft: 10
  },
  linkedInContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  labelContainer: {
    flex: 0.7,
    alignItems: "flex-end"
  },
  valueContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start"
  }
};

class HomeScreen extends Component<HomeScreenProps> {
  state = {
    profilePhoto: null
  };

  componentDidMount() {
    if (firebaseService.auth().currentUser.photoURL === null) {
      return this.setState({
        profilePhoto:
          "https://cdn.mos.cms.futurecdn.net/84b98d4b043dcf322bcacfa044ff3dfc.jpeg"
      });
    }
    this.setState({
      profilePhoto: firebaseService.auth().currentUser.photoURL
    });
  }

  renderItem(label, value) {
    return (
      <View style={styles.item}>
        <View>
          <Text style={styles.label}>{label}</Text>
        </View>
        <Text>👉</Text>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{value}</Text>
        </View>
      </View>
    );
  }

  render() {
    const { profile } = this.props;

    if (profile === null || this.state.profilePhoto === null) {
      return <Spinner />;
    }
    console.log(profile);
    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <Text style={styles.intro}>
            Congratulations! You signed into my app. Its still pretty empty
            here, but I made you a profile:
          </Text>
        </View>
        <View style={styles.userContainer}>
          <Image
            style={styles.picture}
            source={{
              uri: this.state.profilePhoto
            }}
          />
          {this.renderItem("Email", profile.email)}
          {this.renderItem("First name", profile.firstName)}
          {this.renderItem("Last name", profile.lastName)}
          {this.renderItem("Headline", profile.headline)}
        </View>
        <CustomButton onPress={() => this.props.logoutUser()}>
          Log out
        </CustomButton>
      </View>
    );
  }
}

function mapStateToProps({ session }) {
  return {
    profile: session.profile
  };
}

export default connect(
  mapStateToProps,
  actions
)(HomeScreen);
