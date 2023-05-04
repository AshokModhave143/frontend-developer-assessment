import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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

const renderComponent = async () => {
  const view = render(<App />);
  await waitFor(() => screen.findByText(/clearpoint.digital/i));

  return view;
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
      renderComponent();

      expect(screen.getByAltText('clearpoint.digital')).toBeInTheDocument();
    });

    test('Then should display the footer text', async () => {
      renderComponent();

      const footerElement = screen.getByText(/clearpoint.digital/i);
      expect(footerElement).toBeInTheDocument();
    });

    test('Then should display the todo app instructions', async () => {
      renderComponent();

      expect(screen.getByText(/Todo List App/i)).toBeInTheDocument();
      expect(screen.getByText(/Welcome to the ClearPoint frontend technical test./)).toBeInTheDocument();
    });

    test('Then should display add todo item form', async () => {
      renderComponent();

      expect(screen.getByPlaceholderText('Enter description...')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Add Item' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument();
    });

    test('Then should display todo item table', async () => {
      renderComponent();

      expect(screen.getByText(/Showing/)).toBeInTheDocument();
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    describe('And on mount', () => {
      test('Then should fetch and display the todo items', async () => {
        renderComponent();

        await waitFor(() => {
          expect(mockedGetTodoItems).toHaveBeenCalledTimes(1);
        });

        expect(await screen.findByText(/Buy something/i)).toBeInTheDocument();
        expect(await screen.findByRole('button', { name: 'Mark as completed' })).toBeInTheDocument();
      });

      test('Then should show console error if failed to fetch todo items', async () => {
        const mockError = new Error('Mock error');
        mockedGetTodoItems.mockRejectedValue(mockError);

        renderComponent();

        expect(mockedGetTodoItems).toHaveBeenCalledTimes(1);
        expect(mockedGetTodoItems).toHaveBeenCalledWith();
        mockedGetTodoItems.mockClear();
      });
    });
  });
  describe('When adding a new todo item', () => {
    beforeEach(() => {
      mockedGetTodoItems.mockResolvedValue(mockTodoItems);
    });

    describe('And user enters valid description and click on "Add Item" button', () => {
      test('Then should add a new todo item', async () => {
        const mockTodoItem = { description: 'Test description', isCompleted: false };
        mockedPostTodoItem.mockResolvedValue({ id: '3', ...mockTodoItem });

        renderComponent();

        const inputElement = screen.getByPlaceholderText('Enter description...');
        const addItemButton = screen.getByRole('button', { name: 'Add Item' });
        fireEvent.change(inputElement, { target: { value: 'Test description' } });
        fireEvent.click(addItemButton);

        await waitFor(() => {
          expect(mockedPostTodoItem).toHaveBeenCalledTimes(1);
        });
      });
    });
    describe('And user keep empty description and click on "Add Item" button', () => {
      test('Then should show toast with error', async () => {
        const mockTodoItem = { description: '', isCompleted: false };
        mockedPostTodoItem.mockResolvedValue({ id: '3', ...mockTodoItem });

        renderComponent();

        const inputElement = screen.getByRole('textbox', { name: /Description/i });
        const addItemButton = screen.getByRole('button', { name: /Add Item/i });
        fireEvent.change(inputElement, { target: { value: '' } });
        fireEvent.click(addItemButton);

        await waitFor(() => {
          expect(mockedPostTodoItem).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('When marking todo item as completed', () => {
    beforeEach(() => {
      mockedGetTodoItems.mockResolvedValue(mockTodoItems);
    });

    describe('And click on "Mark as completed" button in todo item list', () => {
      test('Then should change action button to "Completed" for todo item', async () => {
        mockedPutTodoItem.mockResolvedValue({ ...mockTodoItems[0], isCompleted: true });

        renderComponent();

        const markAsCompletedButton = await screen.findByRole('button', { name: /Mark as completed/i });
        fireEvent.click(markAsCompletedButton);

        await waitFor(() => {
          expect(mockedPutTodoItem).toHaveBeenCalledTimes(1);
        });

        expect(mockedPutTodoItem).toHaveBeenCalledWith({ ...mockTodoItems[0], isCompleted: true });
        expect(screen.getByRole('button', { name: 'Completed' })).toBeInTheDocument();
      });
    });
  });

  describe.skip('When delete a todo item', () => {});
});
