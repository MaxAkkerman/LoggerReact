import {
	CHANGE_THEME,

} from "./types";

export function changeTheme(payload) {
	document.querySelector("html").setAttribute("data-theme", payload);
	localStorage.setItem("appTheme", payload);
	return {type: CHANGE_THEME, payload};
}
