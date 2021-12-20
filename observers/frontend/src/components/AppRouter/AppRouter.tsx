import React, {FC} from 'react';
import {router} from "../../router/Router";
import {Route, Routes} from "react-router-dom";

const AppRouter: FC = () => {
	return (
		<Routes>
			{router.map(route => <Route path={route.path} element={route.component} key={route.path}/> )}
		</Routes>
	);
};

export default AppRouter;