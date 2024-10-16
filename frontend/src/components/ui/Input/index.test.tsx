import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '.';

describe('Input CheckBox component', () => {
	test('Renders the Input.CheckBox component', () => {
		render(<Input.CheckBox checked={true} />);
		const checkBoxElem = screen.getByRole('checkbox');

		expect(checkBoxElem).toBeInTheDocument();
		expect(checkBoxElem).toBeChecked();
	});

	test('changes state when clicked', () => {
		const { rerender } = render(<Input.CheckBox defaultChecked={false} />);

		const checkBoxElem = screen.getByRole('checkbox');

		fireEvent.click(checkBoxElem);

		rerender(<Input.CheckBox defaultChecked={true} />)

		expect(checkBoxElem).toBeChecked();

	});
});
