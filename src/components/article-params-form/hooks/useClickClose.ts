import { useEffect } from 'react';

type UseClickClose = {
	isOpen: boolean;
	onClose: () => void;
	rootRef: React.RefObject<HTMLElement>;
};

export const useClickClose = (
	{
		isOpen,
		rootRef,
		onClose,
	}: UseClickClose
) => {
	useEffect(() => {
		if (!isOpen) return;

		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && rootRef.current && !rootRef.current.contains(target)) {
				onClose();
			}
		};

		window.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isOpen, onClose, rootRef]);
}