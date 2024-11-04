import React from 'react'
import { FieldErrors } from 'react-hook-form';

const FormError = ({ errors, errorName }: { errors: FieldErrors, errorName: string }) => {
	return <div className="text-red-500 text-sm mb-4">{errors[errorName]?.message}</div>
}

export default FormError