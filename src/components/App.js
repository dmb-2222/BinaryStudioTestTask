import React, { Component } from "react";
import { uuid } from "uuidv4";
import Layout from "./Layout";
import TaskList from "./TaskList";
import TaskEditor from "./TaskEditor";
import Filter from "./Filter";

export default class App extends Component {
  state = {
    tasks: [],
    filter: "",
    changeText: "",
    isChangeText: false
  };

  addTask = text => {
    const task = {
      id: uuid(),
      text,
      completed: false,
      isEdit: false
    };

    this.setState(prevState => {
      return {
        tasks: [...prevState.tasks, task]
      };
    });
  };

  removeTask = taskId => {
    this.setState(prevState => {
      return {
        tasks: prevState.tasks.filter(({ id }) => id !== taskId)
      };
    });
  };

  updateCompleted = taskId => {
    this.setState(prevState => ({
      tasks: prevState.tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    }));
  };
  onUpdateTextDoubleClick = taskId => {
    this.setState(prevState => ({
      tasks: prevState.tasks.map(task =>
        task.id === taskId
          ? {
              ...task,
              isEdit: !this.state.isChangeText
            }
          : task
      )
    }));
  };

  onEditTextClick = (textEdit, taskId) => {
    this.setState(prevState => ({
      tasks: prevState.tasks.map(task =>
        task.id === taskId
          ? {
              ...task,
              isEdit: this.state.isChangeText,
              text: textEdit
            }
          : task
      )
    }));
  };
  onEditCancele = taskId => {
    this.setState(prevState => ({
      tasks: prevState.tasks.map(task =>
        task.id === taskId
          ? {
              ...task,
              isEdit: this.state.isChangeText
            }
          : task
      )
    }));
  };
  changeFilter = filter => {
    this.setState({ filter });
  };

  getVisibleTasks = () => {
    const { tasks, filter } = this.state;

    return tasks.filter(task =>
      task.text.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { filter } = this.state;
    const visibleTasks = this.getVisibleTasks();

    return (
      <Layout>
        <TaskEditor onAddTask={this.addTask} />
        <Filter value={filter} onChangeFilter={this.changeFilter} />
        {visibleTasks.length > 0 && (
          <TaskList
            tasks={visibleTasks}
            onRemoveTask={this.removeTask}
            onUpdateTask={this.updateCompleted}
            onEdit={this.onUpdateTextDoubleClick}
            editText={this.onEditTextClick}
            canceleEdit={this.onEditCancele}
          />
        )}
      </Layout>
    );
  }
}
