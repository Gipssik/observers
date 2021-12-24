import React, {FC} from 'react';
import {IComment, IUser} from "../../types/types";
import {NavLink} from "react-router-dom";
import {useTypedSelector} from "../../hooks/useTypesSelector";

interface CommentProps{
	comment: IComment;
	user: IUser;
}

const Comment: FC<CommentProps> = ({comment, user}) => {
	const self = useTypedSelector(state => state.user.user);

	return (
		<div className="flex flex-col my-5 border-2 border-primaryTxt rounded-md">
			<div
				className={"relative flex p-3 items-center font-bold justify-between "
				+ (comment.is_answer ? "bg-primaryTxt text-primaryBg" : "")}
			>
				<div>
					<NavLink
						to={self?.id === user.id ? '/account' :'/account/' + user.username}
						className="text-lg transition hover:opacity-70"
					>
						{user.username}
					</NavLink>
					<div className="text-xs">{new Date(comment?.date_created).toLocaleString().slice(0, -3)}</div>
				</div>
				<div className="flex items-center gap-6">
					{
						comment.is_answer ?
							<div className="text-xl text-green-700 transition hover:opacity-70 hover:cursor-pointer">✔</div>
							:
							null
					}
					<div className="tracking-[5px]">
						<span className="text-green-700 text-lg">▲</span>
						<span>{comment.rating}</span>
						<span className="text-red-700 text-lg">▼</span>
					</div>
				</div>
			</div>
			<hr className="single-question-hr mt-0"/>
			<div className="p-3" dangerouslySetInnerHTML={{__html: comment.content}}></div>
		</div>
	);
};

export default Comment;