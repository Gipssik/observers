import React, {FC} from 'react';
import {useTypedSelector} from "../../hooks/useTypesSelector";
import Roles from "./Roles";
import Users from "./Users";
import Tags from "./Tags";
import Questions from "./Questions";
import Comments from "./Comments";
import Articles from "./Articles";

const ModelBlock: FC = () => {
	const active = useTypedSelector(state => state.admin.active);

	const renderContent = () => {
		switch (active){
			case 'Role':
				return <Roles/>;
			case 'User':
				return <Users/>;
			case 'Tag':
				return <Tags/>;
			case 'Question':
				return <Questions/>;
			case 'Comment':
				return <Comments/>;
			case 'Article':
				return <Articles/>;
			default:
				return null;
		}
	}

	return (
		<div className="admin-model-container">
			{renderContent()}
		</div>
	);
};

export default ModelBlock;