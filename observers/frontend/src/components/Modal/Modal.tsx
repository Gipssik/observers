import React, {FC, useState} from 'react';
import Ex from "./Ex";

interface ModalProps{
	visible: boolean;
	setVisible: any;
}

const Modal: FC<ModalProps> = ({visible, setVisible, children}) => {

	const classes = ['modal'];

	if (visible) {
		classes.push('active');
	}

	return (
		<div className={classes.join(' ')}>
			<div className="modal-content">
				<Ex onClick={() => setVisible(false)}/>
				{children}
			</div>
		</div>
	);
};

export default Modal;