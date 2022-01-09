import React, {FC} from 'react';
import Logo from "../Header/Logo";
import ModelTitle from "./ModelTitle";

const AdminMenu: FC = () => {
	const models = ['Role', 'User', 'Tag', 'Question', 'Comment', 'Article'];

	return (
		<div className="admin-menu">
			<div className="admin-logo">
				<Logo/>
				<span className="admin-sub">admin panel</span>
			</div>
			<div className="admin-models-names-container">
				{
					models.map(
						(model, index) => <ModelTitle key={index} title={model}/>
					)
				}
			</div>
		</div>
	);
};

export default AdminMenu;