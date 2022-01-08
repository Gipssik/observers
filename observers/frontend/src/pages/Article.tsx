import React, {FC, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useTypedSelector} from "../hooks/useTypesSelector";
import Loader from "../components/Loader/Loader";
import {ArticlesActionTypes} from "../types/types";
import {useDispatch} from "react-redux";
import {fetchArticle} from "../store/action-creators/articles";
import Like from "../components/Articles/Like";
import Dislike from "../components/Articles/Dislike";
import Trash from "../components/Question/Trash";
import Edit from "../components/Question/Edit";
import Modal from "../components/Modal/Modal";
import RegularButton from "../components/Buttons/RegularButton";
import {instance} from "../Instance";
import Info from "../components/Articles/Info";

const Article: FC = () => {
	const id = useParams().id;
	const [modalVisible, setModalVisible] = useState(false);
	const {article, articles, loading, error} = useTypedSelector(state => state.articles);
	const self = useTypedSelector(state => state.user.user);
	const authenticated = useTypedSelector(state => state.auth.authenticated);
	const navigate = useNavigate();
	const dispatch = useDispatch();


	const deleteArticle = () => {
		instance.delete(`news/articles/${id}/`)
			.then(response => {
				navigate('/news');
			})
			.catch(error => {
				console.log(error);
			})
	}

	useEffect(() => {
		document.title = `${article?.title} - Observers`;
	}, [article]);

	useEffect(() => {
		if(!articles){
			dispatch(fetchArticle(Number(id)));
		}else{
			const a = articles?.find(obj => {return obj.id === Number(id)});

			dispatch({
				type: ArticlesActionTypes.FETCH_ARTICLE_SUCCESS,
				payload: a
			});
		}
	}, [id]);

	useEffect(() => {
		if(error){
			console.log(error);
			navigate('/404');
		}
	}, [error]);

	return (
		<>
			{
				loading ?
					<Loader/>
					:
					<>
						{
							self?.role.title === 'Admin' ?
								<Modal visible={modalVisible} setVisible={setModalVisible}>
									<div>
										Are you sure you want to delete this article?
									</div>
									<div className="modal-buttons">
										<RegularButton
											className="w-28 bg-green-600"
											content="Yes"
											onClick={deleteArticle}
										/>
										<RegularButton
											className="w-28 bg-red-500"
											content="No"
											onClick={() => setModalVisible(false)}
										/>
									</div>
								</Modal>
								:
								null
						}
						<div className="single-article-container">
							<div className="single-article-info-block">
								{
									article ?
										<Info article={article}/>
										:
										null
								}
								{
									authenticated && self?.role.title === 'Admin' ?
										<div className="user-options-container">
											<Trash
												onClick={() => setModalVisible(true)}
												width={32}
												height={32}
											/>
											<Edit
												onClick={() => navigate(`/news/${id}/edit`)}
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
								 dangerouslySetInnerHTML={{__html: article ? article.content : ""}}
							></div>
						</div>
					</>
			}
		</>
	);
};

export default Article;