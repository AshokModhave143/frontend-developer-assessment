import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AddTodoItem } from './AddTodoItem';

const mockOnAddFn = jest.fn();

describe('Given AddTodoItem component', () => {
  describe('When rendering', () => {
    test('Then should display Add Item heading', () => {
      render(<AddTodoItem />);
      const headingElement = screen.getByRole('heading', { name: /Add Item/i });
      expect(headingElement).toBeInTheDocument();
    });

    test('Then should calls onAdd function with correct arguments when form is submitted', () => {
      render(<AddTodoItem onAdd={mockOnAddFn} />);
      const inputElement = screen.getByPlaceholderText(/Enter description/i);
      const addTodoItemButtonElement = screen.getByRole('button', { name: /Add Item/i });

      const testDescription = 'Test todo item';
      fireEvent.change(inputElement, { target: { value: testDescription } });
      fireEvent.click(addTodoItemButtonElement);

      expect(mockOnAddFn).toHaveBeenCalledTimes(1);
      expect(mockOnAddFn).toHaveBeenCalledWith({ description: testDescription, isCompleted: false });
    });

    test('Then should clears input field when "Clear" button is clicked', () => {
      render(<AddTodoItem />);
      const inputElement = screen.getByPlaceholderText(/Enter description/i);
      const clearButtonElement = screen.getByRole('button', { name: /Clear/i });

      const testDescription = 'Test todo item';
      fireEvent.change(inputElement, { target: { value: testDescription } });
      fireEvent.click(clearButtonElement);

      expect(inputElement).toHaveValue('');
    });
  });
});
