import React, { useState } from 'react';
import { Button, Col, Container, Form, Row, Stack } from 'react-bootstrap';

export interface AddTodoItemProps {
  onAdd?: (item: any) => void;
}

export const AddTodoItem: React.FC<AddTodoItemProps> = ({ onAdd }) => {
  const [description, setDescription] = useState('');

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd && onAdd({ description, isCompleted: false });
    handleOnClear();
  };

  const handleOnClear = () => setDescription('');

  return (
    <Container>
      <Form onSubmit={handleOnSubmit}>
        <h1>Add Item</h1>
        <Form.Group as={Row} className="mb-3" controlId="formAddTodoItem">
          <Form.Label column sm="2">
            Description
          </Form.Label>
          <Col md="6">
            <Form.Control
              type="text"
              placeholder="Enter description..."
              value={description}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3 offset-md-2" controlId="formAddTodoItem">
          <Stack direction="horizontal" gap={2}>
            <Button variant="primary" type="submit">
              Add Item
            </Button>
            <Button variant="secondary" onClick={handleOnClear}>
              Clear
            </Button>
          </Stack>
        </Form.Group>
      </Form>
    </Container>
  );
};
