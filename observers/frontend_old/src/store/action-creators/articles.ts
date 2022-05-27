import {Dispatch} from "redux";
import {instance} from "../../Instance";
import {ArticlesAction, ArticlesActionTypes, IArticle} from "../../types/types";

export const fetchArticles = () => {
	return async (dispatch: Dispatch<ArticlesAction>) => {
		dispatch({type: ArticlesActionTypes.FETCH_ARTICLES});
		instance.get<IArticle[]>('news/articles/')
			.then(response => {
				dispatch({type: ArticlesActionTypes.FETCH_ARTICLES_SUCCESS, payload: response.data});
			})
			.catch(error => {
				dispatch({
					type: ArticlesActionTypes.FETCH_ARTICLES_ERROR,
					payload: 'Error while loading articles'
				});
			})
	}
}

export const fetchArticle = (articleId: number) => {
	return async (dispatch: Dispatch<ArticlesAction>) => {
		dispatch({type: ArticlesActionTypes.FETCH_ARTICLE});
		instance.get<IArticle>(`news/articles/${articleId}/`)
			.then(response => {
				dispatch({type: ArticlesActionTypes.FETCH_ARTICLE_SUCCESS, payload: response.data});
			})
			.catch(error => {
				dispatch({
					type: ArticlesActionTypes.FETCH_ARTICLES_ERROR,
					payload: 'Error while loading article'
				});
			})
	}
}
