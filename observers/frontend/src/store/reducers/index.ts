import {combineReducers} from "redux";
import {userReducer} from "./userReducer";
import {authReducer} from "./authReducer";
import {questionsReducer} from "./questionsReducer";

export const rootReducer = combineReducers({
	user: userReducer,
	auth: authReducer,
	questions: questionsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
