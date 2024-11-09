import { CreditCard, Package } from 'lucide-react';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@components/ui/card';
import { Separator } from '@components/ui/separator';

const plans = [
	{
		name: 'Basic',
		price: 10,
		credits: 100,
	},
	{
		name: 'Pro',
		price: 20,
		credits: 250,
	},
	{
		name: 'Enterprise',
		price: 50,
		credits: 500,
		isBestValue: true,
	},
];

export default function OrderSummaryCard({ planId }: { planId: number }) {
	const total = plans[planId].price + 1;

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle className="text-2xl font-bold">
					Order Summary
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<Package className="h-5 w-5 text-muted-foreground" />
						<span className="font-medium">
							{plans[planId].name} Plan
						</span>
					</div>
					<span className="font-medium">
						${plans[planId].price.toFixed(2)}
					</span>
				</div>
				<div className="text-sm text-muted-foreground">
					{plans[planId].credits} AI Credits (${(plans[planId].price / plans[planId].credits).toFixed(2)}/credit)
				</div>
				<Separator />
				<div className="space-y-2">
					<div className="flex justify-between text-sm">
						<span>Subtotal</span>
						<span>${plans[planId].price.toFixed(2)}</span>
					</div>
					{/* <div className="flex justify-between text-sm">
            <span>Tax ({(taxRate * 100).toFixed(2)}%)</span>
            <span>${taxAmount.toFixed(2)}</span>
          </div> */}
					<div className="flex justify-between text-sm">
						<span>Processing Fee</span>
						<span>$1.00</span>
					</div>
				</div>
				<Separator />
				<div className="flex justify-between font-bold">
					<span>Total</span>
					<span>${total.toFixed(2)}</span>
				</div>
			</CardContent>
			<CardFooter className="flex flex-col space-y-2 text-sm text-muted-foreground">
				<div className="flex items-center space-x-2">
					<CreditCard className="h-4 w-4" />
					<span>Secure payment processed by Square</span>
				</div>
				<div>
					Your card will be charged ${total.toFixed(2)} upon
					submission.
				</div>
			</CardFooter>
		</Card>
	);
}
