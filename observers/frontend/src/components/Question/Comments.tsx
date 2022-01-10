import React, {FC} from 'react';
import {CommentsProps} from "../../types/types";
import Comment from "./Comment";

const Comments: FC<CommentsProps> = ({comments, commentators}) => {

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