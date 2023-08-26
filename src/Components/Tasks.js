import React from 'react'
import SingularTask from './SingularTask'
// import { useState } from 'react';

const Tasks = ({ tasks , onDelete , onToggle }) => {
  return (
    <>
        {tasks.map((task)=>(
            // <h3 key={task.id} >{task.text}</h3>
            <SingularTask key={task.id} task={task} onDelete = {onDelete} onToggle = {onToggle} />
        ))}
    </>
  )
}

export default Tasks