import { Toast } from 'native-base';

export const show_notification = text => {
	Toast.show({ text, position: 'bottom', buttonText: 'OK', duration: 8000 });
};

export const show_error = text => {
	Toast.show({
		text,
		position: 'bottom',
		buttonText: 'OK',
		type: 'danger',
		duration: 8000
	});
};

export const show_warning = text => {
	Toast.show({ text, position: 'bottom', buttonText: 'OK', duration: 5000 });
};

export const show_success = text => {
	Toast.show({
		text,
		position: 'bottom',
		buttonText: 'OK',
		type: 'success',
		duration: 5000
	});
};
