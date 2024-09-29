import React from 'react';
import TaskItem from './TaskItem';
import { useTasks, useDeleteTask, useUpdateTask } from '../hooks/usetask';

const TaskList: React.FC = () => {
  const { data: tasks = [] } = useTasks(); 
  const deleteTaskMutation = useDeleteTask();
  const updateTaskMutation = useUpdateTask();

  // Function to handle task deletion
  const handleDelete = (id: string) => {
    deleteTaskMutation.mutate(id);
  };

  // Function to handle toggling task completion
  const handleToggle = (id: string) => {
    const task = tasks.find(task => task.id === id);
    if (task) {
      updateTaskMutation.mutate({
        id: task.id,
        completed: !task.completed,
        title: task.title,
      });
    }
  };

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          title={task.title}
          completed={task.completed}
          handleDelete={handleDelete} // Pass the delete handler
          handleToggle={handleToggle} // Pass the toggle handler
        />
      ))}
    </div>
  );
};

export default TaskList;
