import React, {FC} from 'react';
import Header from "./components/Header/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RegisterForm from "./components/Register/RegisterForm";
import Footer from "./components/Footer/Footer";

const App: FC = () => {
	return (
		<BrowserRouter>
			<div className='bg-secondaryBg min-h-full'>
				<Header />
				<Routes>
					<Route path='/register' element={<RegisterForm/>}/>
				</Routes>
				<Footer />
			</div>
		</BrowserRouter>
	);
};

export default App;