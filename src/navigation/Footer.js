/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
import React from 'react';
import { withNavigation } from 'react-navigation';
import { Button, Text, Icon, Footer, FooterTab, Badge } from 'native-base';

const NativeBaseFooter = props => {
  const params = props.navigation.state.params || { unread: 0 };

  return (
    <Footer>
      <FooterTab>
        <Button
          vertical
          active={props.navigation.state.index === 0}
          style={{ paddingLeft: 25, paddingRight: 0 }}
          onPress={() => {
            props.navigation.navigate('map');
          }}
        >
          <Icon name="navigate" />
          <Text>Map</Text>
        </Button>
        <Button
          vertical
          active={props.navigation.state.index === 1}
          onPress={() => props.navigation.navigate('stats')}
        >
          <Icon name="briefcase" />
          <Text>Stats</Text>
        </Button>
        <Button
          vertical
          active={props.navigation.state.index === 3}
          style={{ paddingLeft: 0, paddingRight: 25 }}
          badge
          onPress={() => {
            props.navigation.navigate('notifications');
          }}
        >
          <Badge>
            <Text>{params.unread}</Text>
          </Badge>
          <Icon name="mail" />
          <Text>Notifications</Text>
        </Button>
      </FooterTab>
    </Footer>
  );
};

export default withNavigation(NativeBaseFooter);
