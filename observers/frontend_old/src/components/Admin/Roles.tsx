import React, {FC, useEffect} from 'react';
import {useTypedSelector} from "../../hooks/useTypesSelector";
import Loader from "../Loader/Loader";
import {useDispatch} from "react-redux";
import {fetchRoles} from "../../store/action-creators/roles";
import Table from "./Table";

const Roles: FC = () => {
	const {roles, loading, error} = useTypedSelector(state => state.roles);
	const dispatch = useDispatch();

	useEffect(() => {
		if(!roles)
			dispatch(fetchRoles());
	}, []);

	return (
		<>
			{
				loading ?
					<Loader/>
					:
					(roles ? <Table objectArray={roles}/> : null)
			}
		</>

	);
};

export default Roles;