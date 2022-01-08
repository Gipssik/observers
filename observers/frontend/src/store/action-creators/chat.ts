import {Dispatch} from "redux";
import {ChatAction, ChatActionTypes} from "../../types/types";

export const connectToChat = (url: string, onopen: any, onclose: any, onmessage: any) => {
	return async (dispatch: Dispatch<ChatAction>) => {
		dispatch({type: ChatActionTypes.CREATE_CONNECTION, payload: url});
		dispatch({type: ChatActionTypes.SET_CONNECTED, payload: true});
		dispatch({type: ChatActionTypes.SET_ONOPEN, payload: onopen});
		dispatch({type: ChatActionTypes.SET_ONCLOSE, payload: onclose});
		dispatch({type: ChatActionTypes.SET_ONMESSAGE, payload: onmessage});
	}
}