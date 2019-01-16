import React, { Component } from 'react';
import { Button, Thumbnail } from 'native-base';
import { connect } from 'react-redux';

class ProfileButton extends Component {
  render() {
    const { session, onPress } = this.props;
    const { user } = session;

    return (
      <Button
        transparent
        style={{ paddingLeft: 10, paddingTop: 15 }}
        onPress={onPress}
      >
        <Thumbnail small source={{ uri: user.photoURL }} />
      </Button>
    );
  }
}

function mapStateToProps({ session }) {
  return { session };
}

export default connect(mapStateToProps)(ProfileButton);
