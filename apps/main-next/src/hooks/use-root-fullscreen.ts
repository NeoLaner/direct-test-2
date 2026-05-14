"use client";
import { useCallback, useEffect, useState } from "react";

// Define custom interfaces for vendor-prefixed fullscreen properties
interface FullscreenDocument extends Document {
	webkitFullscreenElement?: Element | null;
	mozFullScreenElement?: Element | null;
	msFullscreenElement?: Element | null;
	webkitExitFullscreen?: () => Promise<void>;
	mozCancelFullScreen?: () => Promise<void>;
	msExitFullscreen?: () => Promise<void>;
}

interface FullscreenHTMLElement extends HTMLElement {
	webkitRequestFullscreen?: () => Promise<void>;
	mozRequestFullScreen?: () => Promise<void>;
	msRequestFullscreen?: () => Promise<void>;
}

// Type-safe function to get the current fullscreen element
function getFullscreenElement(): Element | null {
	const doc = document as FullscreenDocument;
	return (
		doc.fullscreenElement ??
		doc.webkitFullscreenElement ??
		doc.mozFullScreenElement ??
		doc.msFullscreenElement ??
		null
	);
}

// Type-safe function to request fullscreen for an element
function requestFullscreen(element: HTMLElement): Promise<void> {
	const el = element as FullscreenHTMLElement;
	if (typeof el.requestFullscreen === "function") {
		return el.requestFullscreen();
	}
	if (typeof el.webkitRequestFullscreen === "function") {
		return el.webkitRequestFullscreen();
	}
	if (typeof el.mozRequestFullScreen === "function") {
		return el.mozRequestFullScreen();
	}
	if (typeof el.msRequestFullscreen === "function") {
		return el.msRequestFullscreen();
	}
	return Promise.resolve();
}

// Type-safe function to exit fullscreen
function exitFullscreen(): Promise<void> {
	const doc = document as FullscreenDocument;
	if (typeof doc.exitFullscreen === "function") {
		return doc.exitFullscreen();
	}
	if (typeof doc.webkitExitFullscreen === "function") {
		return doc.webkitExitFullscreen();
	}
	if (typeof doc.mozCancelFullScreen === "function") {
		return doc.mozCancelFullScreen();
	}
	if (typeof doc.msExitFullscreen === "function") {
		return doc.msExitFullscreen();
	}
	return Promise.resolve();
}

// React hook to toggle fullscreen for the entire page
export function useRootFullscreen() {
	const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

	// Listen for fullscreen change events to update state
	useEffect(() => {
		const handleFullscreenChange = () => {
			const fullscreenElement = getFullscreenElement();
			setIsFullscreen(fullscreenElement === document.documentElement);
		};

		const events = [
			"fullscreenchange",
			"webkitfullscreenchange",
			"mozfullscreenchange",
			"MSFullscreenChange",
		];

		events.forEach((event) => {
			document.addEventListener(event, handleFullscreenChange);
		});

		return () => {
			events.forEach((event) => {
				document.removeEventListener(event, handleFullscreenChange);
			});
		};
	}, []);

	// Toggle fullscreen mode
	const toggleFullscreen = useCallback(() => {
		if (getFullscreenElement()) {
			exitFullscreen().catch(() => {
				// Handle potential errors silently
			});
		} else {
			requestFullscreen(document.documentElement).catch(() => {
				// Handle potential errors silently
			});
		}
	}, []);

	return { toggleFullscreen, isFullscreen };
}
