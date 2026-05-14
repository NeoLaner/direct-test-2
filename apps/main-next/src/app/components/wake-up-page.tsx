"use client";

import { Button } from "@workspace/ui/components/shadcn-ui/button";
import { useState } from "react";

interface WakeUpPageProps {
	data: string;
}

export default function WakeUpPage({ data }: WakeUpPageProps) {
	const [showSayMyName, setShowSayMyName] = useState(false);

	return (
		<div className="max-h-svh">
			<div className="flex min-h-svh flex-col items-center justify-center">
				{!showSayMyName ? (
					<div className="fade-in w-full max-w-md animate-in rounded-lg p-8 text-center shadow-xl">
						<div className="mb-8">
							<div className="mb-6 rounded-lg border p-6">
								<p className="text-lg">
									<span className="font-semibold">
										{data}
									</span>
								</p>
							</div>
							<p className="mb-6 text-sm">
								You've been awakened. Ready for the next step?
							</p>
						</div>

						<Button
							type="button"
							onClick={() => setShowSayMyName(true)}
							className="w-full transform rounded-lg px-6 py-3 font-semibold transition duration-200 ease-in-out hover:scale-105 active:scale-95"
						>
							Wake Up
						</Button>
					</div>
				) : (
					<div className="fade-in w-full animate-in">booo</div>
				)}
			</div>
		</div>
	);
}
