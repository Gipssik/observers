import React, {FC, useEffect} from 'react';
import AdminMenu from "../components/Admin/AdminMenu";
import ModelBlock from "../components/Admin/ModelBlock";
import {useTypedSelector} from "../hooks/useTypesSelector";
import {useNavigate} from "react-router-dom";
import Modal from "../components/Modal/Modal";
import {useDispatch} from "react-redux";
import {AdminActionTypes} from "../types/types";
import RegularButton from "../components/Buttons/RegularButton";

const Admin: FC = () => {
	const user = useTypedSelector(state => state.user.user);
	const authenticated = useTypedSelector(state => state.auth.authenticated);
	const {showModal, modalContent, modalType, onConfirm} = useTypedSelector(state => state.admin);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const renderButtons = (t: string) => {
		switch (t){
			case "confirm":
				return (
					<div className="modal-buttons">
						<RegularButton
							className="w-28 bg-green-600"
							content="Yes"
							onClick={onConfirm ? onConfirm : () => {}}
						/>
						<RegularButton
							className="w-28 bg-red-500"
							content="No"
							onClick={() => dispatch({type: AdminActionTypes.SET_MODAL_SHOW, payload: false})}
						/>
					</div>
				);
			case "show":
				return (
					<div className="modal-buttons">
						<RegularButton
							className="w-28 bg-yellow-400"
							content="OK"
							onClick={() => dispatch({type: AdminActionTypes.SET_MODAL_SHOW, payload: false})}
						/>
					</div>

				);
		}
		return null;
	}

	useEffect(() => {
		if(!authenticated || user?.role.title !== 'Admin'){
			navigate('/404');
		}
	}, [authenticated, user])

	useEffect(() => {
		if(authenticated && user?.role.title === 'Admin')
			document.title = 'Admin Panel - Observers';
	}, [authenticated, user])

	return (
		<>
			{
				showModal && modalContent && modalType ?
					<Modal
						visible={showModal}
						setVisible={(status: boolean) =>
							dispatch({type: AdminActionTypes.SET_MODAL_SHOW, payload: status})}
					>
						<div>{modalContent}</div>
						{renderButtons(modalType)}
					</Modal>
					:
					null
			}

			<div className="admin-container">
				<AdminMenu/>
				<ModelBlock/>
			</div>
		</>
	);
};

export default Admin;