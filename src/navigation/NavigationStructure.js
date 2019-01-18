import React from "react";
import { fadeIn } from "react-navigation-transitions";

import AuthWelcome from "../components/auth/AuthWelcome";
import PhoneNumberScreen from "../components/auth/AuthPhoneNumberScreen";
import AuthForgotPass from "../components/auth/AuthForgotPass";
import AuthSignIn from "../components/auth/AuthSignIn";
import AuthSignUp from "../components/auth/AuthSignUp";
import AuthSignUp from "../components/auth/AuthSignUp";
import ProfileGrid from "../components/profile/ProfileGrid";
import HomeScreen from "../components/home/HomeScreen";

import NativeBaseFooter from "./Footer";

import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";

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
          title: "Sign in to Sp8ces"
        })
      },
      signUp: {
        screen: AuthSignUp,
        navigationOptions: () => ({
          title: "Sign up for Sp8ces"
        })
      },
      phoneNumber: {
        screen: PhoneNumberScreen,
        navigationOptions: () => ({
          title: "Verification by phone"
        })
      },
      forgotPassword: {
        screen: AuthForgotPass,
        navigationOptions: () => ({
          title: "Forgot password?"
        })
      }
    },
    {
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: "#1f2024"
        },
        headerTintColor: "#fafbfd",
        headerLayoutPreset: "center",
        headerTitleStyle: {
          justifyContent: "center",
          alignSelf: "center",
          color: "#fafbfd",
          textAlign: "center"
        }
      },
      transitionConfig: () => fadeIn(800)
    }
  )
};

const homeStack = {
  screen: createStackNavigator(
    {
      homeScreen: {
        screen: HomeScreen,
        navigationOptions: () => ({
          title: "Map"
        })
      },
      profileGrid: {
        screen: ProfileGrid,
        navigationOptions: () => ({
          title: "Say hello to"
        })
      }
    },
    {
      mode: "modal"
    }
  )
};

const AppStack = createBottomTabNavigator(
  {
    home: homeStack
  },
  {
    tabBarPosition: "bottom",
    tabBarComponent: props => <NativeBaseFooter {...props} />
  }
);

const SwitchStack = createSwitchNavigator(
  {
    main: AppStack,
    auth: authStack
  },
  {
    initialRouteName: "auth"
  }
);

export default (AppNavigator = createAppContainer(SwitchStack));
