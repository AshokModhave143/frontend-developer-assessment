import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { RowLayout } from '../common/RowLayout';
import { TodoItem } from '../../types';

export interface ViewTodoItemsProps {
  items: TodoItem[];
  onRefresh?: () => void;
  onMarkComplete?: (item: TodoItem) => void;
  onDelete?: (id: string) => void;
}

export const ViewTodoItems: React.FC<ViewTodoItemsProps> = ({ onMarkComplete, onRefresh, onDelete, items }) => {
  const handleMarkAsComplete = (item: TodoItem) => {
    onMarkComplete && onMarkComplete({ ...item, isCompleted: true });
  };

  const handleDeleteItem = (item: TodoItem) => {
    onDelete && onDelete(item.id);
  };

  return (
    <RowLayout>
      <h1>
        Showing {items.length} Item(s){' '}
        <Button variant="primary" className="pull-right" onClick={() => onRefresh && onRefresh()}>
          Refresh
        </Button>
      </h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item: any) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.description}</td>
              <td>
                {item.isCompleted ? (
                  <Button variant="success" size="sm" disabled>
                    Completed
                  </Button>
                ) : (
                  <Button variant="warning" size="sm" onClick={() => handleMarkAsComplete(item)}>
                    Mark as completed
                  </Button>
                )}
                <Button variant="danger" size="sm" onClick={() => handleDeleteItem(item)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </RowLayout>
  );
};
