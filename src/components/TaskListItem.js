import React from "react";
const TaskListItem = ({
  text,
  completed,
  onRemove,
  onUpdate,
  onUpdateText
}) => {
  const clx = ["TaskList-item"];

  if (completed) {
    clx.push("completed");
  }
  return (
    <li className={clx.join(" ")}>
      <p
        title="DobleClick to change"
        className="TaskList-text"
        onDoubleClick={onUpdateText}
      >
        {text}
      </p>
      <label>
        <input type="checkbox" checked={completed} onChange={onUpdate} />
        Completed
      </label>

      <section className="TaskList-actions">
        <button type="button" className="TaskList-button" onClick={onRemove}>
          Del
        </button>
      </section>
    </li>
  );
};

export default TaskListItem;
