import React, {FC, useEffect, useState} from 'react';
import {useTypedSelector} from "../hooks/useTypesSelector";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {fetchTags} from "../store/action-creators/tags";
import Loader from "../components/Loader/Loader";
import {AdminActionTypes, ITag, TagsActionTypes} from "../types/types";
import {useFormik} from "formik";
import {EditTagSchema} from "../forms/forms";
import CreationField from "../components/Fields/CreationField";
import SubmitButton from "../components/Buttons/SubmitButton";
import {instance} from "../Instance";

const EditTag: FC = () => {
	const [tag, setTag] = useState<ITag>();
	const {id} = useParams();
	const user = useTypedSelector(state => state.user.user);
	const {tags, loading, error} = useTypedSelector(state => state.tags);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const submit = () => {
		const title: string = formik.values.title;

		if(tag){
			instance.patch<ITag>(`forum/tags/${tag.id}/`, {title})
				.then(response => {
					if(tags){
						const t = tags?.findIndex(obj => {return obj.id === Number(id)});
						if(t !== -1){
							let ts = tags;
							ts[t] = response.data;
							dispatch({type: TagsActionTypes.FETCH_TAGS_SUCCESS, payload: ts});
						}
						dispatch({type: AdminActionTypes.SET_ACTIVE, payload: 'Tag'});
						navigate('/admin');
					}
				})
				.catch(error => {
					if(error.response.status === 403){
						formik.setErrors({title: 'Tag with this title already exists'});
					}
				})
		}
	}

	const formik = useFormik({
		initialValues: {
			title: tag?.title ? tag.title : "",
		},
		onSubmit: submit,
		validationSchema: EditTagSchema
	})

	useEffect(() => {
		dispatch(fetchTags());
	}, [])

	useEffect(() => {
		if(tags){
			const t = tags.find(obj => {return obj.id === Number(id)});
			if(t)
				setTag(t);
		}
	}, [tags]);

	useEffect(() => {
		if(user?.role.title !== 'Admin')
			navigate(`/404`);
	}, [user])

	useEffect(() => {
		document.title = 'Edit Tag - Observers';
	}, []);

	return (
		<>
			{
				loading ?
					<Loader/>
					:
					<div>
						<form onSubmit={formik.handleSubmit} className="form">
							<CreationField
								content="title"
								id="title"
								type="text"
								errors={formik.errors.title}
								handleChange={formik.handleChange}
								value={tag?.title ? tag.title : ""}
							/>
							<div className="mx-auto mt-5">
								<SubmitButton content={"Edit"}/>
							</div>
						</form>
					</div>
			}
		</>
	);
};

export default EditTag;