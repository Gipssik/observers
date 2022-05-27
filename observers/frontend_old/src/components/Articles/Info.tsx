import React, {FC, useEffect, useState} from 'react';
import Like from "./Like";
import Dislike from "./Dislike";
import {ArticlesActionTypes, IArticle} from "../../types/types";
import {useTypedSelector} from "../../hooks/useTypesSelector";
import {useNavigate} from "react-router-dom";
import {instance} from "../../Instance";
import {useDispatch} from "react-redux";

interface InfoProps{
	article: IArticle;
}

const Info: FC<InfoProps> = ({article}) => {
	const [likeState, setLikeState] = useState(false);
	const [dislikeState, setDislikeState] = useState(false);
	const authenticated = useTypedSelector(state => state.auth.authenticated);
	const self = useTypedSelector(state => state.user.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const changeRating = (type: string) => {
		if(!authenticated){
			navigate('/login');
			return;
		}

		instance.patch<IArticle>(`news/articles/${article.id}/${type}/`)
			.then(response => {
				dispatch({type: ArticlesActionTypes.FETCH_ARTICLE_SUCCESS, payload: response.data});
			})
			.catch(error => {
				console.log(error);
			})
	}

	useEffect(() => {
		let userInLikes = article.likes.find(user => {
			return user.id === self?.id;
		});
		if(userInLikes){
			setLikeState(true);
			setDislikeState(false);
			return;
		}

		let userInDislikes = article.dislikes.find(user => user.id === self?.id);
		if(userInDislikes){
			setDislikeState(true);
			setLikeState(false);
			return;
		}

		setDislikeState(false);
		setLikeState(false);
	}, [article]);

	return (
		<div className="single-article-info">
			<h1>{article.title}</h1>
			<div className="single-article-stats">
				<div className="article-block-rating">
					<Like
						onClick={() => changeRating('likes')}
						className={"active " + (likeState ? "fill-primaryTxt" : "")}
					/>
					{article.likes.length}
					<Dislike
						onClick={() => changeRating('dislikes')}
						className={"active " + (dislikeState ? "fill-primaryTxt" : "")}
					/>
					{article.dislikes.length}
				</div>
				<div>
					{new Date(article.date_created).toLocaleDateString()}
				</div>
			</div>
		</div>
	);
};

export default Info;