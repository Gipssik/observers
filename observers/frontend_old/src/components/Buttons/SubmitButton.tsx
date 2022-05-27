import React, {FC} from 'react';
import {SubmitButtonProps} from "../../types/types";


const SubmitButton: FC<SubmitButtonProps> = ({content, onClick}) => {
	return (
		<button type="submit" className="submit-button" {...(onClick && {onClick: onClick})}>
			{content}
		</button>
	);
};

export default SubmitButton;