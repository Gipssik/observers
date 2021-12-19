import React, {FC, useContext, useEffect, useState} from 'react';
import {AuthContext} from "../Context/Context";
import {useNavigate, useParams} from "react-router-dom";
import {IQuestion, IUser} from "../Types/Types";
import {instance} from "../Instance";


const Question: FC = () => {
	const [question, setQuestion] = useState<IQuestion>();
	const [author, setAuthor] = useState<IUser>();
	const {isAuth, setIsAuth} = useContext(AuthContext);
	const navigate = useNavigate();
	const id = useParams().id;

	useEffect(() => {
		instance.get<IQuestion>('forum/questions/' + id)
			.then(response => {
				setQuestion(response.data);
				if(response.data){
					instance.patch<IQuestion>('forum/questions/' + id, {
						views: response.data.views + 1
					});
				}
			})
			.catch(error => {
				navigate('/404');
			});
	}, []);

	return (
		<div className="w-1/2 mx-auto text-primaryTxt mt-10">
			<h1 className="text-3xl font-bold">{question?.title}</h1>

			<div className="flex gap-5 mt-3">
				{
					question &&
					<div className="font-bold text-secondaryTxt">
						{new Date(question?.date_created).toLocaleString().slice(0, -3)}
					</div>
				}
				<div className="w-14">&#128065; {question?.views}</div>
				<div></div>
			</div>
			<div className="mt-10">{question?.content}</div>
		</div>
	);
};

export default Question;