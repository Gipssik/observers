import React, {FC, useEffect} from 'react';
import {NavLink} from "react-router-dom";
import Logo from "../components/Header/Logo";

const Welcome: FC = () => {

	useEffect(() => {
		document.title = 'Observers';
	}, []);

	return (
		<div className="welcome-container">
			<h1 className="welcome-title">
				Welcome to <Logo className="text-5xl"/>!
			</h1>
			<div className="text-3xl">
				<div className="welcome-list-title">Here you <span className="text-white">can</span>:</div>
				<div className="welcome-list">
					<NavLink to="/register"><div>Create</div> your own account</NavLink>
					<NavLink to="/account"><div>Change</div> an information about you</NavLink>
					<NavLink to="/questions"><div>Find</div> an answer to your question</NavLink>
					<NavLink to="/ask-question"><div>Ask</div> your question</NavLink>
					<NavLink to="/news"><div>Read</div> last news about <Logo/></NavLink>
					<NavLink to="/chat"><div>Chat</div> with other users of <Logo/></NavLink>
				</div>
			</div>
		</div>
	);
};

export default Welcome;