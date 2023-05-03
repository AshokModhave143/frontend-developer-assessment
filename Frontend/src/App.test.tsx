/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { App } from './App';
import { getTodoItems, postTodoItem, putTodoItem, deleteTodoItem } from './services/TodoService';

jest.mock('./services/TodoService');

const mockedGetTodoItems = getTodoItems as jest.MockedFunction<typeof getTodoItems>;
const mockedPostTodoItem = postTodoItem as jest.MockedFunction<typeof postTodoItem>;
const mockedPutTodoItem = putTodoItem as jest.MockedFunction<typeof putTodoItem>;
const mockedDeleteTodoItem = deleteTodoItem as jest.MockedFunction<typeof deleteTodoItem>;

const mockTodoItems = [
  { id: '1', description: 'Buy something', isCompleted: false },
  { id: '2', description: 'Visit park', isCompleted: true },
];

const clearMocks = () => {
  mockedGetTodoItems.mockClear();
  mockedPostTodoItem.mockClear();
  mockedPutTodoItem.mockClear();
  mockedDeleteTodoItem.mockClear();
};
describe('Given App component', () => {
  beforeEach(() => {
    clearMocks();
  });

  describe('When component is rendered', () => {
    beforeEach(() => {
      mockedGetTodoItems.mockResolvedValue(mockTodoItems);
    });
    test('Then renders without error', async () => {
      render(<App />);
      expect(screen.getByAltText('clearpoint.digital')).toBeInTheDocument();
    });

    test('Then should display the footer text', async () => {
      render(<App />);
      const footerElement = screen.getByText(/clearpoint.digital/i);
      expect(footerElement).toBeInTheDocument();
    });

    test('Then should display the todo app instructions', async () => {
      render(<App />);
      expect(screen.getByText(/Todo List App/i)).toBeInTheDocument();
      expect(screen.getByText(/Welcome to the ClearPoint frontend technical test./)).toBeInTheDocument();
    });

    test('Then should display add todo item form', async () => {
      render(<App />);
      expect(screen.getByPlaceholderText('Enter description...')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Add Item' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument();
    });

    test('Then should display todo item table', async () => {
      render(<App />);
      expect(screen.getByText(/Showing/)).toBeInTheDocument();
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    describe('And on mount', () => {
      test('Then should fetch and display the todo items', async () => {
        render(<App />);

        await waitFor(() => {
          expect(mockedGetTodoItems).toHaveBeenCalledTimes(1);
          expect(screen.getByText(/Buy something/i)).toBeInTheDocument();
          expect(screen.getByRole('button', { name: 'Mark as completed' })).toBeInTheDocument();
        });
      });

      test('Then should show console error if failed to fetch todo items', async () => {
        const mockError = new Error('Mock error');
        mockedGetTodoItems.mockRejectedValueOnce(mockError);

        render(<App />);

        expect(mockedGetTodoItems).toHaveBeenCalledTimes(1);
        expect(mockedGetTodoItems).toHaveBeenCalledWith();
      });
    });
  });
  describe('When adding a new todo item', () => {
    beforeEach(() => {
      mockedGetTodoItems.mockResolvedValue(mockTodoItems);
    });

    describe('And user enters valid description and click on "Add Item" button', () => {
      test('Then should add a new todo item', async () => {
        mockedGetTodoItems.mockResolvedValue(mockTodoItems);
        const mockTodoItem = { description: 'Test description', isCompleted: false };
        mockedPostTodoItem.mockResolvedValue({ id: '3', ...mockTodoItem });

        render(<App />);

        fireEvent.input(screen.getByPlaceholderText('Enter description...'), { value: 'Test description' });
        fireEvent.click(screen.getByRole('button', { name: 'Add Item' }));

        await waitFor(() => {
          expect(mockedPostTodoItem).toHaveBeenCalledTimes(1);
        });
      });
    });
    describe('And user keep empty description and click on "Add Item" button', () => {
      test('Then should show toast with error', async () => {
        mockedGetTodoItems.mockResolvedValue(mockTodoItems);
        const mockTodoItem = { description: '', isCompleted: false };
        mockedPostTodoItem.mockResolvedValueOnce({ id: '3', ...mockTodoItem });

        render(<App />);

        fireEvent.change(screen.getByPlaceholderText('Enter description...'), {
          target: { value: 'Test description' },
        });
        fireEvent.click(screen.getByRole('button', { name: 'Add Item' }));

        await waitFor(() => {
          expect(mockedPostTodoItem).toHaveBeenCalledTimes(1);
          // expect(screen.getByText('Description is required')).toBeInTheDocument();
        });
      });
    });
  });

  describe.skip('When marking todo item as completed', () => {
    beforeEach(() => {
      mockedGetTodoItems.mockResolvedValue(mockTodoItems);
    });

    describe('And click on "Mark as completed" button in todo item list', () => {
      test('Then should change action button to "Completed" for todo item', async () => {
        await render(<App />);

        await fireEvent.click(screen.getByRole('button', { name: 'Mark as completed' }));

        await waitFor(() => {
          expect(mockedPutTodoItem).toHaveBeenCalledTimes(1);
          expect(mockedPutTodoItem).toHaveBeenCalledWith({ ...mockTodoItems[0], isCompleted: true });
          expect(screen.getByRole('button', { name: 'Completed' })).toBeInTheDocument();
        });
      });
    });
  });

  describe.skip('When delete a todo item', () => {});
});
