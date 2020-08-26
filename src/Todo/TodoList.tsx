import React from 'react';
import TodoItem from './TodoItem';
import { ITodoItem } from './index';

interface TodoListProps {
    todos: ITodoItem[];
    onItemClick: (todo: ITodoItem) => void;
    onItemToggle: (id: string) => void;
    onItemRemove: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onItemClick, onItemToggle, onItemRemove }) => {
    return (
        <ul>
            { todos.map(todo => (
                <TodoItem todo={ todo }
                    key={ todo.id } 
                    onItemEdit={ onItemClick } 
                    onItemToggle={ onItemToggle }
                    onItemRemove={ onItemRemove }
                />
            )) }
        </ul>
    );
};

export default TodoList;