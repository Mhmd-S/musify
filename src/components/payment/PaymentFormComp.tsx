'use client';

import { useRouter } from 'next/navigation';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { submitPayment } from '@services/paymetService';

import FormError from '@components/FormError';

import { PaymentForm, CreditCard } from 'react-square-web-payments-sdk';

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@components/ui/card';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';

type PaymentData = {
	name: string;
	address: string;
	city: string;
	state: string;
	zipCode: string;
	country: string;
	token: string;
};

type PaymentFormProps = {
	planId: number;
};

const PaymentFormComp = ({ planId }: PaymentFormProps) => {
  const router = useRouter();


	const APP_ID = process.env.NEXT_PUBLIC_SQUARE_SANDBOX_APP_ID;
	const LOCATION_ID = 'asdasdasd';

	const [loading, setLoading] = useState(false);

	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm();

	const handleSubmitPayment = async (data) => {
		setLoading(true);
    console.log('Form data:', data);
    data.planId = planId;
		// Proceed with payment tokenization or other submission logic here
		const result = await submitPayment(data);

    if (result) {
      router.push(`success/${123}`);      
    }

    setLoading(false);
	};

	return (
		<Card className="w-full max-w-2xl mx-auto">
			<CardHeader>
				<CardTitle>Payment Details</CardTitle>
				<CardDescription>
					Please enter your payment information
				</CardDescription>
			</CardHeader>
			<CardContent>
				<PaymentForm
					applicationId={APP_ID}
					locationId={LOCATION_ID}
					cardTokenizeResponseReceived={(token) =>
						handleSubmitPayment({ ...token, ...getValues() })
					}
				>
					<form
						className="space-y-4"
						onSubmit={handleSubmit(handleSubmitPayment)}
					>
						<div className="space-y-2">
							<Label htmlFor="name">Full Name</Label>
							<Input
								id="name"
								placeholder="John Doe"
								{...register('name', {
									required: 'Full Name is required',
								})}
							/>
							<FormError name="name" errors={errors} />
						</div>
						<div className="space-y-2">
							<Label htmlFor="address">Email</Label>
							<Input
								id="email"
								placeholder="johndoe@email.com"
								{...register('email', {
									required: 'Email is required',
									pattern: {
										value: /^\S+@\S+$/i,
										message: 'Invalid email address',
									},
								})}
							/>
							<FormError name="address" errors={errors} />
						</div>
						<div className="space-y-2">
							<Label htmlFor="address">Billing Address</Label>
							<Input
								id="address"
								placeholder="Billing Address"
								{...register('address', {
									required: 'Address is required',
									pattern: {
										value: /^\S+@\S+$/i,
										message: 'Invalid address',
									},
								})}
							/>
							<FormError name="address" errors={errors} />
						</div>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div className="space-y-2">
								<Label htmlFor="Country">Country</Label>
								<Input
									id="country"
									placeholder="Country"
									{...register('country', {
										required: 'Country is required',
									})}
								/>
								<FormError name="city" errors={errors} />
							</div>
							<div className="space-y-2">
								<Label htmlFor="city">City</Label>
								<Input
									id="city"
									placeholder="City"
									{...register('city', {
										required: 'City is required',
									})}
								/>
								<FormError name="city" errors={errors} />
							</div>
							<div className="space-y-2">
								<Label htmlFor="zipCode">ZIP Code</Label>
								<Input
									id="zipCode"
									placeholder="10001"
									{...register('zipCode', {
										required: 'ZIP Code is required',
									})}
								/>
								<FormError name="zipCode" errors={errors} />
							</div>
						</div>
						<div className="space-y-2">
							<Label htmlFor="card-number">
								Card Information
							</Label>
							<CreditCard
								buttonProps={{
									css: {
										"[data-theme='dark'] &": {
											backgroundColor: '#c8d5d8',
											color: 'var(--ifm-color-emphasis-100)',
											'&:hover': {
												backgroundColor: '#ccd5da',
											},
										},
										backgroundColor: '#000000',
										fontSize: '14px',
										color: '#fff',
										'&:hover': {
											backgroundColor: '#000000',
										},
									},
								}}
								style={{
									input: {
										fontSize: '14px',
									},
									'input::placeholder': {
										color: '#000000',
									},
								}}
							/>
						</div>
					</form>
				</PaymentForm>
			</CardContent>
		</Card>
	);
}


export default PaymentFormComp;