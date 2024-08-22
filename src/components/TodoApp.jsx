


import React, { useState, useEffect, useRef } from 'react';
import './TodoApp.css';

const TodoApp = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [editTask, setEditTask] = useState('');
    const inputRef = useRef(null);
    const editInputRef = useRef(null);

    useEffect(() => {
        if (editIndex !== null) {
            editInputRef.current.focus();
        } else {
            inputRef.current.focus();
        }
    }, [editIndex]);

    const addTask = () => {
        if (newTask.trim()) {
            setTasks([...tasks, newTask.trim()]);
            setNewTask('');
        }
    };

    const deleteTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    };

    const startEditTask = (index) => {
        setEditIndex(index);
        setEditTask(tasks[index]);
    };

    const saveEditTask = () => {
        const updatedTasks = tasks.map((task, i) =>
            i === editIndex ? editTask : task
        );
        setTasks(updatedTasks);
        setEditIndex(null);
        setEditTask('');
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if (editIndex !== null) {
                saveEditTask();
            } else {
                addTask();
            }
        }
    };

    return (
        <div className='Todo-con'>
            <h1>Todo App</h1>
            <div className="Todo-input">
                <input
                    ref={inputRef}
                    type='text'
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder='Add new Task'
                />
                <button onClick={addTask}>Add</button>
            </div>

            <ul className='todo-list'>
                {tasks.map((task, index) => (
                    <li key={index}>
                        {editIndex === index ? (
                            <div>
                                <input
                                    ref={editInputRef}
                                    type='text'
                                    value={editTask}
                                    onChange={(e) => setEditTask(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                                <button onClick={saveEditTask}>Save</button>
                            </div>
                        ) : (
                            <div className='inputButn'>
                                <span>{task}</span>
                                <div className="butn">
                                    <button onClick={() => startEditTask(index)}>Edit</button>
                                    <button onClick={() => deleteTask(index)}>Delete</button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;
