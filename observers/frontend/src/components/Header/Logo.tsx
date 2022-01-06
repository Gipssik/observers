import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";

interface LogoProps{
	className?: string;
}

const Logo: FC<LogoProps> = ({className}) => {
	const navigate = useNavigate();

	return (
		<span onClick={() => navigate('/')} className={"logo " + (className ? className : "")}>
            <span className='text-primaryTxt not-italic'>Ob</span>servers
		</span>
	);
};

export default Logo;