import {ArticlesAction, ArticlesActionTypes, ArticlesState} from "../../types/types";

const initialState: ArticlesState = {
	articles: null,
	article: null,
	loading: true,
	error: null,
}

export const articlesReducer = (state = initialState, action: ArticlesAction): ArticlesState => {
	switch (action.type) {
		case ArticlesActionTypes.FETCH_ARTICLES:
			return {...state, loading: true};
		case ArticlesActionTypes.FETCH_ARTICLES_SUCCESS:
			return {articles: action.payload, loading: false, error: null};
		case ArticlesActionTypes.FETCH_ARTICLE:
			return {...state, loading: true};
		case ArticlesActionTypes.FETCH_ARTICLE_SUCCESS:
			return {...state, article: action.payload, loading: false};
		case ArticlesActionTypes.FETCH_ARTICLES_ERROR:
			return {articles: state.articles, loading: false, error: action.payload};
		default:
			return state;
	}
}