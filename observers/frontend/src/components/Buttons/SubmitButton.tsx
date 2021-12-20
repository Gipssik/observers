import React, {FC} from 'react';
import {SubmitButtonProps} from "../../types/types";


const SubmitButton: FC<SubmitButtonProps> = ({content}) => {
	return (
		<button type="submit" className="submit-button">
			{content}
		</button>
	);
};

export default SubmitButton;