import React, {FC} from 'react';
import {Field} from "formik";
import {RegisterFieldProps} from "../../types/types";

const TextareaField: FC<RegisterFieldProps> = ({content, id, errors, touched}) => {
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
							<textarea {...field} id={id} className="bg-primaryBg text-primaryTxt border-2 border-secondaryTxt rounded-md w-full h-64 px-4 py-2 focus:outline-none focus:border-primaryTxt"></textarea>
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

export default TextareaField;