import React, {FC} from 'react';
import {IArticle} from "../../types/types";
import Like from "./Like";
import Dislike from "./Dislike";
import {useNavigate} from "react-router-dom";

interface ArticleProps{
	article: IArticle;
}

const Article: FC<ArticleProps> = ({article}) => {
	const navigate = useNavigate();

	return (
		<div className="article-block" onClick={() => navigate('/news/' + article.id)}>
			<h4 className="article-block-title">{article.title.slice(0, 50) + (article.title.length > 50 ? "..." : "")}</h4>
			<div className="article-block-data">
				<div className="article-block-rating">
					<Like className="w-[26px] h-[26px]"/>{article.likes}
					<Dislike className="w-[26px] h-[26px]"/>{article.dislikes}
				</div>
				<div>
					{new Date(article.date_created).toLocaleDateString()}
				</div>
			</div>
		</div>
	);
};

export default Article;