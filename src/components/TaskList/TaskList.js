import React, { Component } from "react";
import TaskListItem from "../TaskListItem";
import "./TaskList.css";

export default class TaskList extends Component {
  state = { editText: "" };

  handleChangeEdit = e => {
    e.preventDefault();
    this.setState({
      editText: e.target.value
    });
  };

  handleSubmitEdit = (e, id) => {
    e.preventDefault();
    this.props.editText(this.state.editText, id)
    this.setState({ editText: "" });
  };
  handleSubmitCancele=(e, id)=>{
    e.preventDefault();
    this.props.canceleEdit(id)
  }
  render() {
    const { tasks, onRemoveTask, onUpdateTask, onEdit } = this.props;
    return (
      <ul className="TaskList">
        {tasks.map(({ id, text, completed, isEdit }) => (
          <TaskListItem
            key={id}
            text={
              isEdit ? (
                <>
                  <input
                    type="text"
                    defaultValue={text}
                    style={{ outline: "none", border: 0 }}
                    onChange={this.handleChangeEdit}
                  />
                  <button type="button" className="TaskList-button" onClick={(e)=>this.handleSubmitEdit(e, id)}>
                    OK
                  </button>
                  <button type="button" className="TaskList-button" onClick={(e)=>this.handleSubmitCancele(e, id)}>
                    X
                  </button>
                </>
              ) : (
                text
              )
            }
            completed={completed}
            onRemove={() => onRemoveTask(id)}
            onUpdate={() => onUpdateTask(id)}
            onUpdateText={() => onEdit(id)}
          />
        ))}
      </ul>
    );
  }
}
