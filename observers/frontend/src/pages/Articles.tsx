import React, {FC, useEffect} from 'react';
import {useTypedSelector} from "../hooks/useTypesSelector";
import RegularButton from "../components/Buttons/RegularButton";
import {useDispatch} from "react-redux";
import {fetchArticles} from "../store/action-creators/articles";
import Article from "../components/Articles/Article";
import {useNavigate} from "react-router-dom";

const Articles: FC = () => {
	const user = useTypedSelector(state => state.user.user);
	const articles = useTypedSelector(state => state.articles.articles);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchArticles());
	}, [])

	return (
		<div className="questions-container">
			<div className="article-header">
				<h1 className="article-title">News</h1>
				{
					user && user.role.title === 'Admin' ?
						<RegularButton content="Create" onClick={() => navigate('/create-news')}/>
						:
						null
				}
			</div>
			<div className="articles-block">
				{
					articles && articles.length > 0 ?
						articles?.map(article => <Article key={article.id} article={article}/>)
						:
						<div className="no-articles">There's no articles yet :(</div>
				}
			</div>
		</div>
	);
};

export default Articles;