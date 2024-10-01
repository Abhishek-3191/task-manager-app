import React, { useState } from 'react';
import { Checkbox, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useUpdateTask } from '../hooks/usetask';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface TaskItemProps {
  id: string;
  title: string;
  completed: boolean;
  handleDelete: (id: string) => void; 
  handleToggle: (id: string) => void; 
}

const TaskItem: React.FC<TaskItemProps> = ({ id, title, completed, handleDelete, handleToggle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title); 
  const updateTaskMutation = useUpdateTask();

  const confirmDelete = (id: string) => {
    toast.info(
      <div style={{ textAlign: 'center' }}>
        <p>Are you sure you want to delete?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <button
            onClick={() => {
              handleDelete(id);
              toast.dismiss(); 
            }}
            style={{
              backgroundColor: '#ff4d4f',
              color: 'white',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss()}
            style={{
              backgroundColor: '#1890ff',
              color: 'white',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            No
          </button>
        </div>
      </div>
    );
  };

  const handleSave = () => {
    updateTaskMutation.mutate({
      id,
      completed,
      title: newTitle,
    });
    setIsEditing(false); 
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-300">
      <div className="flex items-center">
        <Checkbox 
          checked={completed} 
          onChange={() => handleToggle(id)} 
          color="primary"
        />
        {isEditing ? (
          <TextField
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            size="small"
            variant="outlined"
          />
        ) : (
          <span className={`${completed ? 'line-through text-gray-400' : ''}`}>
            {title}
          </span>
        )}
      </div>
      <div>
        {isEditing ? (
          <IconButton onClick={handleSave} color="primary">
            <SaveIcon/>
          </IconButton>
        ) : (
          <>
            <IconButton onClick={() => setIsEditing(true)} color="secondary">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => confirmDelete(id)} color="secondary">
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
