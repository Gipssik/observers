import React, {FC} from 'react';
import {useTypedSelector} from "../../hooks/useTypesSelector";
import RegularButton from "../Buttons/RegularButton";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {fetchQuestions} from "../../store/action-creators/questions";

const Options: FC = () => {
	const {authenticated} = useTypedSelector(state => state.auth);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	return (
		<>
			<h1 className="text-4xl text-primaryTxt font-bold mb-5">Last questions</h1>
			<div className="flex mb-5 gap-4">
				<select
					className="dropdown"
					name="sort_by"
					onChange={(e) => dispatch(fetchQuestions(e.target.value))}
				>
					<option value="order_by_date=desc">Newer first</option>
					<option value="order_by_date=asc">Older first</option>
					<option value="order_by_views=true">By popularity</option>
				</select>
				{
					authenticated ?
						<RegularButton className="w-40" content={'ask question'} onClick={() => navigate('/ask-question')}/>
						:
						null
				}
			</div>
		</>
	);
};

export default Options;