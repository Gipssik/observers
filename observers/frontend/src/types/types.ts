import {FormikErrors, FormikTouched} from "formik";

export interface IUser{
	id: number;
	username: string;
	email: string;
	date_created: string;
	notifications: INotification[];
	profile_image: string;
	questions: IQuestion[];
	// TODO: Finish User schema.
}

export interface INotification{
	id: number;
	question_id: number;
	title: string;
	user_id: number;
}

export interface IToken{
	access_token: string;
	token_type: string;
}

export interface IQuestion{
	id: number
	title: string;
	content: string;
	author_id: number;
	date_created: string;
	views: number;
}

export enum UserActionTypes {
	FETCH_USER = 'FETCH_USER',
	FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS',
	FETCH_USER_ERROR = 'FETCH_USER_ERROR',
	DELETE_USER = 'DELETE_USER',
}

export interface UserState {
	user: IUser | null;
	loading: boolean;
	error: null | string;
}

interface FetchUserAction{
	type: UserActionTypes.FETCH_USER;
}

interface FetchUserSuccessAction{
	type: UserActionTypes.FETCH_USER_SUCCESS;
	payload: IUser;
}

interface FetchUserErrorAction{
	type: UserActionTypes.FETCH_USER_ERROR;
	payload: string;
}

interface DeleteUserAction{
	type: UserActionTypes.DELETE_USER;
}

export type UserAction = FetchUserAction | FetchUserSuccessAction | FetchUserErrorAction | DeleteUserAction

export enum AuthActionTypes {
	SET_TRUE = 'SET_TRUE',
	SET_FALSE = 'SET_FALSE',
}

export interface AuthState {
	authenticated: boolean;
}

interface AuthTrueAction {
	type: AuthActionTypes.SET_TRUE;
	authenticated: boolean;
}

interface AuthFalseAction {
	type: AuthActionTypes.SET_FALSE;
	authenticated: boolean;
}

export type AuthAction = AuthTrueAction | AuthFalseAction;


export interface HeaderButtonProps {
	content: string;
	url: string;
	onClick?: () => void;
}

export interface SubmitButtonProps{
	content: string;
}

export interface RegisterFieldProps{
	content: string;
	type: string;
	id: string;
	errors: any;
	touched: any;
}

export interface MenuItemProps {
	content: string;
	url: string;
}

export interface LoginFieldsProps {
	errors: FormikErrors<any>;
	touched: FormikTouched<any>;
}

export interface ExProps{
	onClick: () => void;
}

export interface ModalProps{
	visible: boolean;
	setVisible: any;
}

export interface QuestionProps{
	id: number;
	title: string;
	content: string;
	views: number;
}

export interface RegisterFieldsProps {
	errors: FormikErrors<any>;
	touched: FormikTouched<any>;
}