// Libraries
import axios from 'axios';

// Types
import { TodoItemProps, TodoListProps } from '../types/TodoProps';

const api = axios.create({
	baseURL: 'http://localhost:4000/api/',
});

const getAllLists = async (): Promise<TodoListProps[]> => {
	const lists = await api({
		method: 'GET',
		url: '/todo-lists',
	});

	return lists.data;
};

const addTodoList = ({ name }: { name: string }) => {
	return api({
		method: 'POST',
		data: { name },
		url: '/todo-lists/',
	});
};

const removeTodoList = ({ id }: { id: number }) => {
	return api({
		method: 'DELETE',
		url: `/todo-lists/${id}`,
	});
};

const addTodo = ({
	todoListId,
	name,
	description,
}: {
	todoListId: number;
	name: string;
	description: string;
}) => {
	return api({
		method: 'POST',
		data: { name, description },
		url: `/todo-lists/${todoListId}/todo-items`,
	});
};

const updateTodoItem = async ({
	todoListId,
	modifiedTodoItem,
}: {
	todoListId: number;
	modifiedTodoItem: TodoItemProps;
}) => {
	return await api({
		method: 'PUT',
		url: `/todo-lists/${todoListId}/todo-items/${modifiedTodoItem.id}`,
		data: {
			done: modifiedTodoItem.done,
			name: modifiedTodoItem.name,
		},
	});
};

const removeTodoItem = async ({
	todoListId,
	todoItemId,
}: {
	todoListId: number;
	todoItemId: number;
}) => {
	return await api({
		method: 'DELETE',
		url: `/todo-lists/${todoListId}/todo-items/${todoItemId}`,
	});
};

export {
	getAllLists,
	addTodo,
	updateTodoItem,
	removeTodoItem,
	addTodoList,
	removeTodoList,
};
