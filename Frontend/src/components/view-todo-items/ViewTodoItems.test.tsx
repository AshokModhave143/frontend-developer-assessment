import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ViewTodoItems } from './ViewTodoItems';
import { TodoItem } from '../../types';

const items: TodoItem[] = [
  { id: '1', description: 'Task 1', isCompleted: false },
  { id: '2', description: 'Task 2', isCompleted: true },
];

const mockOnMarkCompleteFn = jest.fn();
const mockOnDeleteFn = jest.fn();

describe('Given ViewTodoItems component', () => {
  describe('When rendering', () => {
    test('Then should renders the correct number of todo items', () => {
      render(<ViewTodoItems items={items} />);
      const todoItems = screen.getAllByRole('row').slice(1);
      expect(todoItems.length).toEqual(items.length);
    });

    test('Then should calls the onMarkComplete callback when the "Mark as completed" button is clicked', () => {
      render(<ViewTodoItems items={items} onMarkComplete={mockOnMarkCompleteFn} />);

      const markAsCompleteButton = screen.getAllByText('Mark as completed')[0];
      fireEvent.click(markAsCompleteButton);

      expect(mockOnMarkCompleteFn).toHaveBeenCalledWith({ ...items[0], isCompleted: true });
    });

    test('Then should calls the onDelete callback when the "Delete" button is clicked', () => {
      render(<ViewTodoItems items={items} onDelete={mockOnDeleteFn} />);
      const deleteButton = screen.getAllByText('Delete')[0];
      fireEvent.click(deleteButton);
      expect(mockOnDeleteFn).toHaveBeenCalledWith(items[0].id);
    });

    test('calls the onRefresh callback when the "Refresh" button is clicked', () => {
      const onRefresh = jest.fn();
      render(<ViewTodoItems items={items} onRefresh={onRefresh} />);
      const refreshButton = screen.getByText('Refresh');
      fireEvent.click(refreshButton);
      expect(onRefresh).toHaveBeenCalled();
    });

    test('Then should disables the "Completed" button for completed todo items', () => {
      render(<ViewTodoItems items={items} />);
      const completedButton = screen.getByText('Completed');
      expect(completedButton).toBeDisabled();
    });
  });
});
