import React, {FC} from 'react';
import {Hypnosis} from "react-cssfx-loading";

const Loader: FC = () => {
	return (
		<div className="loader">
			<Hypnosis
				className="-translate-x-[50%] -translate-y-[50%]"
				color="#F9AE74" width="150px" height="150px" duration="1.5s"/>
		</div>
	);
};

export default Loader;
