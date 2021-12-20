import React, {FC, useContext, useEffect, useState} from 'react';
import {AuthContext} from "../Context/Context";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {IQuestion, IUser} from "../Types/Types";
import {instance} from "../Instance";
import axios from "axios";
import Loader from "../components/Loader/Loader";


const Question: FC = () => {
	const [question, setQuestion] = useState<IQuestion>();
	const [author, setAuthor] = useState<IUser>();
	const [loading, setLoading] = useState(true);
	const {isAuth, setIsAuth} = useContext(AuthContext);
	const navigate = useNavigate();
	const id = useParams().id;

	useEffect(() => {
		instance.get<IQuestion>('forum/questions/' + id)
			.then(response => {
				setQuestion(response.data);
				if(response.data){
					instance.patch<IQuestion>(`forum/questions/${id}/views/?views=${response.data.views + 1}`);

					instance.get<IUser>(`accounts/users/${response.data.author_id}`)
						.then(response => {
							setAuthor(response.data);
							setLoading(false);
						})
				}
			})
			.catch(error => {
				navigate('/404');
			});
	}, []);

	return (
		<>
			{
				loading
				? <Loader/>
				: 	<>
						<div className="w-1/2 mx-auto text-primaryTxt mt-10">
							<h1 className="text-3xl font-bold">{question?.title}</h1>

							<div className="flex gap-5 mt-3 font-bold text-secondaryTxt">
								{
									question &&
									<div className="">
										{new Date(question?.date_created).toLocaleString().slice(0, -3)}
									</div>
								}
								<div className="w-14 text-center">&#128065; {question?.views}</div>
								<div>By <NavLink className="text-primaryTxt hover:underline" to={'/account/' + author?.username}>{author?.username}</NavLink></div>
							</div>
							<hr className="mt-3 border-t-2 border-primaryTxt"/>
							<div className="mt-10">{question?.content}</div>
						</div>
					</>
			}
		</>
	);
};

export default Question;