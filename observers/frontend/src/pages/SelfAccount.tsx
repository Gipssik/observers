import React, {FC, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useTypedSelector} from "../hooks/useTypesSelector";
import Loader from "../components/Loader/Loader";
import Image from "../components/SelfAccount/Image";
import About from "../components/SelfAccount/About";
import Modal from "../components/Modal/Modal";
import UserQuestions from "../components/SelfAccount/UserQuestions";
import {instance} from "../Instance";
import {IQuestion} from "../types/types";

const SelfAccount: FC = () => {
	const [loading, setLoading] = useState(false);
	const [modal, setModal] = useState(false);
	const [modalData, setModalData] = useState('');
	const [userQuestions, setUserQuestions] = useState<IQuestion[]>();
	const user = useTypedSelector(state => state.user.user);
	const authenticated = useTypedSelector(state => state.auth.authenticated);
	const navigate = useNavigate();

	useEffect(() => {
		if(!user)
			return;
		setLoading(true);
		instance.get<IQuestion[]>(`forum/questions/${user.id}/user/`)
			.then(response => {
				setUserQuestions(response.data);
				setLoading(false);
			})
	}, [])

	useEffect(() => {
		if(!authenticated || !user){
			navigate('/login');
		}
	}, [authenticated]);

	return (
		<div>
			{
				loading ?
					<Loader/>
					:
					<>
						<Modal visible={modal} setVisible={setModal}>
							{modalData}
						</Modal>
						<div className="account-container">
							<Image setLoading={setLoading}/>
							<About setLoading={setLoading} setModal={setModal} setModalData={setModalData}/>
						</div>
						{
							userQuestions && userQuestions.length > 0 ?
								<UserQuestions questions={userQuestions}/>
								:
								null
						}
					</>
			}
		</div>
	);
};

export default SelfAccount;