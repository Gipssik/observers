import React, {FC} from 'react';
import Like from "./Like";
import Dislike from "./Dislike";
import {IArticle} from "../../types/types";

interface InfoProps{
	article: IArticle;
}

const Info: FC<InfoProps> = ({article}) => {
	return (
		<div className="single-article-info">
			<h1>{article.title}</h1>
			<div className="single-article-stats">
				<div className="article-block-rating">
					<Like className="active"/>{article.likes}
					<Dislike className="active"/>{article.dislikes}
				</div>
				<div>
					{new Date(article.date_created).toLocaleDateString()}
				</div>
			</div>
		</div>
	);
};

export default Info;