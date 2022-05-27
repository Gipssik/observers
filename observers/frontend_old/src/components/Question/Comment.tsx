import React, {FC, useState} from 'react';
import {CommentProps, IComment} from "../../types/types";
import {NavLink} from "react-router-dom";
import {useTypedSelector} from "../../hooks/useTypesSelector";
import Trash from "./Trash";
import Edit from "./Edit";
import {instance} from "../../Instance";
import AddComment from "./AddComment";

const Comment: FC<CommentProps> = ({comment, user}) => {
	const [commentState, setCommentState] = useState(comment);
	const self = useTypedSelector(state => state.user.user);
	const question = useTypedSelector(state => state.questions.question);
	const [editing, setEditing] = useState(false);

	const deleteComment = (commentId: number) => {
		instance.delete(`forum/comments/${commentId}/`)
			.then(response => {
				window.location.reload();
			})
			.catch(error => {
				console.error(error)
			})
	}

	const changeAnswerStatus = async () => {
		let is_answer: boolean = !commentState.is_answer;
		await instance.patch<IComment>(`/forum/comments/${commentState.id}/`, {is_answer})
			.then(response => {
				setCommentState({...commentState, is_answer: is_answer});
			})
			.catch(error => {
				console.log(error);
			})
	}

	return (
		<div className="comment-container">
			<div
				className={"comment-header "
				+ (commentState.is_answer ? "bg-primaryTxt text-primaryBg" : "")}
			>
				<div className="flex gap-3">
					<img
						className="w-[50px] h-[50px] rounded-md"
						src={user.profile_image === 'default.jpg' ? '/' + user.profile_image : user.profile_image}
						alt="User"
					/>
					<div>
						<NavLink
							to={self?.id === user.id ? '/account' :'/account/' + user.username}
							className="comment-author-link"
						>
							{user.username}
						</NavLink>
						<div className="text-xs">{new Date(commentState?.date_created).toLocaleString().slice(0, -3)}</div>
					</div>
				</div>
				<div className="comment-options">
					{
						self?.id === question?.author_id || self?.role.title === 'Admin' ?
							<div
								onClick={changeAnswerStatus}
								className={"comment-answer " + (commentState.is_answer ? "" : "comment-not-answer")}
							>
								✔
							</div>
							:
							commentState.is_answer ?
								<div
									className="text-xl text-green-700"
								>
									✔
								</div>
								:
								null
					}
					{
						commentState.author_id === self?.id || self?.role.title === 'Admin' ?
							<div className={"flex gap-3 " + (commentState.is_answer ? "bg-secondaryBg p-1 rounded-md" : "")}>
								<Trash onClick={() => deleteComment(commentState.id)} width={24} height={24}/>
								<Edit onClick={() => setEditing(true)} width={24} height={24}/>
							</div>
							:
							null
					}
				</div>
			</div>
			<hr className="single-question-hr mt-0"/>
			<div>
				{
					editing ?
						<AddComment
							commentId={commentState.id}
							edit={true}
							buttonText="Confirm"
							value={commentState.content}
							setEditing={setEditing}
						/>
						:
						<div className="comment-content" dangerouslySetInnerHTML={{__html: commentState.content}}></div>
				}
			</div>
		</div>
	);
};

export default Comment;