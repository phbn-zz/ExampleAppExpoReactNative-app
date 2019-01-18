/* eslint-disable react/jsx-no-bind */
import React, { Component } from "react";
import { View, FlatList, Image, TouchableOpacity } from "react-native";
import { Button, Icon, Text, Container } from "native-base";
import ProfileCard from "./ProfileCard";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { Loader } from "../auth/common";
import { Segment, DangerZone } from "expo"; // eslint-disable-line

// const screenWidth = Dimensions.get('window').width;
// const rowWidth = screenWidth / 2;

class ProfileGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      profiles: [],
      visible: false
    };
    this.cacheCheckedInProfiles();
    Segment.screen("checkedin profiles");
    this.createBranchUniversalObject();
  }

  async cacheCheckedInProfiles() {
    await this.props.getCheckedInProfiles();
    console.log("Got checked in profiles...");
    await this.setState({ profiles: this.props.profiles.checked_in_profiles });
    const avatar = this.props.profiles.checked_in_profiles.map(
      object => object.photo
    );
    const cacheImages = avatar.map(photo => {
      if ((photo === "") | (photo === null)) {
        return null;
      }
      return Image.prefetch(photo).catch(() => null);
    });

    return Promise.all(cacheImages).then(() => {
      this.setState({ profiles: this.props.profiles.checked_in_profiles });
      console.log("Cached all profiles");
      this.setState({ isReady: true });
    });
  }

  async createBranchUniversalObject() {
    const { checked_in_space } = this.props.space;
    this._branchUniversalObject = await DangerZone.Branch.createBranchUniversalObject(
      `spaceinvite_${checked_in_space.id}`,
      {
        title: checked_in_space.title,
        metadata: {
          params: JSON.stringify({ medId: checked_in_space.id })
        }
      }
    );
    console.log("branch object", this._branchUniversalObject);
  }

  async onShareLinkPress() {
    const { checked_in_space } = this.props.space;

    const shareOptions = {
      messageHeader: "Come tryout SP8CES workspace",
      messageBody:
        "I'm working at " +
        checked_in_space.title +
        " today, and thought I would invite you to come work with me!"
    };

    await this._branchUniversalObject.showShareSheet(shareOptions);
  }

  render() {
    //return profileview if user has not completed own profile
    if (!this.props.session.profile.visible)
      return (
        <Container>
          <View style={{ flex: 1, margin: 20, justifyContent: "center" }}>
            <Text style={{ padding: 10 }}>
              To view other profiles, please ensure that your profile is filled
              in and visible
            </Text>
            <Button
              block
              iconRight
              onPress={() => this.props.navigation.navigate("profile")}
            >
              <Text>Go to profile</Text>
              <Icon name="arrow-forward" />
            </Button>
          </View>
        </Container>
      );
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
