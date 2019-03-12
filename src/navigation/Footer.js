import React from "react";
import { withNavigation } from "react-navigation";
import { Button, Text, Icon, Footer, FooterTab, Badge } from "native-base";

const NativeBaseFooter = props => {
  return (
    <Footer>
      <FooterTab>
        <Button
          vertical
          active={props.navigation.state.index === 0}
          style={{ paddingLeft: 25, paddingRight: 0 }}
          onPress={() => {
            props.navigation.navigate("map");
          }}
        >
          <Icon name="navigate" />
          <Text>Map</Text>
        </Button>
        <Button
          vertical
          active={props.navigation.state.index === 1}
          onPress={() => props.navigation.navigate("stats")}
        >
          <Icon name="briefcase" />
          <Text>Stats</Text>
        </Button>
        <Button
          vertical
          active={props.navigation.state.index === 3}
          style={{ paddingLeft: 0, paddingRight: 25 }}
          onPress={() => {
            props.navigation.navigate("notifications");
          }}
        >
          <Icon name="mail" />
          <Text>Messages</Text>
        </Button>
      </FooterTab>
    </Footer>
  );
};

export default withNavigation(NativeBaseFooter);
