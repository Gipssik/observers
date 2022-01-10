import React, {FC, useEffect} from 'react';
import {useTypedSelector} from "../../hooks/useTypesSelector";
import {useDispatch} from "react-redux";
import Loader from "../Loader/Loader";
import Table from "./Table";
import {fetchTags} from "../../store/action-creators/tags";
import {AdminActionTypes, ITag} from "../../types/types";
import {instance} from "../../Instance";
import {useNavigate} from "react-router-dom";

const Tags: FC = () => {
	const {tags, loading, error} = useTypedSelector(state => state.tags);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onEdit = (tag: ITag) => {
		navigate(`/tags/${tag.id}/edit`);
	}

	const onDelete = (tag: ITag) => {
		const onConfirm = () => {
			instance.delete(`forum/tags/${tag.id}/`)
				.then(response => {
					dispatch(fetchTags());
					dispatch({type: AdminActionTypes.SET_MODAL_SHOW, payload: false});
				})
				.catch(error => {
					dispatch({type: AdminActionTypes.SET_MODAL_SHOW, payload: false});
				})
		}

		dispatch({type: AdminActionTypes.SET_MODAL_CONTENT, payload: "Are you sure you want to delete this tag?"});
		dispatch({type: AdminActionTypes.SET_MODAL_TYPE, payload: "confirm"});
		dispatch({type: AdminActionTypes.SET_MODAL_SHOW, payload: true});
		dispatch({type: AdminActionTypes.SET_MODAL_ON_CONFIRM, payload: onConfirm});
	}

	useEffect(() => {
		if(!tags)
			dispatch(fetchTags());
	}, []);

	return (
		<>
			{
				loading ?
					<Loader/>
					:
					(tags ? <Table onEdit={onEdit} onDelete={onDelete} objectArray={tags}/> : null)
			}
		</>

	);
};

export default Tags;