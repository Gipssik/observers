import React, {FC, useEffect} from 'react';
import {useTypedSelector} from "../../hooks/useTypesSelector";
import {useDispatch} from "react-redux";
import Loader from "../Loader/Loader";
import Table from "./Table";
import {fetchArticles} from "../../store/action-creators/articles";
import {useNavigate} from "react-router-dom";
import {AdminActionTypes, IArticle} from "../../types/types";
import {instance} from "../../Instance";

const Articles: FC = () => {
	const {articles, loading, error} = useTypedSelector(state => state.articles);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onEdit = (article: IArticle) => {
		navigate(`/news/${article.id}/edit`);
	}

	const onDelete = (article: IArticle) => {
		const onConfirm = () => {
			instance.delete(`news/articles/${article.id}/`)
				.then(response => {
					dispatch(fetchArticles());
					dispatch({type: AdminActionTypes.SET_MODAL_SHOW, payload: false});
				})
				.catch(error => {
					dispatch({type: AdminActionTypes.SET_MODAL_SHOW, payload: false});
				})
		}

		dispatch({type: AdminActionTypes.SET_MODAL_CONTENT, payload: "Are you sure you want to delete this article?"});
		dispatch({type: AdminActionTypes.SET_MODAL_TYPE, payload: "confirm"});
		dispatch({type: AdminActionTypes.SET_MODAL_SHOW, payload: true});
		dispatch({type: AdminActionTypes.SET_MODAL_ON_CONFIRM, payload: onConfirm});
	}

	useEffect(() => {
		if(!articles)
			dispatch(fetchArticles());
	}, []);

	return (
		<>
			{
				loading ?
					<Loader/>
					:
					(articles ? <Table onEdit={onEdit} onDelete={onDelete} objectArray={articles}/> : null)
			}
		</>
	);
};

export default Articles;