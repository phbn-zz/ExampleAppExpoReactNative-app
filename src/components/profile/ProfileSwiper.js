/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-jsx-bind */
import React, { Component } from 'react';
import { View, ImageBackground } from 'react-native';
import {
  Button,
  Icon,
  DeckSwiper,
  Text,
  Label,
  Body,
  Container
} from 'native-base';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import * as Animatable from 'react-native-animatable';
import { Segment, DangerZone } from 'expo'; // eslint-disable-line

class ProfileSwiper extends Component {
  constructor(props) {
    super(props);
    Segment.screen('checkedin profiles');
    this.createBranchUniversalObject();
    this.props.getCheckedInProfiles();
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
    console.log('branch object', this._branchUniversalObject);
  }
  
  async onShareLinkPress() {
    const { checked_in_space } = this.props.space;
    const { user } = this.props.session;
  
    const shareOptions = {
      messageHeader: "Come try out SP8CES",
      messageBody: "I'm working at "+checked_in_space.title+" today, and thought I would invite you to come work with me!",
      emailSubject: "Discount for SP8CES"
    };

    const linkProperties = {
      feature: 'share',
      channel: 'RNApp'
    };
    
    const controlParams = {
        $desktop_url: 'https://app.sp8ces.com/signup?referrer=' + user.uid
    };
    

    await this._branchUniversalObject.showShareSheet(shareOptions, linkProperties, controlParams);
  }

  render() {
    //return profileview if user has not completed own profile
    if(this.props.session.profile && !this.props.session.profile.visible) 
    return (<Container><View style={{flex:1, margin:20,justifyContent:'center'}}>
    <Text style={{padding:10}}>To view other profiles, please ensure that your profile is filled in and visible</Text>
    <Button
      block
      iconRight
      onPress={() => this.props.navigation.navigate('profile')}
    >
      <Text>Go to profile</Text>
      <Icon name="arrow-forward" />
    </Button></View></Container>);

    if (this.props.profiles.unseen_profiles > 0)
      this.props.resetUnseenProfiles();
    //if(this.props.profiles.checked_in_profiles == 0) return <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}><ActivityIndicator style={{alignSelf:'center'}}/></View>
    return (
      <Container>
        <View style={{ flex: 1 }}>
          <DeckSwiper
            ref={c => (this._profileSwiper = c)}
            dataSource={this.props.profiles.checked_in_profiles}
            looping={false}
            renderEmpty={() => (
              <View style={{justifyContent:"center", alignSelf:"center", padding:40}}>
                <Text>Want company? Invite a friend</Text>
                <Button full rounded onPress={this.onShareLinkPress.bind(this)}><Text>Invite</Text></Button>
              </View>
            )}
            renderItem={(profile, index) => (
              <View
                style={{
                  backgroundColor: '#fff',
                  margin: 2,
                  borderColor: '#ccc',
                  borderWidth: 1,
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  padding: 10,
                  flex: 1,
                  flexGrow: 1
                }}
              key={index}
              >
                {profile.firstcheckin && 
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      height: 30,
                      alignItems: 'center'
                    }}
                  >
                    <Icon
                      name="medal"
                      style={{ color: '#ED4A6A', marginRight: 10 }}
                    />
                    <Text>
                      {profile.name
                        ? profile.name.split(' ')[0]
                        : 'your new workmate'}
                      's first checkin! Say hi :)
                    </Text>
                  </View>
                }
                <View style={{ flexGrow: 0.4, alignItems: 'center' }}>
                  <ImageBackground
                    imageStyle={{ borderRadius: 10 }}
                    style={{
                      minHeight: 200,
                      flexGrow: 2,
                      justifyContent: 'flex-end'
                    }}
                    resizeMode="contain"
                    source={{
                      uri: profile.photo
                        ? profile.photo
                        : 'https://firebasestorage.googleapis.com/v0/b/sp8ces-778ef.appspot.com/o/userPhotos%2Fprofile_avatar.png?alt=media&token=b380e27e-d2e9-47bc-bfea-f09c571635d3'
                    }}
                  >
                    <View
                      style={{
                        alignItems: 'center',
                        alignSelf: 'flex-end',
                        flexWrap: 'wrap',
                        backgroundColor: 'rgba(255,255,255,0.5)'
                      }}
                    >
                      <Text style={{ fontWeight: 'bold' }}>{profile.name}</Text>
                      <Text>{profile.headline}</Text>
                      <Text style={{ fontSize: 12 }}>{profile.industry}</Text>
                    </View>
                  </ImageBackground>
                </View>
                <View
                  style={{
                    flexGrow: 0.4,
                    backgroundColor: 'rgba(0,0,0,0)',
                    marginTop: 10,
                    marginBottom: 10
                  }}
                >
                  <Body>
                    <Label>
                      Ask{' '}
                      {profile.name
                        ? profile.name.split(' ')[0]
                        : 'your new workmate'}{' '}
                      about
                    </Label>
                    <Text>{profile.intro}</Text>
                  </Body>
                </View>
              </View>
            )}
          />
        </View>
        <View
          style={{
            alignSelf: 'flex-end',
            justifyContent: 'center',
            padding: 4,
            width: '100%'
          }}
        >
          <Button
            block
            iconRight
            onPress={() => this._profileSwiper._root.swipeRight()}
          >
            <Text>NEXT SP8CER</Text>
            <Icon name="arrow-forward" />
          </Button>
        </View>
      </Container>
    );
  }
}

function mapStateToProps({ profiles, session, space }) {
  return { profiles, session, space };
}

export default connect(
  mapStateToProps,
  actions
)(ProfileSwiper);