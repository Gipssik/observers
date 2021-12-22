import React, {FC, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {IQuestion, IUser, QuestionsActionTypes} from "../types/types";
import Loader from "../components/Loader/Loader";
import {useTypedSelector} from "../hooks/useTypesSelector";
import {fetchQuestion} from "../store/action-creators/questions";
import {useDispatch} from "react-redux";
import {instance} from "../Instance";
import Info from "../components/Question/Info";
import AddComment from "../components/Question/AddComment";


const Question: FC = () => {
	const {question, questions, loading, error} = useTypedSelector(state => state.questions);
	const id = useParams().id;
	const [author, setAuthor] = useState<IUser>();
	const [loadingAuthor, setLoadingAuthor] = useState(true);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if(!questions){
			dispatch(fetchQuestion(Number(id), setAuthor, setLoadingAuthor));
		}else{
			const q = questions?.find(obj => {return obj.id === Number(id)});

			dispatch({
				type: QuestionsActionTypes.FETCH_QUESTION_SUCCESS,
				payload: q
			})

			// @ts-ignore
			instance.patch<IQuestion>(`forum/questions/${id}/views/?views=${q?.views + 1}`);
			instance.get<IUser>(`accounts/users/${q?.author_id}/`)
				.then(response => {
					setAuthor(response.data);
					setLoadingAuthor(false);
				})
				.catch(error => {
					navigate('/404');
				})
		}
	}, []);

	useEffect(() => {
		if(error)
			navigate('/404');
	}, [error]);

	return (
		<>
			{
				loading || loadingAuthor
				? <Loader/>
				: 	<>
						<div className="single-question-container">
							<h1 className="single-question-title">{question?.title}</h1>
							<Info question={question} author={author} />
							<hr className="single-question-hr"/>
							<div className="single-question-content">{question?.content}</div>
							{
								question?.comments && question.comments.length ?
									<div className="text-3xl mt-5">Comments</div>
									:
									null
							}
							{
								question ?
									<AddComment questionId={question?.id}/>
									:
									null
							}
						</div>
					</>
			}
		</>
	);
};

export default Question;