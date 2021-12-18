import React, {FC, useEffect, useState} from 'react';
import {IQuestion} from "../../types/types";
import axios from "axios";
import Question from "./Question";

const Questions: FC = () => {
	const [questions, setQuestions] = useState<IQuestion[]>([]);

	useEffect(() => {
		axios.get<IQuestion[]>('http://127.0.0.1:8000/api/forum/questions')
			.then(response => {
				setQuestions(response.data);
			})
			.catch(error => {
				console.log(error);
			})
	}, []);


	return (
		<div className="questions-container">
			{questions.map(q => <Question key={q.id} title={q.title} content={q.content} views={q.views}/>)}
		</div>
	);
};

export default Questions;