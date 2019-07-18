import React from 'react';
import axios from "axios";
// import logo from './logo.svg';
import loadingGif from './loader.gif';
import './App.css';
import { ListItem } from "./ListItem";

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      editing: false,
      newTodo: '',
      notification: null,
      todos: [],
      loading: true
    }
    this.apiUrl = 'https://5d2d844643c343001498d11b.mockapi.io';
  }
  handleChange = (event) => {
    this.setState({
      newTodo: event.target.value
    })
  }
  generateTodoId = () => {
    const lastTodos = this.state.todos[this.state.todos.length - 1]
    if(lastTodos)
      return lastTodos.id + 1

    return 1;
  }
  AddTodo = async () => {
    axios.post(`${this.apiUrl}/todos`, {
      name: this.state.newTodo
    }).then((response) => {
      const todos = this.state.todos
      todos.push(response.data)
      this.setState({
        todos: todos
      })
      this.alert('Adding Todo Successfully')
    }).catch((error) => {
      throw error
    })
    //#region old
     // const newTodo = {
    //   id: this.generateTodoId(),
    //   name: this.state.newTodo
    // }
    // const oldTodos = this.state.todos;
    // oldTodos.push(newTodo)

    // this.setState({
    //   todos: oldTodos,
    //   newTodo: '',
    // })
    //#endregion
  }
  DeleteTodo = async (index) => {
    const todos = this.state.todos
    const todo = todos[index]
    axios.delete(`${this.apiUrl}/todos/${todo.id}`).then((response) => {
      const todos = this.state.todos;
      delete todos[index]
      this.setState({
        todos: todos
      })
      this.alert('Delete Todo Successfully')
    }).catch((error) => {
      throw error
    })
    //#region old
    // const todos = this.state.todos;
    // delete todos[index]
    // this.setState({
    //   todos: todos
    // })
    //#endregion
  }
  EditTodo = (index) => {
    const todo = this.state.todos[index]
    this.setState({
      newTodo: todo.name,
      editing: true,
      editing_index: index
    })
  }
  UpdateTodo = () => {
    const todo = this.state.todos[this.state.editing_index]

    axios.put(`${this.apiUrl}/todos/${todo.id}`, {
      name: this.state.newTodo
    }).then(response => {
      this.alert('Update Todo Successfully')
      let todos = this.state.todos;
      todos[this.state.editing_index] = todo;
      this.setState({
        todos: todos,
        editing: false,
        newTodo: '',
        editing_index: null
      })
    }).catch(error => {
      throw error
    })
    // const todo = this.state.todos[this.state.editing_index]
    // todo.name = this.state.newTodo
    // let todos = this.state.todos;
    // todos[this.state.editing_index] = todo;
    // this.setState({
    //   todos: todos,
    //   editing: false,
    //   newTodo: '',
    //   editing_index: null
    // })
    // this.alert('Update Todo Successfully')
  }
  alert = (message) => {
    this.setState({
      message: message
    })
    setTimeout(() => {
      this.setState({
        message: null
      })
    }, 2000);
  }
  componentWillMount = () => {

  }
  componentDidMount = async () => {
    axios.get(`${this.apiUrl}/todos`).then((response) => {
      this.setState({
        todos : response.data,
        loading: false
      })
    }).catch((error) => {
      throw error
    })
  }
  render() {
    return (
      <div className="App">
        <div className="container">
          <h2 className="text-center p-4">Todos App</h2>
          {
            this.state.message &&
            <div className="container">
              <div className="alert alert-success m-3">
                <p className="text-center">
                  {this.state.message}
                </p>
              </div>
            </div>
          }
          <input className='form-control-sm my-4' placeholder="Add a new todo" onChange={this.handleChange} name="todo" value={this.state.newTodo}></input>
          <button className="btn btn-success" disabled={this.state.newTodo.length < 5 ? true: false} onClick={this.state.editing ? this.UpdateTodo : this.AddTodo}>{this.state.editing ? 'Update Todo' : 'Add todo'}</button>
          {
            this.state.loading && 
            <img src={loadingGif}></img>
          }
          {
            (!this.state.editing || this.state.loading) &&
            <ul className="list-group">
              {this.state.todos.map((item, index) => {
                return <ListItem
                    item={item}
                    key={item.id}
                    editTodo={() => {this.EditTodo(index)}}
                    deleteTodo={() => {this.DeleteTodo(index)}}
                  />
              })}
            </ul>
          }
        </div>
      </div>
    );
  }
}

export default App;
