import { AxiosResponse } from "axios";
import React from "react";

export interface TodoItemProps {
	id: number;
	name: string;
	done: boolean;
	todoListId: number;
}

export interface TodoListProps {
	id: number;
	name: string;
	todoItems: TodoItemProps[];
}

export interface TodoContextType {
	todoLists: TodoListProps[];

	updateTodoItem: ({
		todoListId,
		modifiedTodoItem,
	}: {
		todoListId: number;
		modifiedTodoItem: TodoItemProps;
	}) => Promise<AxiosResponse<void>>;

	removeTodoItem: ({
		todoListId,
		todoItemId,
	}: {
		todoListId: number;
		todoItemId: number;
	}) => Promise<AxiosResponse<void>>;

	addTodoItem: ({
		todoListId,
		name,
		description,
	}: {
		todoListId: number;
		name: string,
		description: string,
	}) => Promise<AxiosResponse<void>>;

	addTodoList: ({
		name,
	}: {
		name: string,
	}) => Promise<AxiosResponse<void>>;

	removeTodoList: ({
		id,
	}: {
		id: number,
	}) => Promise<AxiosResponse<void>>

	setTodoLists: React.Dispatch<React.SetStateAction<TodoListProps[]>>;
}