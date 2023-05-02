import React, { useState, useEffect } from 'react';
import './App.css';
import { Alert, Button, Container, Row, Col, Table } from 'react-bootstrap';
import { Footer } from './components/footer';
import { AddTodoItem } from './components/add-todo-item';
import { Header } from './components/header';
import { TodoAppIntroduction } from './components/todo-app-introduction';
import { ViewTodoItems } from './components/view-todo-items';
import { getTodoItems, postTodoItem } from './services/TodoService';

export const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    try {
      const todoItems = await getTodoItems();
      setItems(todoItems);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async (item: any) => {
    try {
      await postTodoItem(item);
      await getItems();
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkAsComplete = async (_item: any) => {
    try {
      alert('todo');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <Header />
          </Col>
        </Row>
        <Row>
          <Col>
            <TodoAppIntroduction />
          </Col>
        </Row>
        <Row>
          <Col>
            <AddTodoItem onAdd={handleAdd} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <ViewTodoItems items={items} />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};
