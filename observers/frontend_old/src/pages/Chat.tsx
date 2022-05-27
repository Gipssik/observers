import React, {FC, useEffect, useRef, useState} from 'react';
import {url} from "../Instance";
import RegularButton from "../components/Buttons/RegularButton";
import {useTypedSelector} from "../hooks/useTypesSelector";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {connectToChat} from "../store/action-creators/chat";
import {ChatActionTypes, IMessage} from "../types/types";
import Message from "../components/Chat/Message";

const Chat: FC = () => {
	const user = useTypedSelector(state => state.user.user);
	const authenticated = useTypedSelector(state => state.auth.authenticated);
	const {messages, connected, ws} = useTypedSelector(state => state.chat);
	const [messageText, setMessageText] = useState('');
	const messageBlock = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const send = (message: string) => {
		if(ws && user){
			let data: IMessage = {
				user: user.username,
				message: message,
				time: new Date().toLocaleTimeString().slice(0, -3)
			};
			ws.send(JSON.stringify(data));
		}
	}

	const onopen = () => {
		dispatch({type: ChatActionTypes.SET_CONNECTED, payload: true});
		send('connected to the chat.');
	}

	const onclose = () => {
		dispatch({type: ChatActionTypes.CLEAR_STATE});
		send('left the chat.');
	}

	const onmessage = (e: MessageEvent) => {
		dispatch({type: ChatActionTypes.ADD_MESSAGE, payload: e.data});
	}

	const onClick = () => {
		if(messageText.trim().length > 0){
			send(messageText.trim());
			setMessageText('');
		}
	}

	useEffect(() => {
		document.title = 'Chat - Observers';
	}, []);

	useEffect(() => {
		messageBlock.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	useEffect(() => {
		if(!authenticated || !user){
			navigate('/login');
		}
	}, [authenticated])

	useEffect(() => {
		if(authenticated && user && !connected){
			dispatch(connectToChat(
				`ws://${url}ws/chat/?token=${localStorage.getItem('token')}`,
				onopen,
				onclose,
				onmessage
			));
		}else if((!authenticated || !user) && connected){
			dispatch({type: ChatActionTypes.SET_CONNECTED, payload: false});
		}
	}, [])

	return (
		<div className="chat-container">
			<div className="chat-messages-block">
				{
					messages ?
						messages.map((message: any, index) =>
							<Message message={JSON.parse(message)} key={index}/>)
						:
						null
				}
				<div ref={messageBlock}/>
			</div>

			<div className="message-input">
				<input
					onKeyUp={(e) => {
						if(e.key === 'Enter')
							onClick();
					}}
					value={messageText}
					onChange={(e) => setMessageText(e.target.value)}
					id="message"
					type="text"
					className="field"
					autoComplete="off"
				/>
				<RegularButton content="Send" onClick={onClick}/>
			</div>
		</div>
	);
};

export default Chat;