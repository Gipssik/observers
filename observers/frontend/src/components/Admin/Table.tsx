import React, {ReactNode} from 'react';
import Edit from "../Question/Edit";
import Trash from "../Question/Trash";

interface TableProps<T>{
	objectArray: T[];
	onEdit?: (arg0: T) => void;
	onDelete?: (arg0: T) => void;
}

const Table = <T extends object>({objectArray, onDelete, onEdit}: TableProps<T> & {children?: ReactNode}) => {
	const renderColumns = (obj: T) => {
		return (
			<>
				{
					onEdit ?
						<td><Edit onClick={() => onEdit(obj)} width={32} height={32}/></td>
						:
						null
				}
				{
					onDelete ?
						<td><Trash onClick={() => onDelete(obj)} width={32} height={32}/></td>
						:
						null
				}
				{
					Object.entries(obj).map(([key, value], index) => {
						let content;
						if (Array.isArray(value))
							content = value.length;
						else if(typeof value === 'object' && !Array.isArray(value) && value !== null){
							if(value.title !== undefined)
								content = value.title;
							else
								content = `{${key}}`;
						}
						else
							content = value?.toString();
						return <td key={index}>{content}</td>
					})
				}
			</>
		);
	}

	return (
		<table className="admin-table">
			<thead>
				<tr>
					{
						onEdit ?
							<th>Edit</th>
							:
							null
					}
					{
						onDelete ?
							<th>Del</th>
							:
							null
					}
					{
						objectArray && objectArray.length > 0 ?
							Object.keys(objectArray[0]).map((key, index) =>
								<th key={index}>{key}</th>
							)
							:
							null
					}
				</tr>
			</thead>
			<tbody>
				{
					objectArray?.map((obj, index) => {
						return (
							<tr key={index}>
								{renderColumns(obj)}
							</tr>
						)
					})
				}
			</tbody>
		</table>
	);
};

export default Table;