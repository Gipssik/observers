import React, {FC, useState} from 'react';
import {useTypedSelector} from "../../hooks/useTypesSelector";
import RegularButton from "../Buttons/RegularButton";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {fetchQuestions} from "../../store/action-creators/questions";
import ArrowBack from "./ArrowBack";

const Options: FC = () => {
	const [queried, setQueried] = useState(false);
	const {authenticated} = useTypedSelector(state => state.auth);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const doSearch = () => {
		let query = document.querySelector<HTMLInputElement>('#search');
		if(!query || (query && query.value.length === 0))
			return;
		dispatch(fetchQuestions(`${query.value}/title/`, true));
		query.value = '';
		setQueried(true);
	}

	return (
		<>
			<div className="flex items-center justify-between">
				<h1 className="questions-title">Questions</h1>
				{
					authenticated ?
						<RegularButton className="w-40" content={'ask question'} onClick={() => navigate('/ask-question')}/>
						:
						null
				}
			</div>
			<div className="options">
				<div className="options-sort">
					<select
						className="dropdown"
						name="sort_by"
						onChange={(e) => {
							dispatch(fetchQuestions(e.target.value));
							setQueried(false);
						}}
					>
						<option value="order_by_date=desc">Newer first</option>
						<option value="order_by_date=asc">Older first</option>
						<option value="order_by_views=true">By popularity</option>
					</select>
					<input id="search" type="text" className="search-field" placeholder="Search..."/>
					<RegularButton className="transparent-button" content="search" onClick={doSearch}/>
					{
						queried ?
							<ArrowBack onClick={() => {
								dispatch(fetchQuestions('order_by_date=desc'));
								setQueried(false);
							}}/>
							:
							null
					}
				</div>
			</div>
		</>
	);
};

export default Options;