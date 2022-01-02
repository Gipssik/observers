import React, {FC, useEffect} from 'react';
import Header from "./components/Header/Header";
import {BrowserRouter} from "react-router-dom";
import Footer from "./components/Footer/Footer";
import AppRouter from "./components/AppRouter/AppRouter";
import Loader from "./components/Loader/Loader";
import {useTypedSelector} from "./hooks/useTypesSelector";
import {useDispatch} from "react-redux";
import {fetchUser} from "./store/action-creators/user";
import {fetchNotifications} from "./store/action-creators/notifications";

const App: FC = () => {
	const {user, loading, error} = useTypedSelector(state => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		if(!user)
			dispatch(fetchUser());
		if (user)
			dispatch(fetchNotifications(user.id));

		if(error && localStorage.getItem('token')){
			localStorage.removeItem('token');
		}
	}, [user]);

	return(
		<BrowserRouter>
			<div className="app-container">
				{
					loading
					?	<Loader />
					: 	<>
							<Header />
							<AppRouter />
							<Footer />
						</>
				}

			</div>
		</BrowserRouter>
	);
};

export default App;