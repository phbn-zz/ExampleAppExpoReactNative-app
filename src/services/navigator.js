import { NavigationActions } from 'react-navigation';

let navigator;

export function setNavigator(nav) {
	navigator = nav;
}

export function navigate(routeName, params) {
	if (navigator) {
		navigator.dispatch(NavigationActions.navigate({ routeName, params }));
	}
}

export function setNavigationParams(params) {
	if (navigator) {
		navigator.dispatch(NavigationActions.setParams(params));
	}
}

export function getNavigator() {
	return navigator;
}
