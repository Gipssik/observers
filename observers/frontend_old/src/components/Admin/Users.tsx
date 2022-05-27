import React, {FC, useEffect} from 'react';
import {useTypedSelector} from "../../hooks/useTypesSelector";
import {useDispatch} from "react-redux";
import Loader from "../Loader/Loader";
import Table from "./Table";
import {fetchUsers} from "../../store/action-creators/users";
import {AdminActionTypes, IUser} from "../../types/types";
import {instance} from "../../Instance";

const Users: FC = () => {
	const self = useTypedSelector(state => state.user.user);
	const {users, loading, error} = useTypedSelector(state => state.users);
	const dispatch = useDispatch();

	const onDelete = (user: IUser) => {
		if(self?.id === user.id){
			dispatch({
				type: AdminActionTypes.SET_MODAL_CONTENT,
				payload: "You can't delete yourself."
			});
			dispatch({type: AdminActionTypes.SET_MODAL_TYPE, payload: "show"});
			dispatch({type: AdminActionTypes.SET_MODAL_SHOW, payload: true});
			return;
		}

		const onConfirm = () => {
			instance.delete(`accounts/users/${user.id}/`)
				.then(response => {
					dispatch(fetchUsers());
					dispatch({type: AdminActionTypes.SET_MODAL_SHOW, payload: false});
				})
				.catch(error => {
					dispatch({type: AdminActionTypes.SET_MODAL_SHOW, payload: false});
				})
		}

		dispatch({
			type: AdminActionTypes.SET_MODAL_CONTENT,
			payload: "Are you sure you want to delete this user? This action will delete all his questions too."
		});
		dispatch({type: AdminActionTypes.SET_MODAL_TYPE, payload: "confirm"});
		dispatch({type: AdminActionTypes.SET_MODAL_SHOW, payload: true});
		dispatch({type: AdminActionTypes.SET_MODAL_ON_CONFIRM, payload: onConfirm});
	}

	useEffect(() => {
		if(!users)
			dispatch(fetchUsers());
	}, []);

	return (
		<>
			{
				loading ?
					<Loader/>
					:
					(users ? <Table onDelete={onDelete} objectArray={users}/> : null)
			}
		</>

	);
};

export default Users;