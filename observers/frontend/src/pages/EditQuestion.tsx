import React, {FC, useEffect, useState} from 'react';
import AddQuestionForm from "../components/AddQuestion/AddQuestionForm";
import {useNavigate, useParams} from "react-router-dom";
import {useTypedSelector} from "../hooks/useTypesSelector";
import {useDispatch} from "react-redux";
import {fetchQuestion} from "../store/action-creators/questions";
import {IQuestion, IUser, QuestionsActionTypes} from "../types/types";
import Loader from "../components/Loader/Loader";
import {instance} from "../Instance";

const EditQuestion: FC = () => {
	const id = useParams().id;
	const question = useTypedSelector(state => state.questions.question);
	const [author, setAuthor] = useState<IUser>();
	const [loadingAuthor, setLoadingAuthor] = useState(true);
	const self = useTypedSelector(state => state.user.user);
	const authenticated = useTypedSelector(state => state.auth.authenticated);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const updateQuestion = (body: any) => {
		const modifiedBody: any = {};
		if(body.title !== question?.title){
			modifiedBody.title = body.title;
		}
		if(JSON.stringify(body.tags) !== JSON.stringify(question?.tags.map(tag => tag.title))){
			modifiedBody.tags = body.tags;
		}
		if(body.content !== question?.content){
			modifiedBody.content = body.content;
		}

		instance.patch<IQuestion>(`/forum/questions/${id}/`, modifiedBody)
			.then(response => {
				dispatch({type: QuestionsActionTypes.FETCH_QUESTION_SUCCESS, payload: response.data});
			})
			.then(() => {
				navigate('/questions/' + id);
			})
			.catch(error => {
				console.log(error);
			})
	}

	useEffect(() => {
		document.title = 'Edit question - Observers';
	}, []);

	useEffect(() => {
		if(isNaN(Number(id))){
			navigate('/questions');
			return;
		}
		if(!authenticated){
			navigate('/questions/' + id);
			return;
		}

		dispatch(fetchQuestion(Number(id), setAuthor, setLoadingAuthor, false));
	}, [])

	useEffect(() => {
		if(!loadingAuthor && self?.role.title !== 'Admin' && self?.id !== author?.id){
			navigate('/questions/' + id);
		}
	}, [loadingAuthor]);

	return (
		<>
			{
				loadingAuthor ?
					<Loader/>
					:
					<div className="add-question-container">
						<h1 className="register-title">Edit Question</h1>
						<AddQuestionForm
							title={question?.title}
							tags={question?.tags.map(tag => tag.title)}
							content={question?.content}
							buttonText="Edit"
							onSubmit={updateQuestion}
						/>
					</div>
			}
		</>
	);
};

export default EditQuestion;