import React, {FC, useEffect} from 'react';
import {useTypedSelector} from "../../hooks/useTypesSelector";
import {useDispatch} from "react-redux";
import Loader from "../Loader/Loader";
import Table from "./Table";
import {fetchComments} from "../../store/action-creators/comments";
import {AdminActionTypes, IComment} from "../../types/types";
import {instance} from "../../Instance";
import {useNavigate} from "react-router-dom";

const Comments: FC = () => {
	const {comments, loading, error} = useTypedSelector(state => state.comments);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onEdit = (comment: IComment) => {
		navigate(`/questions/${comment.question_id}`);
	}

	const onDelete = (comment: IComment) => {
		const onConfirm = () => {
			instance.delete(`forum/comments/${comment.id}/`)
				.then(response => {
					dispatch(fetchComments());
					dispatch({type: AdminActionTypes.SET_MODAL_SHOW, payload: false});
				})
				.catch(error => {
					dispatch({type: AdminActionTypes.SET_MODAL_SHOW, payload: false});
				})
		}

		dispatch({type: AdminActionTypes.SET_MODAL_CONTENT, payload: "Are you sure you want to delete this comment?"});
		dispatch({type: AdminActionTypes.SET_MODAL_TYPE, payload: "confirm"});
		dispatch({type: AdminActionTypes.SET_MODAL_SHOW, payload: true});
		dispatch({type: AdminActionTypes.SET_MODAL_ON_CONFIRM, payload: onConfirm});
	}

	useEffect(() => {
		if(!comments)
			dispatch(fetchComments());
	}, []);

	return (
		<>
			{
				loading ?
					<Loader/>
					:
					(comments ? <Table onEdit={onEdit} onDelete={onDelete} objectArray={comments}/> : null)
			}
		</>

	);
};

export default Comments;