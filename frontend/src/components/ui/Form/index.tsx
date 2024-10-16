// Types
import { FormInputProps, FormProps } from '../../../types/From';

function Form({ onSubmit, children }: FormProps) {
	return (
		<form onSubmit={onSubmit}>
			<div className="flex flex-row border-neutral-800 border-2 border-r-0 rounded-full">
				{children}
			</div>
		</form>
	);
}

Form.Input = ({ ...rest }: FormInputProps) => {
	return (
		<input
			className="outline-none bg-transparent px-2"
			type="text"
			{...rest}
		/>
	);
};

export { Form };
