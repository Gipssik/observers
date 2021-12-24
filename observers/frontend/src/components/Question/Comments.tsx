import React, {FC, useEffect, useState} from 'react';
import {instance} from "../../Instance";
import {IComment, IQuestion, IUser} from "../../types/types";
import {NavLink, useNavigate} from "react-router-dom";
import {useTypedSelector} from "../../hooks/useTypesSelector";
import Comment from "./Comment";

interface CommentsProps{
	comments: IComment[];
	commentators: IUser[];
}

const Comments: FC<CommentsProps> = ({comments, commentators}) => {
	const navigate = useNavigate();

	return (
		<>
			<div className="text-3xl mt-5 mr-16 font-bold text-right">Comments</div>
			{comments.map(comment => {
				const user = commentators.find(u => u.id === comment.author_id);
				if(!user)
					return null;
				return <Comment comment={comment} user={user} key={comment.id}/>
			})}
		</>
	);
};

export default Comments;