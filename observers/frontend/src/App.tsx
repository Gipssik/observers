import React, {FC, useEffect, useState} from 'react';
import Header from "./components/Header/Header";
import {BrowserRouter} from "react-router-dom";
import Footer from "./components/Footer/Footer";
import {AuthContext} from "./Context/Context";
import AppRouter from "./components/AppRouter/AppRouter";
import {IUser} from "./Types/Types";
import {instance} from "./Instance";

const App: FC = () => {
	const [isAuth, setIsAuth] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if(token !== null){
			instance.get<IUser>('accounts/users/me')
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