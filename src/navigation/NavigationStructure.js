import { fadeIn } from 'react-navigation-transitions';

import {
	AuthWelcome,
	AuthSignUp,
	AuthSignIn,
	PhoneNumberScreen,
	AuthForgotPass
} from '../components/auth';
import AuthScreen from '../screens/AuthScreen';
import ProfileGrid from '../components/profile/ProfileGrid';
import HomeScreen from '../screens/HomeScreen';

import NativeBaseFooter from './Footer';

import {
	createBottomTabNavigator,
	createStackNavigator,
	createAppContainer,
	createSwitchNavigator
} from 'react-navigation';

const AuthStack = {
	screen: createStackNavigator(
		{
			authWelcome: {
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

const HomeStack = {
	screen: createStackNavigator(
		{
			homeScreen: {
				screen: HomeScreen,
				navigationOptions: () => ({
					title: 'Look at this'
				})
			},
			profileGrid: {
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
};

const AppStack = createBottomTabNavigator(
	{
		home: HomeStack
	},
	{
		tabBarPosition: 'bottom'
		/*tabBarComponent: props => <NativeBaseFooter {...props} />*/
	}
);

const SwitchStack = createSwitchNavigator(
	{
		App: AppStack,
		Auth: AuthStack
	},
	{
		initialRouteName: 'Auth'
	}
);

const AppNavigator = createAppContainer(SwitchStack);

export default AppNavigator;
