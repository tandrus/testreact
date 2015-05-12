import React from "react";
// import Component from './components/Component.jsx';

let styles = {
  app: {
    width: '70%',
    minWidth: 200,
    margin: '0 auto',
    fontFamily: 'Ubuntu, sans-serif'
  },

  form: {
    padding: 10,
    marginBottom: 30
  }
};

var App = React.createClass({
  getInitialState: function() {
    return {todos: [{}]};
  },

  handleTodoSubmit: function(title, isCompleted) {
    var todos = this.state.todos;
    todos.push({
      id: todos.length + 1,
      title: title,
      isCompleted: isCompleted
    });
    this.setState({todos: todos});
  },

  componentDidMount: function() {
    this.setState({todos: this.props.todos})
  },

  render: function() {
    return(
      <div>
        <AddTodo onTodoSubmit={this.handleTodoSubmit} />
        <Todos todos={this.props.todos}/>
        <Footer todos={this.props.todos} />
      </div>
    )
  }
});

var Todos = React.createClass({
  render: function() {
    var todos = [];
    this.props.todos.forEach(function(todo) {
      todos.push(<Todo todo={todo} />);
    }.bind(this));
    return (
      <table>
        <thead>
        <tr>
          <th>Id</th>
          <th>Todo</th>
          <th>Completed ?</th>
        </tr>
        </thead>
        <tbody>{todos}</tbody>
      </table>
    );
  }
})

var Todo = React.createClass({
  render: function() {
    var todo = this.props.todo;
    var isComletedText = (todo.isCompleted) ? 'Yes' : 'No';
    return (
      <tr>
        <td>{todo.id}</td>
        <td>{todo.title}</td>
        <td>{isComletedText}</td>
      </tr>
    );
  }
});

var AddTodo = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var todoTitleElement = React.findDOMNode(this.refs.todo);
    var todoCheckboxElement = React.findDOMNode(this.refs.completed);

    var title = todoTitleElement.value.trim();
    var isCompleted = todoCheckboxElement.checked;
    if (!title.length) {
      alert ('You should to add todo');
    } else {
      this.props.onTodoSubmit(title, isCompleted);
      todoTitleElement.value = '';
      todoTitleElement.focus();
      todoCheckboxElement.checked = '';
    }
  },

  render: function() {
    return (
      <form onSubmit={this.handleSubmit} style={styles.form}>
        <label>
          Todo:
          <input type="text" ref="todo" />
        </label><br/>
        <label>
          Is completed
          <input type="checkbox" ref="completed" />
        </label><br/>
        <input type="submit" value="Add TODO" />
      </form>
    );
  }
});

var Footer = React.createClass({
  render: function() {
    return (<div>Count todos = <Count count={this.props.todos.length} /></div>);
  }
});

var Count = React.createClass({
  render: function() {
    return (<span>{this.props.count}</span>)
  }
})


var TODOS = [];

for (var i = 1; i <= 10; i++) {
  TODOS.push(
    {id: i, title: 'Todo ' + i, isCompleted: (i % 3 == 0) ? true: false}
  )
}

React.render(<App todos={TODOS}/>, document.body);
