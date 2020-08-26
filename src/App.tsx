import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Todo from './Todo';
import EditTodo from './Todo/EditTodo';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Todos
        </p>
        <div>
        <Router>
            <Switch>
                <Route path='/edit/:id'>
                    <EditTodo />
                </Route>
                <Route path='/'>
                    <Todo />
                </Route>
            </Switch>
        </Router>
        </div>
      </header>
    </div>
  );
}

export default App;
