import React, {FC, useEffect} from 'react';
import Question from "../components/Questions/Question";
import Options from "../components/Questions/Options";
import Loader from "../components/Loader/Loader";
import {useTypedSelector} from "../hooks/useTypesSelector";
import {useDispatch} from "react-redux";
import {fetchQuestions} from "../store/action-creators/questions";
import {IQuestion, QuestionsActionTypes} from "../types/types";

const Questions: FC = () => {
	const {questions, loading, error} = useTypedSelector(state => state.questions);
	const dispatch = useDispatch();

	const compare = (a: IQuestion, b: IQuestion) => {
		if (new Date(a.date_created) < new Date(b.date_created))
			return -1;
		if (new Date(a.date_created) > new Date(b.date_created))
			return 1;
		return 0;
	}

	useEffect(() => {
		dispatch(fetchQuestions());
	}, []);

	useEffect(() => {
		if(questions && !loading){
			const q = questions.sort(compare).reverse();
			dispatch({type: QuestionsActionTypes.SET_SORTED_QUESTION, payload: q});
			console.log(q);
		}
	}, [questions]);


	return (
		<>
			{
				loading ?
					<Loader/>
					:
					<div className="questions-container">
						<Options />
						{questions?.map(q => <Question key={q.id} id={q.id} title={q.title} content={q.content} views={q.views}/>)}
					</div>
			}
		</>
	);
};

export default Questions;