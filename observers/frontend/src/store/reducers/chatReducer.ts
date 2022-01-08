import {ChatAction, ChatActionTypes, ChatState} from "../../types/types";

const initialState: ChatState = {
	messages: null,
	connected: false,
	ws: null
}

export const chatReducer = (state = initialState, action: ChatAction): ChatState => {
	switch (action.type) {
		case ChatActionTypes.CREATE_CONNECTION:
			if (state.ws !== null){
				state.ws.close();
			}
			const ws = new WebSocket(action.payload);
			return {...state, ws: ws};
		case ChatActionTypes.SET_ONOPEN:
			if(state.connected && state.ws){
				let localWs = state.ws;
				localWs.onopen = action.payload;
				return {...state, ws: localWs};
			}
			return state;
		case ChatActionTypes.SET_ONCLOSE:
			if(state.connected && state.ws){
				let localWs = state.ws;
				localWs.onclose = action.payload;
				return {...state, ws: localWs};
			}
			return state;
		case ChatActionTypes.SET_ONMESSAGE:
			if(state.connected && state.ws){
				let localWs = state.ws;
				localWs.onmessage = action.payload;
				return {...state, ws: localWs};
			}
			return state;
		case ChatActionTypes.ADD_MESSAGE:
			if (state.messages && state.messages.length > 0)
				return {...state, messages: [...state.messages, action.payload]};
			return {...state, messages: [action.payload]};
		case ChatActionTypes.SET_CONNECTED:
			return {...state, connected: action.payload};
		case ChatActionTypes.CLEAR_STATE:
			state.ws?.close();
			return {...state, connected: false, messages: null, ws: null};
		default:
			return state;
	}
}