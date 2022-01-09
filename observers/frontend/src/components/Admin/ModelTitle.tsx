import React, {FC} from 'react';
import {useTypedSelector} from "../../hooks/useTypesSelector";
import {useDispatch} from "react-redux";
import {AdminActionTypes} from "../../types/types";

interface ModelTitleProps{
	title: string;
}

const ModelTitle: FC<ModelTitleProps> = ({title}) => {
	const active = useTypedSelector(state => state.admin.active);
	const dispatch = useDispatch();

	const setActive = () => {
		dispatch({type: AdminActionTypes.SET_ACTIVE, payload: title});
	}

	return (
		<div
			className={"admin-model-title" + (active === title ? " border-y-primaryTxt" : "")}
			onClick={() => setActive()}
		>
			<span className={active === title ? "admin-model-title-active" : ""}>
				{title}
			</span>
		</div>
	);
};

export default ModelTitle;