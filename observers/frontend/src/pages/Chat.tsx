import React, {FC, useEffect, useRef, useState} from 'react';
import {url} from "../Instance";
import RegularButton from "../components/Buttons/RegularButton";
import {useTypedSelector} from "../hooks/useTypesSelector";

const Chat: FC = () => {
	const user = useTypedSelector(state => state.user.user);
	const [messages, setMessages] = useState<any>([]);
	const [status, setStatus] = useState("");
	const ws = useRef<WebSocket | null>(null);

	useEffect(() => {
		ws.current = new WebSocket(`ws://${url}ws/chat/?token=${localStorage.getItem('token')}`, );
		ws.current.onopen = () => setStatus('Open');
		ws.current.onclose = () => setStatus('Close');
		ws.current.onmessage = (e) => {
			console.log(messages);
			setMessages([...messages, e.data]);
		}
	}, [ws])

	return (
		<div>
			{status}
			<input id="message" type="text" className="field"/>
			<RegularButton content="Send" onClick={() => {
				if(ws.current && user){
					let message = document.querySelector<HTMLInputElement>('#message')?.value;
					let data = {
						user: user.username,
						message
					}
					if(data)
						ws.current.send(JSON.stringify(data));
				}
			}}
			/>
			{
				messages.map((message: any) => {
						message = JSON.parse(message);
						return <div key={new Date().getTime()}>{message.user}: {message.message}</div>;
					}
				)
			}
		</div>
	);
};

export default Chat;