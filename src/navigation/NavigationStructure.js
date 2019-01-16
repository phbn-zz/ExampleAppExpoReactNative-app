import React from 'react';
import { fadeIn } from 'react-navigation-transitions';

import NativeBaseFooter from './Footer';

import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';

const headerStyle = {
  headerStyle: {
    backgroundColor: '#FFFFFF',
    elevation: 1, // remove shadow on Android
    shadowOpacity: 1 // remove shadow on iOS
  }
};

const authStack = {
  screen: createStackNavigator(
    {
      main: {
        screen: AuthWelcome,
        navigationOptions: {
          header: null
        }
      },
      signIn: {
        screen: AuthSignIn,
        navigationOptions: () => ({
          title: 'Sign in to Sp8ces'
        })
      },
      signUp: {
        screen: AuthSignUp,
        navigationOptions: () => ({
          title: 'Sign up for Sp8ces'
        })
      },
      phoneNumber: {
        screen: PhoneNumberScreen,
        navigationOptions: () => ({
          title: 'Verification by phone'
        })
      },
      forgotPassword: {
        screen: AuthForgotPass,
        navigationOptions: () => ({
          title: 'Forgot password?'
        })
      }
    },
    {
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#1f2024'
        },
        headerTintColor: '#fafbfd',
        headerLayoutPreset: 'center',
        headerTitleStyle: {
          justifyContent: 'center',
          alignSelf: 'center',
          color: '#fafbfd',
          textAlign: 'center'
        }
      },
      transitionConfig: () => fadeIn(800)
    }
  )
};

const homeStack = {
  screen: createStackNavigator(
    {
      main: {
        screen: MapScreen,
        navigationOptions: () => ({
          title: 'Map'
        })
      },
      profileSwiper: {
        screen: ProfileGrid,
        navigationOptions: () => ({
          title: 'Say hello to'
        })
      }
    },
    {
      mode: 'modal'
    }
  )
  }
};


const AppStack = createBottomTabNavigator(
  {
    home: homeStack
  },
  {
    tabBarPosition: 'bottom',
    tabBarComponent: props => <NativeBaseFooter {...props} />
  }
);

const SwitchStack = createSwitchNavigator(
  {
    main: AppStack,
    auth: authStack
  },
  {
    initialRouteName: 'auth'
  }
);

export default AppNavigator = createAppContainer(SwitchStack);
