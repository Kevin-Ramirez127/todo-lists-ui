// Libraries
import React from 'react';

// Types
import { ButtonAddProps } from '../../../types/Button';

function Button({
	children,
	className,
	...rest
}: {
	children: React.ReactNode;
	className: string;
}) {
	return (
		<button
			{...rest}
			className={`bg-neutral-800 text-white font-bold py-2 px-4 whitespace-nowrap text-center ${className}`}
		>
			{children}
		</button>
	);
}

Button.Rounded = ({ children, ...rest }: ButtonAddProps) => {
	return (
		<Button
			className="rounded-full"
			{...rest}
		>
			{children}
		</Button>
	);
};

export { Button };
