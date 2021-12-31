import React, {FC, useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useTypedSelector} from "../hooks/useTypesSelector";
import RegularButton from "../components/Buttons/RegularButton";
import axios from "axios";
import FormData from "form-data";
import {instance} from "../Instance";
import {IUser} from "../types/types";
import Loader from "../components/Loader/Loader";
import Image from "../components/SelfAccount/Image";
import About from "../components/SelfAccount/About";

const SelfAccount: FC = () => {
	const [loading, setLoading] = useState(false);
	const authenticated = useTypedSelector(state => state.auth.authenticated);
	const navigate = useNavigate();

	useEffect(() => {
		if(!authenticated){
			navigate('/login');
		}
	}, [authenticated]);

	return (
		<>
			{
				loading ?
					<Loader/>
					:
					<div className="account-container">
						<Image setLoading={setLoading}/>
						<About setLoading={setLoading}/>
					</div>
			}
		</>
	);
};

export default SelfAccount;