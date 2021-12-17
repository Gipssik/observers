import React, {FC} from 'react';
import Header from "./components/Header/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RegisterForm from "./components/Register/RegisterForm";
import Footer from "./components/Footer/Footer";
import LoginForm from "./components/Login/LoginForm";

const App: FC = () => {
	return (
		<BrowserRouter>
			<div className='bg-secondaryBg min-h-full'>
				<Header />
				<Routes>
					<Route path='/register' element={<RegisterForm/>}/>
					<Route path='/login' element={<LoginForm/>}/>
				</Routes>
				<Footer />
			</div>
		</BrowserRouter>
	);
};

export default App;