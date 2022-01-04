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
import Trash from "../components/Question/Trash";
import Modal from "../components/Modal/Modal";
import RegularButton from "../components/Buttons/RegularButton";
import Edit from "../components/Question/Edit";


const Question: FC = () => {
	const {question, questions, loading, error} = useTypedSelector(state => state.questions);
	const id = useParams().id;
	const [modalVisible, setModalVisible] = useState(false);
	const authenticated = useTypedSelector(state => state.auth.authenticated);
	const self = useTypedSelector(state => state.user.user);
	const [author, setAuthor] = useState<IUser>();
	const [comments, setComments] = useState<IComment[]>([]);
	const [commentators, setCommentators] = useState<IUser[]>([]);
	const [loadingAuthor, setLoadingAuthor] = useState(true);
	const [loadingComments, setLoadingComments] = useState(true);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const loadCommentators = async (coms: IComment[]) => {
		let users: IUser[] = [];

		for(let c of coms){
			let s = users.filter(obj => obj.id === c.author_id)
			if(s.length === 0){
				await instance.get<IUser>(`accounts/users/${c.author_id}/`)
					.then(response => {
						users.push(response.data)
					})
					.catch(error => {
						navigate('/404');
					})
			}
		}
		setCommentators(users);
		setLoadingComments(false);
	}

	const deleteQuestion = () => {
		instance.delete(`forum/questions/${id}/`)
			.then(response => {
				navigate('/questions');
			})
			.catch(error => {
				console.log(error);
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

		instance.get<IComment[]>(`forum/comments/${id}/`)
			.then(response => {
				setComments(response.data);
				loadCommentators(response.data);
			})
			.catch(error => {
				console.error('Error while loading comments.')
			})
	}, [id]);

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
						<Modal visible={modalVisible} setVisible={setModalVisible}>
							<div>
								Are you sure you want to delete this questions?
							</div>
							<div className="modal-buttons">
								<RegularButton
									className="w-28 bg-green-600"
									content="Yes"
									onClick={deleteQuestion}
								/>
								<RegularButton
									className="w-28 bg-red-500"
									content="No"
									onClick={() => setModalVisible(false)}
								/>
							</div>
						</Modal>
						<div className="single-question-container">
							<div className="single-question-header">
								<div>
									<h1 className="single-question-title">{question?.title}</h1>
									<Info question={question} author={author} />
								</div>
								{
									authenticated && (self?.id === author?.id || self?.role.title === 'Admin') ?
										<div className="user-options-container">
											<Trash
												onClick={() => setModalVisible(true)}
												width={32}
												height={32}
											/>
											<Edit
												onClick={() => navigate(`/questions/${id}/edit`)}
												width={32}
												height={32}
											/>
										</div>
										:
										null
								}
							</div>
							<hr className="single-question-hr"/>
							<div className="single-question-content"
								 dangerouslySetInnerHTML={{__html: question ? question.content : ""}}
							></div>
							<hr className="single-question-hr"/>
							{
								comments.length > 0 ?
									<Comments comments={comments} commentators={commentators}/>
									:
									null
							}
							{
								question ?
									<div className="mt-5">
										<h2 className="mb-2">Add a comment:</h2>
										<AddComment questionId={question?.id}/>
									</div>
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