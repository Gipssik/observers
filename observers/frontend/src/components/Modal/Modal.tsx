import React, {FC} from 'react';
import Ex from "./Ex";
import {ModalProps} from "../../types/types";

const Modal: FC<ModalProps> = ({visible, setVisible, children}) => {

	const classes = ['modal'];

	if (visible) {
		classes.push('active');
	}

	return (
		<div className={classes.join(' ')} onClick={() => setVisible(false)}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<Ex onClick={() => setVisible(false)}/>
				{children}
			</div>
		</div>
	);
};

export default Modal;