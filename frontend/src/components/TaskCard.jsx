const TaskCard = ({ task, onStatusChange, role }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'PENDING':
        return 'badge-pending';
      case 'IN_PROGRESS':
        return 'badge-inprogress';
      case 'DONE':
        return 'badge-done';
      default:
        return 'badge-pending';
    }
  };

  return (
    <div className="card task-card">
      <div className="task-header">
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600' }}>{task.title || 'Untitled Task'}</h3>
        <span className={`badge ${getStatusBadge(task.status)}`}>{task.status}</span>
      </div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', flex: 1 }}>
        {task.description || 'No description provided.'}
      </p>
      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {role === 'ADMIN' && task.assignee ? `Assigned to: ${task.assignee}` : ''}
        </span>
        
        {role === 'MEMBER' && (
          <select 
            value={task.status} 
            onChange={(e) => onStatusChange(task.id, e.target.value)}
            className="form-input"
            style={{ width: 'auto', padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}
          >
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
