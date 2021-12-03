import {
	CHANGE_THEME,

} from "../actions/types";

const initialState = {
	appTheme: null,

};

const appReducer = (state = initialState, {type, payload}) => {
	switch (type) {
		case CHANGE_THEME:
			return {
				...state,
				appTheme: payload,
			};
		default:
			return state;
	}
};

export default appReducer;
