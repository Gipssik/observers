import React, {FC} from 'react';
import {IMessage} from "../../types/types";
import {useTypedSelector} from "../../hooks/useTypesSelector";
import {NavLink} from "react-router-dom";

interface MessageProps{
	message: IMessage;
}

const Message: FC<MessageProps> = ({message}) => {
	const user = useTypedSelector(state => state.user.user);

	return (
		<>
			{
				message.connection ?
					<div className="message-center">
						{
							user?.username === message.user ?
								"You "
								:
								<>
									<NavLink to={`/account/${message.user}`}>
										{message.user}
									</NavLink>&nbsp;
								</>

						}
						{message.message}
					</div>
					:
					<div className={user?.username === message.user ? "message-right" : "message-left"}>
						{
							user?.username === message.user ?
								""
								:
								<>
									<NavLink to={`/account/${message.user}`}>
										{message.user}
									</NavLink>:&nbsp;
								</>
						}
						{message.message}
						<div className="message-time">
							{message.time}
						</div>
					</div>
			}

		</>

	);
};

export default Message;