import React, { useState, useEffect } from 'react';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@components/ui/table';
import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';

import { Download } from 'lucide-react';

import Spinner from '@components/Spinner';

import { getReciepts } from '@services/receiptsService';

import Link from 'next/link';

interface Invoice {
	amount: number;
	billingAddress: string;
	city: string;
	country: string;
	createdAt: string; // ISO 8601 date string
	currency: string;
	name: string;
	orderId: string;
	paymentMethod: string;
	receiptNumber: string;
	receiptUrl: string;
	status: string;
	updatedAt: string; // ISO 8601 date string
	userId: string;
	zipcode: string;
	__v: number;
	_id: string;
}

const Invoices = () => {
	const [invoices, setInvoices] = useState<Invoice[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchInvoices = async () => {
			const invoices = await getReciepts();
			setInvoices(invoices);
			setIsLoading(false);
		};

		fetchInvoices();
	}, []);

	return (
		<Table className="max-h-3/4 overflow-scroll">
			<TableHeader>
				<TableRow>
					<TableHead>Invoice</TableHead>
					<TableHead>Date</TableHead>
					<TableHead>Amount</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{isLoading ? (
					<Spinner />
				) : (
					invoices.map((invoice) => (
						<TableRow key={invoice._id}>
							<TableCell>{invoice.receiptNumber}</TableCell>
							<TableCell>
								{new Date(invoice.createdAt).toLocaleDateString(
									'en-US',
									{
										year: 'numeric',
										month: 'long',
										day: 'numeric',
									}
								)}
							</TableCell>
							<TableCell>${invoice.amount.toFixed(2)}</TableCell>
							<TableCell>
								<Badge
									className={`${
										invoice.status === 'DRAFT' &&
										'bg-orange-500'
									}`}
								>
									{invoice.status}
								</Badge>
							</TableCell>
							<TableCell>
								<Link href={invoice.receiptUrl} target="_blank">
									<Button variant="ghost" size="sm">
										<Download className="mr-2 h-4 w-4" />
										Download
									</Button>
								</Link>
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	);
};

export default Invoices;
