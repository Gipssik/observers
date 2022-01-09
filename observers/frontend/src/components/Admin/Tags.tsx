import React, {FC, useEffect} from 'react';
import {useTypedSelector} from "../../hooks/useTypesSelector";
import {useDispatch} from "react-redux";
import {fetchRoles} from "../../store/action-creators/roles";
import Loader from "../Loader/Loader";
import Table from "./Table";
import {fetchTags} from "../../store/action-creators/tags";

const Tags: FC = () => {
	const {tags, loading, error} = useTypedSelector(state => state.tags);
	const dispatch = useDispatch();

	useEffect(() => {
		if(!tags)
			dispatch(fetchTags());
	}, []);

	return (
		<>
			{
				loading ?
					<Loader/>
					:
					(tags ? <Table objectArray={tags}/> : null)
			}
		</>

	);
};

export default Tags;