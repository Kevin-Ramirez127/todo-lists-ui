// Libraries
import { createContext, useEffect, useState } from 'react';

// Services
import * as api from '../services/index';

// Types
import {
	TodoContextType,
	TodoItemProps,
	TodoListProps,
} from '../types/TodoProps';

export const TodoContext = createContext<TodoContextType | null>(null);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
	const [todoLists, setTodoLists] = useState<TodoListProps[]>([]);

	async function refreshItems() {
		try {
			const res = await api.getAllLists();
			setTodoLists(res);
		} catch (error) {
			console.error(`Error to get lists: ${error}`);
		}
	}

	useEffect(() => {
		refreshItems();
		console.log("Refreshed")
	}, []);

	async function addTodoList({ name }: { name: string }) {
		if (!name) throw new Error('name is mandatory field');
		const res = await api.addTodoList({ name });
		refreshItems();
		return res;
	}

	async function addTodoItem({
		todoListId,
		name,
		description,
	}: {
		todoListId: number;
		name: string;
		description: string;
	}) {
		try {
			if (!name) throw new Error('name is mandatory field');
			const res = await api.addTodo({
				todoListId,
				name,
				description,
			});
			refreshItems();
			return res;
		} catch (error) {
			console.error('Cannot add todo');
			throw error;
		}
	}

	async function updateTodoItem({
		todoListId,
		modifiedTodoItem,
	}: {
		todoListId: number;
		modifiedTodoItem: TodoItemProps;
	}) {
		try {
			const res = await api.updateTodoItem({
				todoListId,
				modifiedTodoItem,
			});
			refreshItems();
			return res;
		} catch (error) {
			console.error('Cannot update todo');
			throw error;
		}
	}

	async function removeTodoItem({
		todoListId,
		todoItemId,
	}: {
		todoListId: number;
		todoItemId: number;
	}) {
		try {
			const res = await api.removeTodoItem({
				todoListId,
				todoItemId,
			});
			refreshItems();
			return res;
		} catch (error) {
			console.error('Cannot delete todo');
			throw error;
		}
	}

	async function removeTodoList({ id }: { id: number }) {
		try {
			const res = await api.removeTodoList({ id });
			refreshItems();
			return res;
		} catch (error) {
			console.error('Cannot delete todo list');
			throw error;
		}
	}

	return (
		<TodoContext.Provider
			value={{
				updateTodoItem,
				setTodoLists,
				removeTodoItem,
				addTodoItem,
				addTodoList,
				removeTodoList,
				todoLists,
			}}
		>
			{children}
		</TodoContext.Provider>
	);
};
