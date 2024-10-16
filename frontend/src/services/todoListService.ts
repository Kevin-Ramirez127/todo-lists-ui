
// Types
import { api } from './axios';
import { TodoListProps } from '../types/TodoProps';

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

export {
	getAllLists,
	addTodoList,
	removeTodoList,
};
