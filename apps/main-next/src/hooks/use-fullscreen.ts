import { useCallback, useState } from "react";

export function useFullscreen<T extends HTMLElement>(ref: React.RefObject<T>) {
	const [isFullscreen, setIsFullscreen] = useState(false);

	const toggleFullscreen = useCallback(() => {
		if (!ref.current) return;

		if (!document.fullscreenElement) {
			ref.current
				.requestFullscreen()
				.then(() => setIsFullscreen(true))
				.catch(() => setIsFullscreen(false));
		} else {
			document
				.exitFullscreen()
				.then(() => setIsFullscreen(false))
				.catch(() => setIsFullscreen(true));
		}
	}, [ref]);

	return { toggleFullscreen, isFullscreen };
}
