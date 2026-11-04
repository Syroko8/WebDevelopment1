import { useState } from 'react';
import './App.css';
import HackathonInscription from './mision1/components/HackathonInscription';

function App() {
  const tasks = ['Misión 1'];
  const taskComponentes = [HackathonInscription];
  const [task, setTask] = useState(tasks[0]);

  return (
    <div className='app'>
      <header className='app-header'>
        <div className='brand'>
          <span className='brand-badge'>U4</span>
          <span className='brand-title'>Cuaderno de Tareas</span>
        </div>
        <nav className='nav-links'>
          {tasks.map((misionName) => {
            return (
              <button
                key={misionName}
                className={`nav-btn ${task === misionName ? 'active' : ''}`}
                onClick={() => setTask(misionName)}
              >
                {misionName}
              </button>
            );
          })}
        </nav>
      </header>
      <main className='task'>
        {taskComponentes.map((Component, i) => {
          return task === tasks[i] && <Component key={Component.name} />;
        })}
      </main>
    </div>
  );
}

export default App;
