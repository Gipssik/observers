import React, {FC} from 'react';
import {Field} from "formik";
import {RegisterFieldProps} from "../../types/types";

const CreationField: FC<RegisterFieldProps> = ({content, type, id, errors, touched}) => {
	return (
		<div className="flex flex-col gap-2">
			<label className="text-primaryTxt text-xl" htmlFor={id}>
				{content.charAt(0).toUpperCase() + content.slice(1)}:
			</label>
			<div className="options-container">
				<Field name={id}>
					{/*@ts-ignore*/}
					{({field, form, meta}) => (
						<div className="w-full flex items-center relative">
							<input {...field} id={id} type={type} className="field w-full"/>
							{meta.touched && meta.error && (
								<div className="text-red-500 text-sm absolute left-[100%] ml-5 w-40">{meta.error}</div>
							)}
						</div>
					)}
				</Field>
			</div>
		</div>
	);
};

export default CreationField;