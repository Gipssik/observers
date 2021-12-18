import React, {FC, useContext} from 'react';
import {router} from "../../Router/Router";
import {Route, Routes} from "react-router-dom";
import {AuthContext} from "../../Context/Context";

const AppRouter: FC = () => {
	const {isAuth, setIsAuth} = useContext(AuthContext);

	return (
		<Routes>
			{router.map(route => <Route path={route.path} element={route.component} key={route.path}/> )}
		</Routes>
	);
};

export default AppRouter;