import { useState, useEffect } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';

const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // New task form state
  const [newTask, setNewTask] = useState({ title: '', description: '', assignee: '', status: 'PENDING' });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      // Assume backend returns array of tasks
      setTasks(response.data || []);
    } catch (err) {
      setError('Failed to fetch tasks.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tasks', newTask);
      setNewTask({ title: '', description: '', assignee: '', status: 'PENDING' });
      fetchTasks(); // Refresh list
    } catch (err) {
      setError('Failed to create task.');
    }
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'DONE').length,
    pending: tasks.filter(t => t.status === 'PENDING').length,
    inProgress: tasks.filter(t => t.status === 'IN_PROGRESS').length
  };

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <h1 style={{ marginBottom: '2rem' }}>Admin Dashboard</h1>
        
        {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem' }}>{error}</div>}

        <div className="stats-grid">
          <div className="card stat-card">
            <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Total Tasks</h3>
            <div className="stat-value">{stats.total}</div>
          </div>
          <div className="card stat-card">
            <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Pending</h3>
            <div className="stat-value" style={{ color: 'var(--warning)' }}>{stats.pending}</div>
          </div>
          <div className="card stat-card">
            <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>In Progress</h3>
            <div className="stat-value" style={{ color: '#2563EB' }}>{stats.inProgress}</div>
          </div>
          <div className="card stat-card">
            <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Completed</h3>
            <div className="stat-value" style={{ color: 'var(--success)' }}>{stats.completed}</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
          {/* Create Task Form */}
          <div className="card" style={{ height: 'fit-content' }}>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Create New Task</h2>
            <form onSubmit={handleCreateTask}>
              <div className="form-group">
                <label className="form-label">Task Title</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea 
                  className="form-input" 
                  rows="3"
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label className="form-label">Assignee (Email)</label>
                <input 
                  type="email" 
                  className="form-input" 
                  value={newTask.assignee}
                  onChange={(e) => setNewTask({...newTask, assignee: e.target.value})}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Create Task
              </button>
            </form>
          </div>

          {/* Task List */}
          <div>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>All Tasks</h2>
            {loading ? (
              <p>Loading tasks...</p>
            ) : tasks.length === 0 ? (
              <p className="card" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No tasks found. Create one to get started.</p>
            ) : (
              <div className="tasks-grid">
                {tasks.map(task => (
                  <TaskCard key={task.id || task._id || Math.random()} task={task} role="ADMIN" />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
