import './App.css'

function App() {
const tasks = [
{ subject: 'Machine Learning', task: 'Complete Unit 2 notes', date: 'Today', status: 'Pending' },
{ subject: 'DBMS', task: 'Prepare for quiz', date: 'Tomorrow', status: 'In Progress' },
{ subject: 'Web Development', task: 'Learn React basics', date: 'Today', status: 'Pending' },
]

return ( <div className="app"> <aside className="sidebar"> <h2 className="logo">Campus<span>OS</span></h2> <p className="side-label">WORKSPACE</p>

```
    <nav>
      <a className="nav-item active" href="#dashboard">▦ Dashboard</a>
      <a className="nav-item" href="#tasks">✓ My Tasks</a>
      <a className="nav-item" href="#timetable">◷ Timetable</a>
      <a className="nav-item" href="#attendance">▤ Attendance</a>
      <a className="nav-item" href="#planner">✦ Study Planner</a>
      <a className="nav-item" href="#placement">⌘ Placement Prep</a>
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
        <p className="muted">Let's make today a productive one.</p>
      </div>
      <button className="date-button">📅 My Schedule</button>
    </header>

    <section className="welcome-card">
      <div>
        <p className="welcome-tag">YOUR DAY, YOUR PACE</p>
        <h2>Small steps. Big progress.</h2>
        <p>Keep your classes, deadlines and goals in one place.</p>
        <a href="#tasks" className="primary-link">View my tasks →</a>
      </div>
      <div className="welcome-icon">✦</div>
    </section>

    <section className="stats-grid">
      <div className="stat-card">
        <p>Pending Tasks</p>
        <h2>03</h2>
        <span>Things to work on</span>
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
        <p>Weekly Progress</p>
        <h2>0%</h2>
        <span>Your week starts here</span>
      </div>
    </section>

    <section className="content-grid">
      <div className="panel" id="tasks">
        <div className="panel-heading">
          <div>
            <h3>Upcoming Tasks</h3>
            <p className="muted">Stay on top of your deadlines.</p>
          </div>
          <span className="count-badge">03 tasks</span>
        </div>

        <div className="task-list">
          {tasks.map((task, index) => (
            <div className="task-row" key={index}>
              <div className="task-check"></div>
              <div className="task-info">
                <strong>{task.task}</strong>
                <p>{task.subject} · {task.date}</p>
              </div>
              <span className={`status ${task.status === 'Pending' ? 'pending' : 'progress'}`}>
                {task.status}
              </span>
            </div>
          ))}
        </div>

        <button className="secondary-button" onClick={() => alert('Task management is coming next!')}>
          + Add a task
        </button>
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

    <footer>Made for student life, one day at a time. <span>CampusOS © 2026</span></footer>
  </main>
</div>


)
}

export default App
