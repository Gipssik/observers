import React, {FC} from 'react';
import {NavLink} from "react-router-dom";
import {InfoProps} from "../../types/types";
import {useTypedSelector} from "../../hooks/useTypesSelector";

const Info: FC<InfoProps> = ({author, question}) => {
	const self = useTypedSelector(state => state.user.user);

	return (
		<div className="single-question-info">
			{
				question &&
				<div>
					{new Date(question?.date_created).toLocaleString().slice(0, -3)}
				</div>
			}
			<div className="single-question-views">&#128065; {question?.views}</div>
			<div>
				By&nbsp;
				<NavLink
					className="single-question-by-link"
					to={self?.id === author?.id ? '/account' :'/account/' + author?.username}>
					{author?.username}
				</NavLink>
			</div>
		</div>
	);
};

export default Info;