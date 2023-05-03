import React, { useState, useEffect } from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import { Footer } from './components/footer';
import { AddTodoItem } from './components/add-todo-item';
import { Header } from './components/header';
import { TodoAppIntroduction } from './components/todo-app-introduction';
import { ViewTodoItems } from './components/view-todo-items';
import { deleteTodoItem, getTodoItems, postTodoItem, putTodoItem } from './services/TodoService';
import { BaseTodoItem, TodoItem } from './types';
import { ToastComponent } from './components/common/ToastComponent';

export const App: React.FC = () => {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    getTodoItems()
      .then((todoItems) => {
        setItems(todoItems);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAdd = async (item: BaseTodoItem) => {
    postTodoItem(item)
      .then((_item: any) => {
        getItems();
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const handleMarkAsComplete = async (item: TodoItem) => {
    putTodoItem(item)
      .then((_item: any) => getItems())
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const handleDeleteTodoItem = async (id: string) => {
    deleteTodoItem(id)
      .then(() => getItems())
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="App">
      <Container>
        <Header />
        <TodoAppIntroduction />
        <AddTodoItem onAdd={handleAdd} />
        <br />
        <ViewTodoItems
          items={items}
          onRefresh={getItems}
          onMarkComplete={handleMarkAsComplete}
          onDelete={handleDeleteTodoItem}
        />
      </Container>
      <Footer />
      <ToastComponent
        message={errorMessage}
        show={!!errorMessage}
        onCloseToast={() => setErrorMessage('')}
        variant="danger"
      />
    </div>
  );
};
