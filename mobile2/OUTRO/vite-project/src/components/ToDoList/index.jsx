import React, { useState } from 'react';
import './ToDoList.css';
function ToDoList() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleTaskChange = (event) => {
    setTask(event.target.value);
  };

  const handleAddTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  return (
    <div className='Centro'>
      <h2>Lista de Tarefas</h2>
      <div className='separacao'>
        <input className='inpute'
          type="text"
          placeholder="Digite uma nova tarefa"
          value={task}
          onChange={handleTaskChange}
        />
        <button className='botaoe' onClick={handleAddTask}>Adicionar</button>
      </div>
      <ul>
        {tasks.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
