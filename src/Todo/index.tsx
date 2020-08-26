import React from 'react';
import TodoList from './TodoList';

export interface ITodoItem {
    id: string;
    name: string;
    completed: boolean;
}

interface TodoState {
    todos: ITodoItem[];
};

export default class Todo extends React.Component<{}, TodoState>  {
    constructor(props: any) {
        super(props);
        this._registerIpcEvents();
    }

    state: TodoState = {
        todos: []
    };

    private _addTodo() {
        const id = Date.now().toString();
        this.setState({ todos: [...this.state.todos, { id, name: 'todo-' + id, completed: false } ] });
    }

    private _editTodo(todo: ITodoItem) {
        const { electronApi } = (window as any);

        if (electronApi) {
            electronApi.ipcRenderer.send('edit-todo', todo);
        }
    }

    private _toggleTodo(id: string) {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, completed: !todo.completed }
                }

                return todo;
            })
        });
    }

    private _removeTodo(id: string) {
        this.setState({
            todos: this.state.todos.filter(todo => todo.id !== id)
        });
    }

    private _onTodoEdited(editedTodo: ITodoItem) {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === editedTodo.id) {
                    return { ...todo, name: editedTodo.name }
                }

                return todo;
            })
        });
    }

    private _registerIpcEvents() {
        const { electronApi } = (window as any);

        if (electronApi) {
            electronApi.ipcRenderer.on('todo-submitted', (event: any, todo: ITodoItem) => {
                this._onTodoEdited(todo);
            });
        }
    }

    render() {
        return (
            <div>
                <TodoList todos={ this.state.todos } 
                    onItemClick={ todo => this._editTodo(todo) } 
                    onItemToggle={ id => this._toggleTodo(id) } 
                    onItemRemove={ id => this._removeTodo(id) } 
                />
                <button onClick={ () => this._addTodo() }>Add Todo</button>
            </div>
        )
    }
}