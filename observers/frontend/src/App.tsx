import React, {FC} from 'react';
import Header from "./components/Header/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RegisterForm from "./components/Register/RegisterForm";

const App: FC = () => {
	return (
		<BrowserRouter>
			<div className='bg-secondaryBg'>
				<Header />
			</div>
			<Routes>
				<Route path='/register' element={<RegisterForm/>}/>
			</Routes>
		</BrowserRouter>
	);
};

export default App;