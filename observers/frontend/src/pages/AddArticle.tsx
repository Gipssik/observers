import React, {FC, useEffect} from 'react';
import AddArticleForm from "../components/Articles/AddArticleForm";
import {instance} from "../Instance";
import {IArticle} from "../types/types";
import {useNavigate} from "react-router-dom";
import {useTypedSelector} from "../hooks/useTypesSelector";

const AddArticle: FC = () => {
	const navigate = useNavigate();
	const authenticated = useTypedSelector(state => state.auth.authenticated);
	const user = useTypedSelector(state => state.user.user);

	const createArticle = (body: any) => {
		instance.post<IArticle>('news/articles/', body)
			.then(response => {
				navigate('/news');
			});
	}

	useEffect(() => {
		if(!authenticated){
			navigate('/login');
		}else if(user?.role.title !== 'Admin'){
			navigate('/404');
		}
	}, [authenticated]);

	return (
		<div className="add-question-container">
			<h1 className="register-title">Create an Article</h1>
			<AddArticleForm buttonText="create" onSubmit={createArticle}/>
		</div>
	);
};

export default AddArticle;