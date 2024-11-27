import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Estado para armazenar as tarefas
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  // Carregar tarefas do localStorage ao iniciar o componente
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));  // Se houver tarefas no localStorage, use-as
    }
  }, []);

  // Atualizar o localStorage sempre que as tarefas mudarem
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  // Função para adicionar uma nova tarefa
  const addTask = () => {
    if (task.trim() !== '') {
      setTasks([
        ...tasks,
        { id: Date.now(), text: task, completed: false }
      ]);
      setTask('');
    }
  };

  // Função para marcar ou desmarcar uma tarefa como concluída
  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map((t) => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  // Função para remover uma tarefa
  const removeTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>

      <div className="task-input">
        <input 
          type="text" 
          value={task} 
          onChange={(e) => setTask(e.target.value)} 
          placeholder="Nova tarefa" 
        />
        <button onClick={addTask}>Adicionar</button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li 
            key={task.id} 
            className={task.completed ? 'completed' : ''}>
            <span onClick={() => toggleTaskCompletion(task.id)}>
              {task.text}
            </span>
            <button onClick={() => removeTask(task.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
