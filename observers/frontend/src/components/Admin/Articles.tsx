import React, {FC, useEffect} from 'react';
import {useTypedSelector} from "../../hooks/useTypesSelector";
import {useDispatch} from "react-redux";
import Loader from "../Loader/Loader";
import Table from "./Table";
import {fetchArticles} from "../../store/action-creators/articles";

const Articles: FC = () => {
	const {articles, loading, error} = useTypedSelector(state => state.articles);
	const dispatch = useDispatch();

	useEffect(() => {
		if(!articles)
			dispatch(fetchArticles());
	}, []);

	return (
		<>
			{
				loading ?
					<Loader/>
					:
					(articles ? <Table objectArray={articles}/> : null)
			}
		</>
	);
};

export default Articles;