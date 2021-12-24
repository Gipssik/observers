import React, {FC, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {IComment, IQuestion, IUser, QuestionsActionTypes} from "../types/types";
import Loader from "../components/Loader/Loader";
import {useTypedSelector} from "../hooks/useTypesSelector";
import {fetchQuestion} from "../store/action-creators/questions";
import {useDispatch} from "react-redux";
import {instance} from "../Instance";
import Info from "../components/Question/Info";
import AddComment from "../components/Question/AddComment";
import Comments from "../components/Question/Comments";


const Question: FC = () => {
	const {question, questions, loading, error} = useTypedSelector(state => state.questions);
	const id = useParams().id;
	const [author, setAuthor] = useState<IUser>();
	const [comments, setComments] = useState<IComment[]>([]);
	const [commentators, setCommentators] = useState<IUser[]>([]);
	const [loadingAuthor, setLoadingAuthor] = useState(true);
	const [loadingComments, setLoadingComments] = useState(true);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const loadCommentators = (cs: IComment[]) => {
		cs.map(async (c) => {
			let a = commentators.filter(obj => obj.id === c.author_id);
			console.log(`out ${a}`);
			if(a.length === 0){
				console.log(`in ${a}`);
				let response = await instance.get<IUser>('accounts/users/' + c.author_id);
				if(!response.data){
					navigate('/404');
				}
				// TODO: have no time to save commentator
				setCommentators([...commentators, response.data])
				if(commentators.includes(response.data)){
					console.log(213);
				}
				// instance.get<IUser>('accounts/users/' + c.author_id)
				// 	.then(response => {
				// 		setCommentators([...commentators, response.data]);
				// 	})
				// 	.catch(error => {
				// 		navigate('/404');
				// 	})
			}
		})
	}

	useEffect(() => {
		if(!questions){
			dispatch(fetchQuestion(Number(id), setAuthor, setLoadingAuthor));
		}else{
			const q = questions?.find(obj => {return obj.id === Number(id)});

			dispatch({
				type: QuestionsActionTypes.FETCH_QUESTION_SUCCESS,
				payload: q
			})

			if(q){
				instance.get<IUser>(`accounts/users/${q?.author_id}/`)
					.then(response => {
						setAuthor(response.data);
						setLoadingAuthor(false);
					})
					.catch(error => {
						navigate('/404');
					})

				instance.patch<IQuestion>(`forum/questions/${id}/views/?views=${q?.views + 1}`);
			}
		}

		instance.get<IComment[]>(`forum/comments/${id}`)
			.then(response => {
				setComments(response.data);
				loadCommentators(response.data);
				setLoadingComments(false);
			})
			.catch(error => {
				console.error('Error while loading comments.')
			})
	}, []);

	useEffect(() => {

		if(error)
			navigate('/404');
	}, [error]);

	return (
		<>
			{
				loading || loadingAuthor || loadingComments
				? <Loader/>
				: 	<>
						<div className="single-question-container">
							<h1 className="single-question-title">{question?.title}</h1>
							<Info question={question} author={author} />
							<hr className="single-question-hr"/>
							<div className="single-question-content">{question?.content}</div>
							<hr className="single-question-hr"/>
							{
								comments.length > 0 ?
									<Comments comments={comments} commentators={commentators}/>
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