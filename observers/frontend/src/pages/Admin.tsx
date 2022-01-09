import React, {FC, useEffect} from 'react';
import AdminMenu from "../components/Admin/AdminMenu";
import ModelBlock from "../components/Admin/ModelBlock";
import {useTypedSelector} from "../hooks/useTypesSelector";
import {useNavigate} from "react-router-dom";

const Admin: FC = () => {
	const user = useTypedSelector(state => state.user.user);
	const authenticated = useTypedSelector(state => state.auth.authenticated);
	const navigate = useNavigate();

	useEffect(() => {
		if(!authenticated || user?.role.title !== 'Admin'){
			navigate('/404');
		}
	}, [authenticated, user])

	useEffect(() => {
		if(authenticated && user?.role.title === 'Admin')
			document.title = 'Admin - Observers';
	}, [authenticated, user])

	return (
		<div className="admin-container">
			<AdminMenu/>
			<ModelBlock/>
		</div>
	);
};

export default Admin;