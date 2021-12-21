import React, {FC, useEffect} from 'react';
import Header from "./components/Header/Header";
import {BrowserRouter} from "react-router-dom";
import Footer from "./components/Footer/Footer";
import AppRouter from "./components/AppRouter/AppRouter";
import Loader from "./components/Loader/Loader";
import {useTypedSelector} from "./hooks/useTypesSelector";
import {useDispatch} from "react-redux";
import {fetchUser} from "./store/action-creators/user";

const App: FC = () => {
	const {user, loading, error} = useTypedSelector(state => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchUser());

		if(error && localStorage.getItem('token')){
			localStorage.removeItem('token');
		}
	}, []);

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