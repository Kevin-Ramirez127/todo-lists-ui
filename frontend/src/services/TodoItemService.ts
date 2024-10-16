import { api } from './axios';
import { TodoItemProps } from '../types/TodoProps';

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
	addTodo,
	updateTodoItem,
	removeTodoItem,
}