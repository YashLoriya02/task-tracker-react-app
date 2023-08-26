import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Tasks from './Components/Tasks';
import Add from './Components/Add';
import Footer from './Components/Footer';
import About from './Components/About';

const App = () => {
  const [showAddTask, setShowAddText] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasksFromServer = async () => {
      const taskFromServer = await fetchTasks()
      setTasks(taskFromServer)
    }

    getTasksFromServer()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = res.json()
    return data
  }

  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()
    setTasks([...tasks, data])
  }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })

    setTasks(tasks.filter((task) => task.id !== id))
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = res.json()
    return data
  }

  const ToggleReminder = async (id) => {

    const tasktoToggle = await fetchTask(id)
    const updatedTask = { ...tasktoToggle, reminder: !tasktoToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json()

    setTasks(tasks.map((task) => task.id === id ? {
      ...task, reminder: data.reminder
    } : task
    ))
  }

  return (

    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddText(!showAddTask)} showAdd={showAddTask} />
        <Routes>
          <Route exact path='/' element={
            <>
              {showAddTask && <Add onAdd={addTask} />}
              {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={ToggleReminder} /> : ("No Tasks Found")}
            </>
          }
          />
          <Route path='/about' element= { <About /> } />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;