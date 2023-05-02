import React from 'react';
import { Button, Table } from 'react-bootstrap';

export interface ViewTodoItemsProps {
  items: any;
  onRefresh?: () => void;
  onMarkComplete?: (item: any) => void;
}

export const ViewTodoItems: React.FC<ViewTodoItemsProps> = ({ onMarkComplete, onRefresh, items }) => {
  const handleMarkAsComplete = (item: any) => {
    onMarkComplete && onMarkComplete(item);
  };

  return (
    <>
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
                <Button variant="warning" size="sm" onClick={() => handleMarkAsComplete(item)}>
                  Mark as completed
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
