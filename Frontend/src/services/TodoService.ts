import axios from 'axios';
import { TodoItem } from '../types';

const BASE_URL = 'http://localhost:8000';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTodoItems = async () => {
  try {
    const response = await axiosInstance.get('/api/todoItems/');
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.status);
    } else {
      throw error;
    }
  }
};

export const postTodoItem = async (todoItem: any) => {
  try {
    const response = await axiosInstance.post('/api/todoItems/', todoItem);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data);
    } else {
      throw error;
    }
  }
};

export const putTodoItem = async (todoItem: any) => {
  try {
    const response = await axiosInstance.put(`/api/todoItems/${todoItem.id}`, todoItem);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data);
    } else {
      throw error;
    }
  }
};

export const deleteTodoItem = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/api/todoItems/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data);
    } else {
      throw error;
    }
  }
};
