import React, {FC, useEffect} from 'react';
import {useTypedSelector} from "../../hooks/useTypesSelector";
import {useDispatch} from "react-redux";
import {fetchRoles} from "../../store/action-creators/roles";
import Loader from "../Loader/Loader";
import Table from "./Table";
import {fetchComments} from "../../store/action-creators/comments";

const Comments: FC = () => {
	const {comments, loading, error} = useTypedSelector(state => state.comments);
	const dispatch = useDispatch();

	useEffect(() => {
		if(!comments)
			dispatch(fetchComments());
	}, []);

	return (
		<>
			{
				loading ?
					<Loader/>
					:
					(comments ? <Table objectArray={comments}/> : null)
			}
		</>

	);
};

export default Comments;