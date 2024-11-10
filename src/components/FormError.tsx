import React from 'react';
import { FieldErrors } from 'react-hook-form';

const FormError = ({ errors, name }: { errors: FieldErrors; name: string }) => {
	const errorMessage = errors[name]?.message;
	if (!errorMessage) return null;
	return (
		<div className="text-red-500 text-sm mb-4">
			<p>{`${errorMessage}`}</p>
		</div>
	);
};

export default FormError;
