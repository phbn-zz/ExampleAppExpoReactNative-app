/* eslint-disable react/no-jsx-bind, react-native/no-inline-styles */
import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { Thumbnail, ActionSheet } from 'native-base';
import { Constants, ImagePicker, Permissions } from 'expo'; // eslint-disable-line
import firebaseService from '../../environments/firebase';

const BUTTONS = [
  'Take photo with camera',
  'Choose image from camera roll',
  'Cancel'
];
const DESTRUCTIVE_INDEX = 2;
const CANCEL_INDEX = 3;

console.disableYellowBox = true;

type PropsType =  {
  profileimage: String
};

type StateType = {
  profileimage: String,
  uploading: Boolean,
  phone: String
};

class ProfileImagePicker extends React.Component<PropsType, StateType> {
  constructor(props) {
    super(props);
    this.state = {
      profileimage: null,
      uploading: false,
      phone: ''
    };
    this._maybeRenderUploadingOverlay = this._maybeRenderUploadingOverlay.bind(
      this
    );
  }

  async componentDidMount() {
    const userPhoto = await firebaseService.auth().currentUser.photoURL;
    this.setState({ profileimage: userPhoto });
  }

  render() {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        {this._maybeRenderImage()}
        {this._maybeRenderUploadingOverlay()}
        <StatusBar barStyle="default" />
      </View>
    );
  }

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center'
            }
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let { profileimage } = this.state;
    if (!profileimage) {
      profileimage = 'http://cdn.onlinewebfonts.com/svg/img_947.png';
    }

    let imageStyle = {
      width: 125,
      height: 125,
      marginTop: 5
    };

    if (this.props.imageStyle == 'large') {
      imageStyle = {
        width: 300,
        height: 300,
        margin: 10
      };
    }

    return (
      <TouchableOpacity
        onPress={() => {
          this.imagePress();
        }}
      >
        <Thumbnail large style={imageStyle} source={{ uri: profileimage }} />
      </TouchableOpacity>
    );
  };

  imagePress = () => {
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
        title: 'Add photo'
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            this._takePhoto();
            break;
          case 1:
            this._pickImage();
            break;
        }
      }
    );
  };

  _takePhoto = async () => {
    const status_camera = await Permissions.askAsync(Permissions.CAMERA);
    console.log(status_camera);
    if (status_camera) {
      const pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        aspect: [4, 4]
      });

      this._handleImagePicked(pickerResult);
    }
  };

  _pickImage = async () => {
    const status_camera_roll = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    console.log(status_camera_roll);
    if (status_camera_roll) {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 4]
      });

      this._handleImagePicked(pickerResult);
    }
  };

  _handleImagePicked = async pickerResult => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        uploadUrl = await uploadImageAsync(
          pickerResult.uri,
          firebaseService.auth().currentUser.uid
        );
        console.log("uploaded image to", uploadUrl);
        await firebaseService
          .auth()
          .currentUser.updateProfile({ photoURL: uploadUrl });
        this.setState({ profileimage: uploadUrl });
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
    }
  };
}

async function uploadImageAsync(uri, userId) {
  try {
    console.log("uploading image asynchronously");
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebaseService.storage()
    .ref('/userPhotos')
    .child(userId);
    const snapshot = await ref.put(blob);
    return await ref.getDownloadURL();
  }
  catch(e) {
    console.log(e);
  }
}

export default ProfileImagePicker;
