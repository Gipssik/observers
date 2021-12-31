import axios from "axios";

export const instance = axios.create({
	baseURL: 'http://192.168.0.102:8000/api/',
});

instance.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');
	if(config && config.headers)
		config.headers.Authorization = token ? token : '';
	return config;
});
