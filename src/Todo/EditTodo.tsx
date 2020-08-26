import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom'

const styles = {
    cancelButton: {
        marginLeft: '5px',
    }
};

const EditTodo: React.FC = () => {
    const { id } = useParams();
    const { search } = useLocation();
    const name = search.substring(search.lastIndexOf('=') + 1);
    const { electronApi } = (window as any); 
    const [todoName, setTodoName] = useState<string>(name);

    const onSubmit = () => {
        electronApi && electronApi.ipcRenderer.send('submit-todo', { id, name: todoName });
    };

    const onCancel = () => {
        electronApi && electronApi.ipcRenderer.send('cancel-todo');
    };

    return (
        <div>
            <input type="text" value={ todoName } onChange={ event => setTodoName(event.target.value) }/> <br/><br/>
            <button onClick={ onSubmit }>Submit</button>
            <button onClick={ onCancel } style={ styles.cancelButton } >Cancel</button>
        </div>
    );
};

export default EditTodo;