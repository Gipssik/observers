import React, {FC, useEffect, useState} from 'react';
import {IQuestion} from "../Types/Types";
import Question from "../components/Questions/Question";
import Options from "../components/Questions/Options";
import {instance} from "../Instance";

const Questions: FC = () => {
	const [questions, setQuestions] = useState<IQuestion[]>([]);

	useEffect(() => {
		instance.get<IQuestion[]>('forum/questions')
			.then(response => {
				setQuestions(response.data);
			})
			.catch(error => {
				console.log(error);
			})
	}, []);


	return (
		<div className="questions-container">
			<Options />
			{questions.map(q => <Question key={q.id} id={q.id} title={q.title} content={q.content} views={q.views}/>)}
		</div>
	);
};

export default Questions;