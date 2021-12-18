import React, {FC, useEffect, useState} from 'react';
import Header from "./components/Header/Header";
import {BrowserRouter} from "react-router-dom";
import Footer from "./components/Footer/Footer";
import {AuthContext} from "./Context/Context";
import AppRouter from "./components/AppRouter/AppRouter";
import axios from "axios";
import {IUser} from "./Types/Types";

const App: FC = () => {
	const [isAuth, setIsAuth] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if(token !== null){
			axios.get<IUser>('http://127.0.0.1:8000/api/accounts/users/me', {
				headers: {
					Authorization: token
				}
			})
				.then(response => {
					setIsAuth(true);
				})
				.catch(error => {
					localStorage.removeItem('token');
				})
		}
	}, [])

	return (
		<AuthContext.Provider value={{
			isAuth,
			setIsAuth
		}}>
			<BrowserRouter>
				<div className='bg-secondaryBg min-h-full'>
					<Header />
					<AppRouter />
					<Footer />
				</div>
			</BrowserRouter>
		</AuthContext.Provider>
	);
};

export default App;