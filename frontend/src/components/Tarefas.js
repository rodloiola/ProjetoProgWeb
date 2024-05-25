import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTaskCompletion = index => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = index => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const startEditingTask = index => {
    const taskText = tasks[index].text;
    setEditingTaskIndex(index);
    setEditedTaskText(taskText);
  };

  const finishEditingTask = index => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = editedTaskText;
    setTasks(updatedTasks);
    setEditingTaskIndex(null);
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="form-control"
          placeholder="Enter task"
        />
        <button onClick={addTask} className="btn btn-primary">Add Task</button>
      </div>
      <ul className="list-group">
        {tasks.map((task, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            {editingTaskIndex === index ? (
              <div className="input-group">
                <input
                  type="text"
                  value={editedTaskText}
                  onChange={(e) => setEditedTaskText(e.target.value)}
                  className="form-control"
                />
                <button onClick={() => finishEditingTask(index)} className="btn btn-success btn-sm">
                  <FontAwesomeIcon icon={faCheck} />
                </button>
              </div>
            ) : (
              <div>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(index)}
                  className="mr-3"
                />
                <span
                  style={{
                    textDecoration: task.completed ? 'line-through' : 'none'
                  }}
                >
                  {task.text}
                </span>
              </div>
            )}
            <div>
              <button onClick={() => startEditingTask(index)} className="btn btn-primary btn-sm mr-2">
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button onClick={() => deleteTask(index)} className="btn btn-danger btn-sm">
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
