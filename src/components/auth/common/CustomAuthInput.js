import React from 'react';
import { Input, Item } from 'native-base';

//* Remove styles to reset Input style to NativeBase Theme

const styles = {
  formTextStyle: {
    paddingLeft: 17,
    fontSize: 17,
    fontWeight: 'bold'
  },
  ItemStyle: {
    margin: 5,
    backgroundColor: '#fff'
  }
};

export const CustomAuthInput = props => (
  <Item style={styles.ItemStyle} rounded>
    <Input
      style={styles.formTextStyle}
      autoCorrect={false}
      {...props} // doing this provides better control
    />
  </Item>
);

export default {};
