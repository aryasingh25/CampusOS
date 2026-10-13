
import { useState } from 'react';
import './App.css';

const initialTasks = [
  {
    id: 1,
    subject: 'Machine Learning',
    task: 'Complete Unit 2 notes',
    date: '',
    status: 'Pending',
  },
  {
    id: 2,
    subject: 'DBMS',
    task: 'Prepare for quiz',
    date: '',
    status: 'In Progress',
  },
  {
    id: 3,
    subject: 'Web Development',
    task: 'Learn React basics',
    date: '',
    status: 'Pending',
  },
];

function getSavedTasks() {
  try {
    const saved = localStorage.getItem('campusos-tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  } catch {
    return initialTasks;
  }
}

function App() {
  const [tasks, setTasks] = useState(getSavedTasks);
  const [showForm, setShowForm] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [subject, setSubject] = useState('');
  const [dueDate, setDueDate] = useState('');

  function saveTasks(updatedTasks) {
    setTasks(updatedTasks);
    localStorage.setItem('campusos-tasks', JSON.stringify(updatedTasks));
  }

  function addTask(event) {
    event.preventDefault();

    const newTask = {
      id: Date.now(),
      task: taskName.trim(),
      subject: subject.trim(),
      date: dueDate,
      status: 'Pending',
    };

    if (!newTask.task || !newTask.subject) return;

    saveTasks([newTask, ...tasks]);
    setTaskName('');
    setSubject('');
    setDueDate('');
    setShowForm(false);
  }

  function toggleTask(id) {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            status:
              task.status === 'Completed' ? 'Pending' : 'Completed',
          }
        : task
    );

    saveTasks(updatedTasks);
  }

  function deleteTask(id) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    saveTasks(updatedTasks);
  }

  const pendingCount = tasks.filter(
    (task) => task.status !== 'Completed'
  ).length;

  const completedCount = tasks.filter(
    (task) => task.status === 'Completed'
  ).length;

  return (
    <div className="app">
      <aside className="sidebar">
        <h2 className="logo">
          Campus<span>OS</span>
        </h2>

        <p className="side-label">WORKSPACE</p>

        <nav>
          <a className="nav-item active" href="#dashboard">
            ▦ Dashboard
          </a>
          <a className="nav-item" href="#tasks">
            ✓ My Tasks
          </a>
          <a className="nav-item" href="#timetable">
            ◷ Timetable
          </a>
          <a className="nav-item" href="#attendance">
            ▤ Attendance
          </a>
          <a className="nav-item" href="#planner">
            ✦ Study Planner
          </a>
          <a className="nav-item" href="#placement">
            ⌘ Placement Prep
          </a>
        </nav>

        <div className="sidebar-bottom">
          <div className="avatar">AS</div>
          <div>
            <strong>My Workspace</strong>
            <p>Student Account</p>
          </div>
        </div>
      </aside>

      <main className="main-content" id="dashboard">
        <header className="topbar">
          <div>
            <p className="eyebrow">YOUR PERSONAL STUDENT HUB</p>
            <h1>Good evening! 👋</h1>
            <p className="muted">
              Let's make today a productive one.
            </p>
          </div>

          <a className="date-button" href="#timetable">
            📅 My Schedule
          </a>
        </header>

        <section className="welcome-card">
          <div>
            <p className="welcome-tag">YOUR DAY, YOUR PACE</p>
            <h2>Small steps. Big progress.</h2>
            <p>
              Keep your classes, deadlines and goals in one place.
            </p>
            <a href="#tasks" className="primary-link">
              View my tasks →
            </a>
          </div>
          <div className="welcome-icon">✦</div>
        </section>

        <section className="stats-grid">
          <div className="stat-card">
            <p>Pending Tasks</p>
            <h2>{String(pendingCount).padStart(2, '0')}</h2>
            <span>Tasks left to complete</span>
          </div>

          <div className="stat-card">
            <p>Attendance</p>
            <h2>--%</h2>
            <span>Add your class details</span>
          </div>

          <div className="stat-card">
            <p>Study Hours</p>
            <h2>00 <small>hrs</small></h2>
            <span>Today's study time</span>
          </div>

          <div className="stat-card">
            <p>Tasks Completed</p>
            <h2>{completedCount}</h2>
            <span>Great progress!</span>
          </div>
        </section>

        <section className="content-grid">
          <div className="panel" id="tasks">
            <div className="panel-heading">
              <div>
                <h3>My Tasks</h3>
                <p className="muted">
                  Stay on top of your deadlines.
                </p>
              </div>

              <span className="count-badge">
                {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
              </span>
            </div>

            {showForm && (
              <form className="task-form" onSubmit={addTask}>
                <h3>Add a new task</h3>

                <label htmlFor="taskName">Task title</label>
                <input
                  id="taskName"
                  type="text"
                  placeholder="e.g. Complete assignment"
                  value={taskName}
                  onChange={(event) => setTaskName(event.target.value)}
                  required
                />

                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  type="text"
                  placeholder="e.g. DBMS"
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  required
                />

                <label htmlFor="dueDate">Due date (optional)</label>
                <input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(event) => setDueDate(event.target.value)}
                />

                <div className="form-actions">
                  <button className="secondary-button" type="button" onClick={() => setShowForm(false)}>
                    Cancel
                  </button>
                  <button className="primary-button" type="submit">
                    Save task
                  </button>
                </div>
              </form>
            )}

            <div className="task-list">
              {tasks.length === 0 ? (
                <p className="empty-state">
                  No tasks yet. Add your first task to get started!
                </p>
              ) : (
                tasks.map((task) => (
                  <div className="task-row" key={task.id}>
                    <input
                      className="task-checkbox"
                      type="checkbox"
                      checked={task.status === 'Completed'}
                      onChange={() => toggleTask(task.id)}
                      aria-label={`Mark ${task.task} as complete`}
                    />

                    <div className="task-info">
                      <strong className={task.status === 'Completed' ? 'completed-task' : ''}>
                        {task.task}
                      </strong>
                      <p>
                        {task.subject}
                        {' · '}
                        {task.date || 'No due date'}
                      </p>
                    </div>

                    <span
                      className={`status ${
                        task.status === 'Completed'
                          ? 'completed'
                          : task.status === 'Pending'
                            ? 'pending'
                            : 'progress'
                      }`}
                    >
                      {task.status}
                    </span>

                    <button
                      className="delete-button"
                      type="button"
                      onClick={() => deleteTask(task.id)}
                      aria-label={`Delete ${task.task}`}
                      title="Delete task"
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>

            {!showForm && (
              <button
                className="secondary-button"
                type="button"
                onClick={() => setShowForm(true)}
              >
                + Add a task
              </button>
            )}
          </div>

          <div className="panel" id="timetable">
            <div className="panel-heading">
              <div>
                <h3>Today's Schedule</h3>
                <p className="muted">Your day at a glance.</p>
              </div>
              <span className="calendar-icon">▦</span>
            </div>

            <div className="schedule-item">
              <div className="time">09:00</div>
              <div className="schedule-line purple"></div>
              <div>
                <strong>Machine Learning</strong>
                <p>Lecture · Classroom</p>
              </div>
            </div>

            <div className="schedule-item">
              <div className="time">11:00</div>
              <div className="schedule-line blue"></div>
              <div>
                <strong>Database Management</strong>
                <p>Lecture · Classroom</p>
              </div>
            </div>

            <div className="schedule-item">
              <div className="time">14:00</div>
              <div className="schedule-line orange"></div>
              <div>
                <strong>Web Development</strong>
                <p>Practice · Self study</p>
              </div>
            </div>
          </div>
        </section>

        <footer>
          Made for student life, one day at a time.
          <span>CampusOS © 2026</span>
        </footer>
      </main>
    </div>
  );
}

export default App;