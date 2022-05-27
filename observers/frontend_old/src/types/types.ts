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
	profile_image: string;
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
}

export interface IComment{
	content: string;
	question_id: number;
	id: number;
	author_id: number;
	date_created: string;
	is_answer: boolean;
}

export interface IArticle{
	title: string;
	content: string;
	id: number;
	date_created: string;
	likes: IUser[];
	dislikes: IUser[];
}

export interface IMessage{
	user: string;
	message: string;
	connection?: boolean;
	time?: string;
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

export enum NotificationsActionTypes{
	FETCH_NOTIFICATIONS = 'FETCH_NOTIFICATIONS',
	FETCH_NOTIFICATIONS_SUCCESS = 'FETCH_NOTIFICATIONS_SUCCESS',
	FETCH_NOTIFICATIONS_ERROR = 'FETCH_QUESTIONS_ERROR',
}

export interface NotificationsState{
	notifications?: INotification[] | null;
	loading: boolean;
	error: null | string;
}

interface FetchNotificationsAction{
	type: NotificationsActionTypes.FETCH_NOTIFICATIONS;
}

interface FetchNotificationsSuccessAction{
	type: NotificationsActionTypes.FETCH_NOTIFICATIONS_SUCCESS;
	payload: INotification[];
}

interface FetchNotificationsErrorAction{
	type: NotificationsActionTypes.FETCH_NOTIFICATIONS_ERROR;
	payload: string;
}

export type NotificationsAction = FetchNotificationsAction
	| FetchNotificationsSuccessAction | FetchNotificationsErrorAction;

export enum ArticlesActionTypes{
	FETCH_ARTICLES = 'FETCH_ARTICLES',
	FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS',
	FETCH_ARTICLE = 'FETCH_ARTICLE',
	FETCH_ARTICLE_SUCCESS = 'FETCH_ARTICLE_SUCCESS',
	FETCH_ARTICLES_ERROR = 'FETCH_ARTICLES_ERROR',
}

export interface ArticlesState{
	articles?: IArticle[] | null;
	article?: IArticle | null;
	loading: boolean;
	error: null | string;
}

interface FetchArticlesAction{
	type: ArticlesActionTypes.FETCH_ARTICLES;
}

interface FetchArticlesSuccessAction{
	type: ArticlesActionTypes.FETCH_ARTICLES_SUCCESS;
	payload: IArticle[];
}

interface FetchArticleAction{
	type: ArticlesActionTypes.FETCH_ARTICLE;
}

interface FetchArticleSuccessAction{
	type: ArticlesActionTypes.FETCH_ARTICLE_SUCCESS;
	payload: IArticle;
}

interface FetchArticlesErrorAction{
	type: ArticlesActionTypes.FETCH_ARTICLES_ERROR;
	payload: string;
}

export type ArticlesAction = FetchArticlesAction | FetchArticleAction | FetchArticleSuccessAction
	| FetchArticlesSuccessAction | FetchArticlesErrorAction;

export enum ChatActionTypes{
	CREATE_CONNECTION = 'CREATE_CONNECTION',
	SET_ONOPEN = 'SET_ONOPEN',
	SET_ONCLOSE = 'SET_ONCLOSE',
	SET_ONMESSAGE = 'SET_ONMESSAGE',
	ADD_MESSAGE = 'ADD_MESSAGE',
	SET_CONNECTED = 'SET_CONNECTED',
	CLEAR_STATE = 'CLEAR_STATE',
}

export interface ChatState{
	messages: IMessage[] | null;
	connected: boolean;
	ws: WebSocket | null;
}

interface CreateConnectionAction{
	type: ChatActionTypes.CREATE_CONNECTION;
	payload: string;
}

interface SetOnOpenAction{
	type: ChatActionTypes.SET_ONOPEN;
	payload: any;
}

interface SetOnCloseAction{
	type: ChatActionTypes.SET_ONCLOSE;
	payload: any;
}

interface SetOnMessageAction{
	type: ChatActionTypes.SET_ONMESSAGE;
	payload: any;
}

interface AddMessageAction{
	type: ChatActionTypes.ADD_MESSAGE;
	payload: IMessage;
}

interface SetConnectedAction{
	type: ChatActionTypes.SET_CONNECTED;
	payload: boolean;
}

interface ClearStateAction{
	type: ChatActionTypes.CLEAR_STATE;
}

export type ChatAction = CreateConnectionAction | AddMessageAction | SetConnectedAction |
	SetOnOpenAction | SetOnCloseAction | SetOnMessageAction | ClearStateAction;

export enum AdminActionTypes{
	SET_ACTIVE = 'SET_ACTIVE',
	SET_MODAL_CONTENT = 'SET_MODAL_CONTENT',
	SET_MODAL_TYPE = 'SET_MODAL_TYPE',
	SET_MODAL_SHOW = 'SET_MODAL_SHOW',
	SET_MODAL_ON_CONFIRM = 'SET_MODAL_ON_CONFIRM',
}

export interface AdminState{
	active?: string | null;
	modalContent?: string | null;
	modalType?: string;
	showModal?: boolean;
	onConfirm?: () => void;
}

interface SetActiveAction{
	type: AdminActionTypes.SET_ACTIVE;
	payload: string;
}

interface SetModalContentAction{
	type: AdminActionTypes.SET_MODAL_CONTENT;
	payload: string;
}

interface SetModalTypeAction{
	type: AdminActionTypes.SET_MODAL_TYPE;
	payload: string;
}

interface SetModalShowAction{
	type: AdminActionTypes.SET_MODAL_SHOW;
	payload: boolean;
}

interface SetModalOnConfirmAction{
	type: AdminActionTypes.SET_MODAL_ON_CONFIRM;
	payload: () => void;
}

export type AdminAction = SetActiveAction | SetModalContentAction | SetModalTypeAction
	| SetModalShowAction | SetModalOnConfirmAction;

export enum RolesActionTypes{
	FETCH_ROLES = 'FETCH_ROLES',
	FETCH_ROLES_SUCCESS = 'FETCH_ROLES_SUCCESS',
	FETCH_ROLES_ERROR = 'FETCH_ROLES_ERROR',
}

export interface RolesState{
	roles?: IRole[] | null;
	loading: boolean;
	error: null | string;
}

interface FetchRolesAction{
	type: RolesActionTypes.FETCH_ROLES;
}

interface FetchRolesSuccessAction{
	type: RolesActionTypes.FETCH_ROLES_SUCCESS;
	payload: IRole[];
}

interface FetchRolesErrorAction{
	type: RolesActionTypes.FETCH_ROLES_ERROR;
	payload: string;
}

export type RolesAction = FetchRolesAction
	| FetchRolesSuccessAction | FetchRolesErrorAction;

export enum UsersActionTypes{
	FETCH_USERS = 'FETCH_USERS',
	FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS',
	FETCH_USERS_ERROR = 'FETCH_USERS_ERROR',
}

export interface UsersState{
	users?: IUser[] | null;
	loading: boolean;
	error: null | string;
}

interface FetchUsersAction{
	type: UsersActionTypes.FETCH_USERS;
}

interface FetchUsersSuccessAction{
	type: UsersActionTypes.FETCH_USERS_SUCCESS;
	payload: IUser[];
}

interface FetchUsersErrorAction{
	type: UsersActionTypes.FETCH_USERS_ERROR;
	payload: string;
}

export type UsersAction = FetchUsersAction
	| FetchUsersSuccessAction | FetchUsersErrorAction;

export enum TagsActionTypes{
	FETCH_TAGS = 'FETCH_TAGS',
	FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS',
	FETCH_TAGS_ERROR = 'FETCH_TAGS_ERROR',
}

export interface TagsState{
	tags?: ITag[] | null;
	loading: boolean;
	error: null | string;
}

interface FetchTagsAction{
	type: TagsActionTypes.FETCH_TAGS;
}

interface FetchTagsSuccessAction{
	type: TagsActionTypes.FETCH_TAGS_SUCCESS;
	payload: ITag[];
}

interface FetchTagsErrorAction{
	type: TagsActionTypes.FETCH_TAGS_ERROR;
	payload: string;
}

export type TagsAction = FetchTagsAction | FetchTagsSuccessAction | FetchTagsErrorAction;

export enum CommentsActionTypes{
	FETCH_COMMENTS = 'FETCH_COMMENTS',
	FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS',
	FETCH_COMMENTS_ERROR = 'FETCH_COMMENTS_ERROR',
}

export interface CommentsState{
	comments?: IComment[] | null;
	loading: boolean;
	error: null | string;
}

interface FetchCommentsAction{
	type: CommentsActionTypes.FETCH_COMMENTS;
}

interface FetchCommentsSuccessAction{
	type: CommentsActionTypes.FETCH_COMMENTS_SUCCESS;
	payload: IComment[];
}

interface FetchCommentsErrorAction{
	type: CommentsActionTypes.FETCH_COMMENTS_ERROR;
	payload: string;
}

export type CommentsAction = FetchCommentsAction
	| FetchCommentsSuccessAction | FetchCommentsErrorAction;

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
	touched?: any;
	handleChange?: (e: any) => void;
	value?: string;
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
	setEditor: React.Dispatch<React.SetStateAction<undefined>>;
	editorErrors: string;
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

export interface UserOptionsProps{
	onClick: () => void;
	width: number;
	height: number;
}

export interface AccountEditProps{
	setLoading: any;
	setModal?: any;
	setModalData?: any;
}

export interface IconProps{
	onClick?: () => void;
	className?: string;
}

export interface AddArticleFormProps{
	title?: string;
	content?: string;
	buttonText?: string;
	onSubmit?: any;
}

export interface AddQuestionFormProps{
	title?: string;
	tags?: string[];
	content?: string;
	buttonText?: string;
	onSubmit: any;
}

export interface LogoProps{
	className?: string;
}

export interface NotificationProps{
	notification: INotification;
	setVisible: any;
}

export interface PreviewProps{
	content: string
}

export interface AddCommentProps{
	questionId?: number;
	commentId?: number;
	buttonText?: string;
	edit?: boolean;
	value?: string;
	setEditing?: any;
}

export interface CommentProps{
	comment: IComment;
	user: IUser;
}

export interface CommentsProps{
	comments: IComment[];
	commentators: IUser[];
}

export interface ArrowBackProps{
	onClick: () => void;
}

export interface UserQuestionProps{
	question: IQuestion;
}

export interface UserQuestionsProps{
	questions: IQuestion[];
}
