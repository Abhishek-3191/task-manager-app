import React from 'react';
import TaskForm from "./comp/TaskForm"; 
import TaskList from "./comp/TaskList";
import { ToastContainer } from 'react-toastify';
const App: React.FC = () => {
    return (
            <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Task Manager App!</h1>
            <TaskForm />
            <TaskList/>
            <ToastContainer/>
        </div>
    );
}

export default App;
