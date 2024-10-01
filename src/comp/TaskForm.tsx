import React, { useState } from 'react';
import { useAddTask } from '../hooks/usetask';
import { Button, TextField } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const { mutate: addTask } = useAddTask();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (title.trim()) {
            addTask(title); 
            setTitle('');
            toast("Item added!");
        }
    };

    return (
        <form className="flex gap-4" onSubmit={handleSubmit}>
            <TextField
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Tell me your task"
                className="flex-grow" 
                inputProps={{
                    className: 'placeholder:text-gray-500', 
                }}
            />
            <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                className="bg-blue-600 hover:bg-blue-700 transition-colors"
            >
                Add
            </Button>
        </form>
    );
};

export default TaskForm;
