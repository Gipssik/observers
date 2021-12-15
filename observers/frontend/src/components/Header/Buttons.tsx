import React, {FC} from 'react';
import HeaderButton from "../Buttons/HeaderButton";

const Buttons: FC = () => {
	return (
		<div className='flex gap-2'>
			<HeaderButton content='register' url='/register'/>
			<HeaderButton content='login' url='/login'/>
		</div>
	);
};

export default Buttons;