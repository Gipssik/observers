import RegisterForm from "../pages/RegisterForm";
import React from "react";
import LoginForm from "../pages/LoginForm";
import Page404 from "../pages/Page404";
import {Navigate} from "react-router-dom";
import Questions from "../pages/Questions";
import SelfAccount from "../pages/SelfAccount";
import Question from "../pages/Question";
import UserAccount from "../pages/UserAccount";
import AddQuestion from "../pages/AddQuestion";
import EditQuestion from "../pages/EditQuestion";
import Welcome from "../pages/Welcome";
import Articles from "../pages/Articles";
import Article from "../pages/Article";
import AddArticle from "../pages/AddArticle";
import EditArticle from "../pages/EditArticle";

interface IRoute{
	path: string;
	component: any;
}

export const router: IRoute[] = [
	{path: '/', component: <Welcome/>},
	{path: '/register', component: <RegisterForm/>},
	{path: '/login', component: <LoginForm/>},
	{path: '/account', component: <SelfAccount/>},
	{path: '/account/:username', component: <UserAccount/>},
	{path: '/ask-question', component: <AddQuestion/>},
	{path: '/questions', component: <Questions/>},
	{path: '/questions/:id/edit', component: <EditQuestion/>},
	{path: '/questions/:id', component: <Question/>},
	{path: '/create-news', component: <AddArticle/>},
	{path: '/news', component: <Articles/>},
	{path: '/news/:id/edit', component: <EditArticle/>},
	{path: '/news/:id', component: <Article/>},
	{path: '/404', component: <Page404/>},
	{path: '*', component: <Navigate to='/404'/>},
];
