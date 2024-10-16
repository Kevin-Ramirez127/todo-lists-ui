// Libraries
import { FormEvent, useContext, useState } from 'react';
import {
	closestCorners,
	DndContext,
	DragEndEvent,
	KeyboardSensor,
	PointerSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';

// Types
import { TodoContextType, TodoListProps } from '../types/TodoProps';

// Context
import { TodoContext } from '../context/todosContext';

// Components
import TodoItem from './TodoItem';
import { Button } from './ui/Button';
import { Form } from './ui/Form';

function TodoList({ name, todoItems, id }: TodoListProps) {
	const [newTodo, setNewTodo] = useState({
		name: '',
		description: '',
	});

	const { addTodoItem, removeTodoList, setTodoLists } = useContext(
		TodoContext
	) as TodoContextType;

	const [error, setError] = useState('');

	function addTodo(e: FormEvent) {
		e.preventDefault();

		addTodoItem({
			todoListId: id,
			...newTodo,
		})
			.then(() => {
				setNewTodo({
					description: '',
					name: '',
				});
				setError('');
			})
			.catch((err: Error) => setError(err.message));
	}

	function handleDragEnd(e: DragEndEvent) {
		const { active, over } = e;
		if (active.id === over?.id || !over?.id) return;

		setTodoLists((prev) => {
			const updatedList = prev.map((list) => {
				if (list.id !== id) return list;

				const activeTaskIndex = list.todoItems.findIndex(
					(todo) => todo.id === active.id
				);
				const overTaskIndex = list.todoItems.findIndex(
					(todo) => todo.id === over.id
				);

				if (activeTaskIndex === -1 || overTaskIndex === -1) return list;

				const newTodoItems = arrayMove(
					list.todoItems,
					activeTaskIndex,
					overTaskIndex
				);

				return {
					...list,
					todoItems: newTodoItems,
				};
			});
			return updatedList;
		});
	}

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				delay: 250,
				distance: 10,
			},
		}),
		useSensor(TouchSensor, {
			activationConstraint: {
				delay: 250,
				tolerance: 10,
			},
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	return (
		<div className="flex flex-col gap-3 border-neutral-900 border-2 rounded-lg overflow-hidden">
			<header className="flex justify-between items-center bg-neutral-900 text-white">
				<h2 className="flex-grow text-center text-2xl py-4">{name}</h2>
				<span
					className="mr-4 cursor-pointer"
					onClick={() => removeTodoList({ id })}
				>
					×
				</span>
			</header>
			<nav className="px-4">
				<Form onSubmit={addTodo}>
					<Form.Input
						type="text"
						placeholder="Add your task"
						onChange={({ target }) =>
							setNewTodo((prev) => ({
								description: prev.description,
								name: target.value,
							}))
						}
						value={newTodo.name}
					/>
					<Button.Rounded type="submit">+</Button.Rounded>
				</Form>
				{error && <span className="text-red-500">{error}</span>}
			</nav>
			<section className="flex flex-col px-4 mb-4 items-start justify-center gap-3">
				<DndContext
					sensors={sensors}
					onDragEnd={handleDragEnd}
					collisionDetection={closestCorners}
				>
					<SortableContext
						items={todoItems}
						strategy={verticalListSortingStrategy}
					>
						{todoItems.map((item) => (
							<TodoItem
								key={item.id}
								{...item}
								todoListId={id}
							/>
						))}
					</SortableContext>
				</DndContext>
			</section>
		</div>
	);
}

export default TodoList;
