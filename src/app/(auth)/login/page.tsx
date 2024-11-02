'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import * as z from 'zod';

import Link from 'next/link';

import { useAuth } from '@contexts/auth-context';

import { toast } from 'react-toastify';
import { Button } from '@components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@components/ui/card';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { Separator } from '@components/ui/separator';
import FormError from '@components/FormError';

const loginSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z.string().email('Invalid email address'),
	password: z
		.string()
		.min(8, 'Password must be at least 8 characters')
		.regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
		.regex(/[a-z]/, 'Password must contain at least one lowercase letter')
		.regex(/[0-9]/, 'Password must contain at least one number'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function SignUp() {

	const { login, googleAuth, isLoading } = useAuth();
	
  const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginForm>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (data: LoginForm) => {
		try {
			await login(data.email, data.password);
		} catch (error) {
			toast.error('Something went wrong');
		}
	};

	const handleGoogleAuth = async() => {
		const googleAuthResponse = await googleAuth();

		console.log(googleAuthResponse)

	};
	
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<Card className="w-[350px]">
				<CardHeader>
					<CardTitle className="text-2xl font-bold">
						Log n
					</CardTitle>
					<CardDescription>
						Welcome back! Login in to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="grid w-full items-center gap-4">
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									placeholder="ex. johndoe@gmail.com"
									{...register('email')}
									aria-invalid={!!errors.email}
								/>
								<FormError errors={errors} errorName="email" />
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="password">Password</Label>
								<Input
									id="password"
									type="password"
									placeholder="***************"
									{...register('password')}
									aria-invalid={!!errors.password}
								/>
								<FormError errors={errors} errorName="password" />
							</div>
						</div>
						<Button
							className="w-full mt-6"
							type="submit"
							disabled={isSubmitting}
						>
							{isSubmitting
								? 'Loging ing...'
								: 'Login with Email'}
						</Button>
					</form>
					<div className="grid grid-cols-[1fr_auto_1fr] items-center my-4">
						<Separator className="flex-grow" />
						<span className="mx-4 text-sm text-gray-500">OR</span>
						<Separator className="flex-grow" />
					</div>
					<Button
						variant="outline"
						className="w-full"
						onClick={handleGoogleAuth}
						type="button"
					>
						<svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
							<path
								fill="currentColor"
								d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
							/>
							<path
								fill="currentColor"
								d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
							/>
							<path
								fill="currentColor"
								d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
							/>
							<path
								fill="currentColor"
								d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
							/>
						</svg>
						Login with Google
					</Button>
				</CardContent>
				<CardFooter className="flex justify-center">
					<p className="text-sm text-gray-500">
						Don't have an account?{' '}
						<Link
							href="/login"
							className="text-black font-semibold hover:underline"
						>
							Sign up
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
