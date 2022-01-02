import {combineReducers} from "redux";
import {userReducer} from "./userReducer";
import {authReducer} from "./authReducer";
import {questionsReducer} from "./questionsReducer";
import {notificationsReducer} from "./notificationsReducer";

export const rootReducer = combineReducers({
	user: userReducer,
	auth: authReducer,
	questions: questionsReducer,
	notifications: notificationsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
