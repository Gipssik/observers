import {combineReducers} from "redux";
import {userReducer} from "./userReducer";
import {authReducer} from "./authReducer";
import {questionsReducer} from "./questionsReducer";
import {notificationsReducer} from "./notificationsReducer";
import {articlesReducer} from "./articlesReducer";
import {chatReducer} from "./chatReducer";
import {adminReducer} from "./adminReducer";
import {rolesReducer} from "./rolesReducer";
import {usersReducer} from "./usersReducer";
import {tagsReducer} from "./tagsReducer";
import {commentsReducer} from "./commentsReducer";

export const rootReducer = combineReducers({
	user: userReducer,
	users: usersReducer,
	auth: authReducer,
	questions: questionsReducer,
	notifications: notificationsReducer,
	articles: articlesReducer,
	chat: chatReducer,
	admin: adminReducer,
	roles: rolesReducer,
	tags: tagsReducer,
	comments: commentsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
