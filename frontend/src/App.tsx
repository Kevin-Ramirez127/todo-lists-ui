// Libraries
import { FormEvent, useContext, useState } from 'react';

// Types
import { TodoContextType } from './types/TodoProps';

// Context
import { TodoContext } from './context/todosContext';

// Components
import TodoList from './components/TodoList';
import { Button } from './components/ui/Button';
import { Form } from './components/ui/Form';

// Styles
import './App.css';

function App() {
	const { todoLists, addTodoList } = useContext(
		TodoContext
	) as TodoContextType;
	const [newListName, setNewListName] = useState('');
	const [error, setError] = useState('');

	function createTodoList(e: FormEvent) {
		e.preventDefault();
		addTodoList({ name: newListName })
			.then(() => {
				setNewListName('');
				setError('');
			})
			.catch((err: Error) => setError(err.message));
	}

	return (
		<main className="flex flex-col gap-6">
			<nav className="flex flex-col items-baseline gap-3">
				<h1 className="text-3xl">Todo App</h1>
				<Form onSubmit={createTodoList}>
					<Form.Input
						className="outline-none bg-transparent px-2"
						type="text"
						value={newListName}
						placeholder="Create new todo list"
						onChange={({ target }) => setNewListName(target.value)}
					/>
					<Button.Rounded type="submit">+</Button.Rounded>
				</Form>
				{error && <span className="text-red-500">{error}</span>}
			</nav>
			{todoLists.map((list) => (
				<TodoList
					id={list.id}
					key={list.id}
					todoItems={list.todoItems}
					name={list.name}
				/>
			))}
		</main>
	);
}

export default App;

