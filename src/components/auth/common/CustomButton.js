import React, { Node } from 'react';
import { Button, Text, Icon } from 'native-base';
//* Remove styles to reset button style to NativeBase Theme

const styles = {
  buttonStyle: {
    margin: 10,
    marginLeft: 10,
    marginRight: 10,
    height: 50,
    backgroundColor: '#00b49c'
    //backgroundColor: "#fcd443"
  },
  buttonTextStyle: {
    color: '#fafbfd',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    paddingRight: 50
  }
};

type BtnProps = {
  onPress: Function,
  children: Node,
  icon: String
};

const CustomButton = ({ onPress, children, icon }: BtnProps) => {
  const { buttonStyle, buttonTextStyle } = styles;

  return (
    <Button Icon onPress={onPress} block style={buttonStyle}>
      <Icon name={icon || null} />
      <Text style={buttonTextStyle}>{children}</Text>
    </Button>
  );
};

export { CustomButton };

export default {};
