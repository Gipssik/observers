import React, {FC, useEffect} from 'react';
import Question from "../components/Questions/Question";
import Options from "../components/Questions/Options";
import Loader from "../components/Loader/Loader";
import {useTypedSelector} from "../hooks/useTypesSelector";
import {useDispatch} from "react-redux";
import {fetchQuestions} from "../store/action-creators/questions";

const Questions: FC = () => {
	const {questions, loading} = useTypedSelector(state => state.questions);
	const dispatch = useDispatch();

	useEffect(() => {
		document.title = 'Questions - Observers';
	}, []);

	useEffect(() => {
		dispatch(fetchQuestions('order_by_date=desc'));
	}, []);

	return (
		<div className="questions-container">
			<Options />
			{
				loading ?
					<Loader/>
					:
					(
						questions && questions.length > 0 ?
							questions?.map(q =>
								<Question
									key={q.id}
									id={q.id}
									title={q.title}
									content={q.content}
									views={q.views}
									tags={q.tags}
								/>)
							:
							<div className="error404-title">There's no questions yet.</div>
					)
			}
		</div>
	);
};

export default Questions;