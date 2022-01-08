import {combineReducers} from "redux";
import {userReducer} from "./userReducer";
import {authReducer} from "./authReducer";
import {questionsReducer} from "./questionsReducer";
import {notificationsReducer} from "./notificationsReducer";
import {articlesReducer} from "./articlesReducer";
import {chatReducer} from "./chatReducer";

export const rootReducer = combineReducers({
	user: userReducer,
	auth: authReducer,
	questions: questionsReducer,
	notifications: notificationsReducer,
	articles: articlesReducer,
	chat: chatReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
