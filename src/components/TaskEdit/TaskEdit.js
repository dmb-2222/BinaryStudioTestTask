import React from "react";

const TaskEdit = ({ text }) => {
  return (
    <input
      className="TaskEditor-input"
      type="text"
      value={text}
      // onChange={this.handleChange}
    />
  );
};
export default TaskEdit;
