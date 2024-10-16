// Types
import { InputCheckboxProps } from '../../../types/Input';

function Input({ ...rest }: InputCheckboxProps) {
	return <input className='' {...rest} />;
}

Input.CheckBox = ({ checked, ...rest }: InputCheckboxProps) => {
	return (
		<>
			<label className="flex items-center h-10 px-2 rounded cursor-pointer hover:bg-gray-400">
				<Input
					type="checkbox"
					className="hidden"
					checked={checked}
					{...rest}
				/>
				<span
					className={`flex items-center justify-center w-5 h-5 text-white ${
						checked ? 'bg-neutral-800' : 'bg-transparent border border-neutral-800'
					} rounded-full`}
				>
					{checked && '✓'}
				</span>
			</label>
		</>
	);
};

export { Input };
