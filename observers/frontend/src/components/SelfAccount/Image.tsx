import React, {FC, useRef} from 'react';
import RegularButton from "../Buttons/RegularButton";
import FormData from "form-data";
import axios from "axios";
import {instance} from "../../Instance";
import {AccountEditProps, IUser} from "../../types/types";
import {useTypedSelector} from "../../hooks/useTypesSelector";

const Image: FC<AccountEditProps> = ({setLoading}) => {
	const clientId = "18687b9e2c86e05";
	const inputFile = useRef(null);
	const user = useTypedSelector(state => state.user.user);

	const imageUpload = (file: File) => {
		setLoading(true);
		let data = new FormData();
		data.append('image', file);
		let config = {
			headers: {
				Authorization: `Client-ID ${clientId}`,
				Accept: '*/*',
			}
		}
		axios.post('https://api.imgur.com/3/image', data, config)
			.then(response => {
				let profile_image: string = response.data.data.link;
				instance.patch<IUser>(`accounts/users/${user?.id}/`, {profile_image})
					.then(response => {
						if(user)
							user.profile_image = profile_image;
						setLoading(false);
					})
			})
			.catch(error => {
				console.log(error);
			})
	}

	return (
		<div className="account-img-block">
			<img
				src={user?.profile_image === 'default.jpg' ? '/' + user?.profile_image : user?.profile_image}
				className="account-img"
				alt="Profile"/>
			<input
				accept="image/*"
				type='file'
				id='file'
				ref={inputFile}
				className="hidden"
				// @ts-ignore
				onChange={() => imageUpload(inputFile.current.files[0])}
			/>
			<RegularButton
				content="Change"
				// @ts-ignore
				onClick={() => inputFile.current.click()}
				className="transparent-button w-full max-w-[200px]"
			/>
		</div>
	);
};

export default Image;