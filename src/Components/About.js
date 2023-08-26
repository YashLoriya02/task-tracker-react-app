import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div>
      <h3>Version 1.1.2</h3>
      <p>Task-Tracker or To-Do-List Application with Functionality of Adding, Removing and Updating Tasks.</p>
      <Link to="/">Home</Link>
    </div>
  )
}

export default About
