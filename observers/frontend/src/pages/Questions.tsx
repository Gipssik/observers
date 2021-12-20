import React, {FC, useEffect, useState} from 'react';
import {IQuestion} from "../types/types";
import Question from "../components/Questions/Question";
import Options from "../components/Questions/Options";
import {instance} from "../Instance";
import Loader from "../components/Loader/Loader";

const Questions: FC = () => {
	const [questions, setQuestions] = useState<IQuestion[]>([]);
	// TODO: Create reduces for questions
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		instance.get<IQuestion[]>('forum/questions')
			.then(response => {
				setQuestions(response.data);
				setLoading(false);
			})
			.catch(error => {
				console.log(error);
			})
	}, []);


	return (
		<>
			{
				loading ?
					<Loader/>
					:
					<div className="questions-container">
						<Options />
						{questions.map(q => <Question key={q.id} id={q.id} title={q.title} content={q.content} views={q.views}/>)}
					</div>
			}
		</>
	);
};

export default Questions;