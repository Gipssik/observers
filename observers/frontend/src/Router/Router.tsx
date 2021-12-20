import RegisterForm from "../Pages/RegisterForm";
import React from "react";
import LoginForm from "../Pages/LoginForm";
import Page404 from "../Pages/Page404";
import {Navigate} from "react-router-dom";
import Questions from "../Pages/Questions";
import SelfAccount from "../Pages/SelfAccount";
import Question from "../Pages/Question";
import Account from "../Pages/Account";

interface IRoute{
	path: string;
	component: any;
}

export const router: IRoute[] = [
	{path: '/register', component: <RegisterForm/>},
	{path: '/login', component: <LoginForm/>},
	{path: '/account', component: <SelfAccount/>},
	{path: '/account/:username', component: <Account/>},
	{path: '/questions', component: <Questions/>},
	{path: '/questions/:id', component: <Question/>},
	{path: '/404', component: <Page404/>},
	{path: '*', component: <Navigate to='/404'/>},
];
