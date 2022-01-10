import React, {FC, useState} from 'react';
import NavbarItem from "./NavbarItem";
import Buttons from "./Buttons";
import Menu from "./Menu";

const Navbar: FC = () => {
	const [visible, setVisible] = useState(false);

	return (
		<nav>
			<Menu onClick={() => setVisible(!visible)}/>
			<div className={"navbar " + (visible ? "navbar-active" : "")}>
				<div className="navbar-links">
					<NavbarItem content='questions' url='/questions'/>
					<NavbarItem content='news' url='/news'/>
					<NavbarItem content='chat' url='/chat'/>
				</div>
				<Buttons />
			</div>
		</nav>
	);
};

export default Navbar;