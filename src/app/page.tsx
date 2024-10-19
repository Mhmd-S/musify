'use client';

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";

export default function Home() {
	return (
		<div className="w-full">
			<Header />
			<Hero />
			<Features />
		</div>
	);
}
