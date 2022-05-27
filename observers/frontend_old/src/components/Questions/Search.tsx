import React, {FC} from 'react';

const Search: FC = () => {
	return (
		<div className="search-field-container">
			<input type="text" placeholder="Search" className="search-field"/>
		</div>
	);
};

export default Search;