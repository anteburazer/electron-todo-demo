import React from 'react';
import { ITodoItem } from './index';

const styles = {
    listItem: {
        display: 'flex',
        alignItems: 'center'
    },
    itemText: {
        textDecoration: 'none',
        color: '#fff'
    },
    itemCheckbox: {
        width: '21px',
        height: '21px',
        margin: '0 10px'
    },
    itemCompleted: {
        color: '#fff',
        textDecoration: 'line-through',
        cursor: 'default'
    },
    removeButton: {
        fontWeight: 800
    }
};

interface TodoItemProps {
    todo: ITodoItem;
    onItemEdit: (todo: ITodoItem) => void;
    onItemToggle: (id: string) => void;
    onItemRemove: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onItemEdit, onItemToggle, onItemRemove }) => {
    const onClick = (todo: ITodoItem) => {
        if (!todo.completed) {
            onItemEdit(todo);
        }
    };

    return (
        <li style={ styles.listItem }>
            <a href="#" 
                onClick={ () => onClick(todo) } 
                style={ todo.completed ? styles.itemCompleted : styles.itemText }>{ todo.name }
            </a>
            <input type="checkbox" 
                onChange={ () => onItemToggle(todo.id) }  
                style={ styles.itemCheckbox } 
            />
            <button onClick={ () => onItemRemove(todo.id) }
                style={ styles.removeButton }>
                x
            </button>
        </li>
    );
};

export default TodoItem;