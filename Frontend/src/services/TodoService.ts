import axios from 'axios';

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
  } catch (err) {
    console.log('ERROR IN PROCESSING - getTodoItems', err);
  }
};

export const postTodoItem = async (todoItem: any) => {
  try {
    const response = await axiosInstance.post('/api/todoItems/', todoItem);
    return response.data;
  } catch (err) {
    console.log('ERROR IN PROCESSING - postTodoItem', err);
  }
};
