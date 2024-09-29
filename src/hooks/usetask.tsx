import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchTasks, addTask, updateTask, deleteTask } from '../api/tasks';

// Fetch tasks
export const useTasks = () => {
  return useQuery('tasks', fetchTasks);
};

// Add a new task
export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation((title: string) => addTask(title), {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
    },
  });
};

// Update task (toggle completion)
export const useUpdateTask = () => {
    const queryClient = useQueryClient();
  
    return useMutation(
      ({ id, completed, title }: { id: string; completed: boolean; title: string }) => 
        updateTask(id, completed, title),
      {
        onSuccess: () => {
          queryClient.invalidateQueries('tasks');
        },
      }
    );
  };
  

// Delete a task
export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation((id: string) => deleteTask(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
    },
  });
};
