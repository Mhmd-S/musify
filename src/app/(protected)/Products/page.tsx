import { Zap, Sparkles, Rocket, Check } from 'lucide-react';
import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@components/ui/card';
import Link from 'next/link';

const plans = [
	{
		name: 'Basic',
		price: 10,
		credits: 100,
		icon: <Sparkles />,
	},
	{
		name: 'Pro',
		price: 20,
		credits: 250,
		icon: <Rocket />,
	},
	{
		name: 'Enterprise',
		price: 50,
		credits: 500,
		icon: <Zap />,
		isBestValue: true,
	},
];

interface CreditPackageProps {
	id: number;
	name: string;
	credits: number;
	price: number;
	perCreditPrice: number;
	icon: React.ReactNode;
	isBestValue?: boolean;
}

const CreditPackage: React.FC<CreditPackageProps> = ({
	id,
	name,
	credits,
	price,
	perCreditPrice,
	icon,
	isBestValue,
}) => (
	<Card
		className={`relative w-full max-w-sm transition-all duration-300 hover:shadow-lg ${
			isBestValue ? 'border-primary border-2' : ''
		}`}
	>
		<Badge className={`${!isBestValue && 'hidden'} px-2 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground p-2 rounded-full`}>
			Best Value
		</Badge>
		<CardHeader className="text-center">
			<div className="flex justify-center mb-4">
				<div
					className={`p-3 rounded-full ${
						isBestValue
							? 'bg-primary text-primary-foreground'
							: 'bg-secondary text-secondary-foreground'
					}`}
				>
					{icon}
				</div>
			</div>
			<CardTitle className="text-2xl font-bold">{name}</CardTitle>
			<CardDescription className="text-lg font-semibold text-primary">
				{credits.toLocaleString()} AI Credits
			</CardDescription>
		</CardHeader>
		<CardContent>
			<div className="text-center mb-4">
				<span className="text-4xl font-bold">${price}</span>
				<span className="text-sm text-muted-foreground ml-2">
					(${perCreditPrice.toFixed(4)}/credit)
				</span>
			</div>
		</CardContent>
		<CardFooter className="flex items-center justify-center">
			<Link href={`/checkout/${id}`}>
				<Button
					className="w-full text-lg py-6"
					variant={isBestValue ? 'default' : 'outline'}
				>
					<Zap className="w-5 h-5 mr-2" />
					Buy Now
				</Button>
			</Link>
		</CardFooter>
	</Card>
);

const CreditPackages = () => {
	return (
		<div className="space-y-10 py-10">
			<div className="text-center space-y-4">
				<h2 className="text-3xl font-extrabold">
					Choose Your AI Credit Package
				</h2>
				<p className="text-xl text-muted-foreground max-w-2xl mx-auto px-4">
					Power up your AI projects with our flexible credit packages.
					More credits mean more possibilities!
				</p>
				<p className="text-sm text-muted-foreground max-w-2xl mx-auto px-4">
					*All prices are in USD and exclusive of applicable taxes.
				</p>
				<p className="text-sm text-muted-foreground max-w-2xl mx-auto px-4">
					* All credits are valid for 1 year from the date of purchase.
				</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto place-items-center">
				{plans.map((plan, index) => (
					<CreditPackage
						key={index}
						id={index}
						name={plan.name}
						credits={plan.credits}
						price={plan.price}
						perCreditPrice={plan.price / plan.credits}
						icon={plan.icon}
						isBestValue={plan.isBestValue}
					/>
				))}
			</div>
		</div>
	);
};

export default CreditPackages;
