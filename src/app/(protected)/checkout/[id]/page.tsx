'use client';

import React from 'react';

import { useParams } from 'next/navigation';

import OrderSummaryCard from '@components/checkout/OrderSummary';
import CheckoutForm from '@components/checkout/CheckoutForm';

const Checkout = () => {
	const { id } = useParams<{ id: string }>();

	return (
		<div className="p-12 flex flex-col-reverse md:grid md:grid-cols-[60%_40%] gap-8 items-center justify-center">
			<CheckoutForm planId={parseInt(id)} />
			<OrderSummaryCard planId={parseInt(id)} />
		</div>
	);
};

export default Checkout;
