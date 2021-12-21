import React, {FC} from 'react';
import {useTypedSelector} from "../../hooks/useTypesSelector";
import RegularButton from "../Buttons/RegularButton";
import {useNavigate} from "react-router-dom";

const Options: FC = () => {
	const {authenticated} = useTypedSelector(state => state.auth);
	const navigate = useNavigate();

	return (
		<div className="flex justify-between items-center mb-5">
			<h1 className="text-4xl text-primaryTxt font-bold">Last questions</h1>
			{
				authenticated ?
						<RegularButton className="w-40" content={'ask question'} onClick={() => navigate('/ask-question')}/>
					:
					null
			}
		</div>

	);
};

export default Options;