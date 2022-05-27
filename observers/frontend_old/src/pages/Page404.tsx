import React, {FC, useEffect} from 'react';

const Page404: FC = () => {

	useEffect(() => {
		document.title = 'Not Found - Observers';
	}, []);

	return (
		<div>
			<h1 className="error404-title">Error 404: Page not found.</h1>
		</div>
	);
};

export default Page404;