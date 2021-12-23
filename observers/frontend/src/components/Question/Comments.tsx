import React, {FC, useState} from 'react';
import {instance} from "../../Instance";
import {IQuestion, IUser} from "../../types/types";
import {NavLink, useNavigate} from "react-router-dom";
import {useTypedSelector} from "../../hooks/useTypesSelector";

interface CommentsProps{
	question: IQuestion;
}

const Comments: FC<CommentsProps> = ({question}) => {
	const [commentators, setCommentators] = useState<IUser[]>([]);
	const self = useTypedSelector(state => state.user.user);
	const navigate = useNavigate();

	// TODO: Load comments only when open question

	return (
		<>
			<div className="text-3xl mt-5 mr-16 font-bold text-right">Comments</div>
			{question.comments.map(c => {
				if(commentators.filter(obj => obj.id === c.author_id).length === 0){
					instance.get<IUser>('accounts/users/' + c.author_id)
						.then(response => {
							setCommentators([...commentators, response.data]);
						})
						.catch(error => {
							navigate('/404');
						})
				}

				const u = commentators.find(obj => obj.id === c.author_id)

				return (
					<div className="flex flex-col my-5 border-2 border-primaryTxt rounded-md" key={c.id}>
						<div
							className={"relative flex p-3 items-center font-bold justify-between "
							+ (c.is_answer ? "bg-primaryTxt text-primaryBg" : "")}
						>
							<div>
								<NavLink
									to={self?.id === u?.id ? '/account' :'/account/' + u?.username}
									className="text-lg transition hover:opacity-70"
								>
									{u?.username}
								</NavLink>
								<div className="text-xs">{new Date(c?.date_created).toLocaleString().slice(0, -3)}</div>
							</div>
							<div className="flex items-center gap-6">
								{
									c.is_answer ?
										<div className="text-xl text-green-700 transition hover:opacity-70 hover:cursor-pointer">✔</div>
										:
										null
								}
								<div className="tracking-[5px]">
									<span className="text-green-700 text-lg">▲</span>
									<span>{c.rating}</span>
									<span className="text-red-700 text-lg">▼</span>
								</div>
							</div>
						</div>
						<hr className="single-question-hr mt-0"/>
						<div className="p-3" dangerouslySetInnerHTML={{__html: c.content}}></div>
					</div>
				);
			})
			}
		</>
	);
};

export default Comments;