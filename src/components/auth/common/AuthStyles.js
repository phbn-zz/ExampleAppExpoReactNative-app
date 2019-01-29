/**
 * All the auth screens inherits from this screen
 */
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export const backgroundImage = require('../../../../assets/images/background.jpg');

export const authColors = {
	White: '#fafbfd',
	ShadowColor: 'rgba(52, 52, 52, 0.75)'
};

export const authStyles = {
	containerStyle: {
		paddingBottom: 50,
		alignSelf: 'center',
		justifyContent: 'center',
		width: windowWidth * 0.85
	},
	containerFormStyle: {
		alignSelf: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		width: windowWidth * 0.9
	},
	clickableText: {
		textDecorationLine: 'underline',
		paddingTop: 20,
		color: authColors.White,
		fontSize: 16,
		flexWrap: 'wrap',
		fontWeight: 'bold',
		textAlign: 'center',
		textShadowColor: authColors.ShadowColor,
		textShadowRadius: 3,
		textShadowOffset: { width: 1, heigh: 1 }
	},
	txtGrey: {
		color: authColors.White,
		fontSize: 16,
		flexWrap: 'wrap',
		fontWeight: 'bold',
		textAlign: 'center',
		textShadowColor: authColors.ShadowColor,
		textShadowRadius: 4,
		textShadowOffset: { width: 1, height: 1 },
		paddingTop: 20
	},
	txtGreet: {
		fontFamily: 'Montserrat',
		color: authColors.White,
		fontSize: 16,
		flexWrap: 'wrap',
		fontWeight: 'bold',
		paddingBottom: 20,
		paddingTop: 35 - 35 * 0.75,
		textAlign: 'center',
		textShadowColor: authColors.ShadowColor,
		textShadowRadius: 4,
		textShadowOffset: { width: 2, height: 2 }
	}
};
