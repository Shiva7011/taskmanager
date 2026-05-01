import { useState, useEffect } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';

const UserDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyTasks();
  }, []);

  const fetchMyTasks = async () => {
    try {
      // Backend might return tasks for the logged in user based on JWT
      const response = await api.get('/tasks');
      setTasks(response.data || []);
    } catch (err) {
      setError('Failed to fetch your tasks.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await api.put(`/tasks/${taskId}`, { status: newStatus });
      // Optimistically update the UI
      setTasks(tasks.map(t => t.id === taskId || t._id === taskId ? { ...t, status: newStatus } : t));
      
      // Alternatively, re-fetch tasks:
      // fetchMyTasks();
    } catch (err) {
      alert('Failed to update task status.');
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
        <h1 style={{ marginBottom: '2rem' }}>My Tasks</h1>
        
        {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem' }}>{error}</div>}

        <div className="stats-grid">
          <div className="card stat-card">
            <h3 style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Total Assigned</h3>
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

        <div>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Assigned Tasks</h2>
          {loading ? (
            <p>Loading your tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="card" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>You have no tasks assigned at the moment.</p>
          ) : (
            <div className="tasks-grid">
              {tasks.map(task => (
                <TaskCard 
                  key={task.id || task._id || Math.random()} 
                  task={task} 
                  role="MEMBER" 
                  onStatusChange={handleStatusChange} 
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
