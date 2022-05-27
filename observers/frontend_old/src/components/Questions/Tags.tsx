import React, {FC} from 'react';
import {fetchQuestionsByTag} from "../../store/action-creators/questions";
import {useDispatch} from "react-redux";
import {TagsProps} from "../../types/types";

const Tags: FC<TagsProps> = ({tags, clickable}) => {
	const dispatch = useDispatch();

	return (
		<>
			{
				tags.length > 0 ?
					<div className="flex gap-2 overflow-x-auto max-w-full">
						{tags.map(t =>
							<span
								onClick={
									clickable ?
										() => dispatch(fetchQuestionsByTag(t.title))
									:
										() => {}
								}
								key={t.title} className={`question-tag ${clickable ? "active-tag" : ""}`}
							>
								{t.title}
							</span>
						)}
					</div>
					: null
			}
		</>
	);
};

export default Tags;