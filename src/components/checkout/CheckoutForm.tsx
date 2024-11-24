'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { TokenResult } from '@square/web-sdk';
import { PaymentForm, CreditCard } from 'react-square-web-payments-sdk';
import { submitPayment } from '@services/paymetService';
import FormError from '@components/FormError';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@components/ui/card';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { toast } from 'react-toastify';

interface CheckoutFormData {
	name: string;
	address: string;
	city: string;
	zipCode: string;
	country: string;
	email: string;
	planId: number;
}

interface CheckoutFormProps {
	planId: number;
}

interface SubmitPaymentData extends CheckoutFormData {
	token: string;
}

const CheckoutForm = ({ planId }: CheckoutFormProps) => {
	const router = useRouter();

	const APP_ID =
		process.env.NODE_ENV == 'production'
			? process.env.NEXT_PUBLIC_SQUARE_APP_ID
			: process.env.NEXT_PUBLIC_SQUARE_SANDBOX_APP_ID;

	const LOCATION_ID =
		process.env.NODE_ENV == 'production'
			? process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID
			: process.env.NEXT_PUBLIC_SQUARE_APP_ID;

	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<CheckoutFormData>();

	const handleSubmitPayment = async (data: SubmitPaymentData) => {
		try {
			if (!data.token) {
				toast.error(
					'Please enter your card information. If error persists, please contact support.'
				);
				return;
			}

			const result = await submitPayment(data);

			if (result?.data?.receipt?.status === 'COMPLETED') {
				router.push(`success/${result?.data?.receipt._id}`);
			}
		} catch (error) {
			toast.error('Payment failed. Please try again or contact support.');
		}
	};

	const handleTokenize = async (tokenResult: TokenResult) => {
		if (tokenResult.status !== 'OK' || !tokenResult.token) {
			toast.error('Payment failed. Please try again or contact support.');
			return;
		}

		const formValues = getValues();
		await handleSubmitPayment({
			...formValues,
			planId,
			token: tokenResult.token,
		});
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
				<form className="space-y-6">
					<div className="space-y-4">
						<div>
							<Label htmlFor="name">Full Name</Label>
							<Input
								id="name"
								{...register('name', {
									required: 'Name is required',
								})}
							/>
							<FormError errors={errors} name="name" />
						</div>

						<div>
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								{...register('email', {
									required: 'Email is required',
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: 'Invalid email address',
									},
								})}
							/>
							<FormError errors={errors} name="email" />
						</div>

						<div>
							<Label htmlFor="address">Address</Label>
							<Input
								id="address"
								{...register('address', {
									required: 'Address is required',
								})}
							/>
							<FormError errors={errors} name="address" />
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div>
								<Label htmlFor="city">City</Label>
								<Input
									id="city"
									{...register('city', {
										required: 'City is required',
									})}
								/>
								<FormError errors={errors} name="city" />
							</div>

							<div>
								<Label htmlFor="zipCode">ZIP Code</Label>
								<Input
									id="zipCode"
									{...register('zipCode', {
										required: 'ZIP code is required',
									})}
								/>
								<FormError errors={errors} name="zipCode" />
							</div>
						</div>

						<div>
							<Label htmlFor="country">Country</Label>
							<Input
								id="country"
								{...register('country', {
									required: 'Country is required',
								})}
							/>
							<FormError errors={errors} name="country" />
						</div>
					</div>

					<PaymentForm
						applicationId={APP_ID!}
						locationId={LOCATION_ID!}
						cardTokenizeResponseReceived={handleTokenize}
					>
						<CreditCard />
					</PaymentForm>
				</form>
			</CardContent>
		</Card>
	);
};

export default CheckoutForm;
