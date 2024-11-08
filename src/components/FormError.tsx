import React from 'react'
import { FieldErrors } from 'react-hook-form';

const FormError = ({ errors, name }: { errors: FieldErrors, name: string }) => {
	return <div className="text-red-500 text-sm mb-4">{errors[name]?.message}</div>
}

export default FormError