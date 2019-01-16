/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-no-bind */
import React, { Component } from 'react';
import { Card, CardItem, Text, Body } from 'native-base';
import { Image } from 'react-native';
import { withNavigation } from 'react-navigation';

type ProfileCardProps = {
  headline: String,
  photo: String,
  name: String,
  profileObject: Object,
  navigation: Object
};

const styles = {
  bodyStyle: {
    margin: 5
  },
  imageStyle: {
    width: null,
    height: 200,
    flex: 1,
    marginBottom: 5
  }
};

class ProfileCard extends Component<ProfileCardProps> {
  render() {
    const { headline, photo, name, profileObject } = this.props;
    return (
      <Card>
        <CardItem
          cardBody
          button
          onPress={() => {
            console.log(profileObject);
            this.props.navigation.navigate('profileViewer', { profileObject });
          }}
        >
          <Image
            source={{
              uri:
                photo ||
                'https://firebasestorage.googleapis.com/v0/b/sp8ces-778ef.appspot.com/o/userPhotos%2Fprofile_avatar.png?alt=media&token=b380e27e-d2e9-47bc-bfea-f09c571635d3'
            }}
            style={styles.imageStyle}
          />
        </CardItem>
        <Body style={styles.bodyStyle}>
          <Text style={{ textAlign: 'center', fontSize: 16 }}>{name}</Text>
          <Text style={{ textAlign: 'center', fontSize: 13, color: 'grey' }}>
            {headline}
          </Text>
        </Body>
      </Card>
    );
  }
}

export default withNavigation(ProfileCard);
