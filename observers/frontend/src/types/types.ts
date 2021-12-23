import {FormikErrors, FormikTouched} from "formik";
import React from "react";

export interface IRole{
	id?: number;
	title?: string;
}

export interface ITag{
	title: string;
	id?: number;
	questions?: IQuestion[];
}

export interface IUser{
	id: number;
	role: IRole;
	username: string;
	email: string;
	date_created: string;
	notifications: INotification[];
	profile_image: string;
	questions: IQuestion[];
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
	tags: ITag[];
	comments: IComment[];
}

export interface IComment{
	content: string;
	question_id: number;
	id: number;
	author_id: number;
	date_created: string;
	rating: number;
	is_answer: boolean;
}

export interface IArticle{
	title: string;
	content: string;
	id: number;
	date_created: string;
	likes: number;
	dislikes: number;
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

export enum QuestionsActionTypes{
	SET_LOADING = 'SET_LOADING',
	FETCH_QUESTIONS = 'FETCH_QUESTIONS',
	FETCH_QUESTIONS_SUCCESS = 'FETCH_QUESTIONS_SUCCESS',
	FETCH_QUESTIONS_ERROR = 'FETCH_QUESTIONS_ERROR',
	FETCH_QUESTION = 'FETCH_QUESTION',
	FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS',
	SET_SORTED_QUESTION = 'SET_SORTED_QUESTION',
}

export interface QuestionsState{
	questions?: IQuestion[] | null;
	question?: IQuestion | null;
	loading: boolean;
	error: null | string;
}

interface SetLoadingAction{
	type: QuestionsActionTypes.SET_LOADING;
}

interface FetchQuestionsAction{
	type: QuestionsActionTypes.FETCH_QUESTIONS;
}

interface FetchQuestionsSuccessAction{
	type: QuestionsActionTypes.FETCH_QUESTIONS_SUCCESS;
	payload: IQuestion[];
}

interface FetchQuestionsErrorAction{
	type: QuestionsActionTypes.FETCH_QUESTIONS_ERROR;
	payload: string;
}

interface FetchQuestionAction{
	type: QuestionsActionTypes.FETCH_QUESTION;
}

interface FetchQuestionSuccessAction{
	type: QuestionsActionTypes.FETCH_QUESTION_SUCCESS;
	payload: IQuestion;
}

interface SetSortedQuestions{
	type: QuestionsActionTypes.SET_SORTED_QUESTION;
	payload: IQuestion[];
}

export type QuestionsAction = FetchQuestionsAction | FetchQuestionsSuccessAction |
	FetchQuestionsErrorAction | FetchQuestionAction |
	FetchQuestionSuccessAction | SetSortedQuestions | SetLoadingAction;

export interface HeaderButtonProps {
	content: string;
	url: string;
	onClick?: () => void;
}

export interface SubmitButtonProps{
	content: string;
	onClick?: () => void;
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
	tags: ITag[];
}

export interface RegisterFieldsProps {
	errors: FormikErrors<any>;
	touched: FormikTouched<any>;
}

export interface AddQuestionFieldsProps {
	errors: FormikErrors<any>;
	touched: FormikTouched<any>;
}

export interface InfoProps{
	question: IQuestion | null | undefined;
	author: IUser | undefined;
}

export interface RegularButtonProps {
	content: string;
	onClick: () => void;
	className?: string;
}

export interface TagsProps{
	tags: ITag[];
	clickable: boolean;
}