// Libraries
import { ReactNode, FormEventHandler } from 'react';
export interface FormProps {
	onSubmit: FormEventHandler<HTMLFormElement>;
	children: ReactNode;
}
export type FormInputProps = React.InputHTMLAttributes<HTMLInputElement>;