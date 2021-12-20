import React, {FC, useEffect, useState} from 'react';
import Header from "./components/Header/Header";
import {BrowserRouter} from "react-router-dom";
import Footer from "./components/Footer/Footer";
import {AuthContext} from "./Context/Context";
import AppRouter from "./components/AppRouter/AppRouter";
import {IUser} from "./Types/Types";
import {instance} from "./Instance";
import Loader from "./components/Loader/Loader";

const App: FC = () => {
	const [isAuth, setIsAuth] = useState(false);
	const [initialised, setInitialised] = useState(false);

	useEffect(() => {
		instance.get<IUser>('accounts/users/me')
			.then(response => {
				setIsAuth(true);
				setInitialised(true);
			})
			.catch(error => {
				if(localStorage.getItem('token'))
					localStorage.removeItem('token');
				setInitialised(true);
			})
	}, []);

	return(
		<AuthContext.Provider value={{
			isAuth,
			setIsAuth
		}}>
			<BrowserRouter>
				<div className="app-container">
					{
						initialised
						?	<>
								<Header />
								<AppRouter />
								<Footer />
							</>
						: <Loader/>
					}

				</div>
			</BrowserRouter>
		</AuthContext.Provider>
	);
};

export default App;