// Libraries
import { useContext, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Types
import { TodoContextType, TodoItemProps } from '../types/TodoProps';

// Context
import { TodoContext } from '../context/todosContext';

// Components
import { Input } from './ui/Input';

function TodoItem(props: TodoItemProps) {
	const { updateTodoItem, removeTodoItem } = useContext(
		TodoContext
	) as TodoContextType;
	const { name, done, id, todoListId } = props;
	const [check, setCheck] = useState<boolean>(done);
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id });

	const checkHandler = async () => {
		const prevState = check;
		setCheck(!check);
		updateTodoItem({
			modifiedTodoItem: {
				...props,
				done: !check,
			},
			todoListId,
		}).catch(() => setCheck(prevState));
	};

	const removeTodo = async () => {
		removeTodoItem({
			todoListId,
			todoItemId: id,
		}).catch(() => {});
	};

	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
	};

	return (
		<div
			ref={setNodeRef}
			{...attributes}
			{...listeners}
			style={style}
			className="flex flex-row justify-between w-full touch-none"
		>
			<div className="flex flex-row gap-x-2 items-center">
				<Input.CheckBox
					checked={check}
					onChange={checkHandler}
				/>
				<label className={`${check && 'line-through'}`}>{name}</label>
			</div>
			<span
				className="cursor-pointer px-2 py-1 rounded-md hover:bg-gray-400 my-auto"
				onClick={removeTodo}
			>
				×
			</span>
		</div>
	);
}

export default TodoItem;
