// import React,{useState} from 'react';
// import { useUpdateTask, useDeleteTask } from '../hooks/usetask';
// import { Checkbox, IconButton } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit'
// interface TaskItemProps {
//   id: string;
//   title: string;
//   completed: boolean;
// }

// const TaskItem: React.FC<TaskItemProps> = ({ id, title, completed }) => {
//   const updateTask = useUpdateTask();
//   const deleteTask = useDeleteTask();
//   const [isEditing, setIsEditing] = useState(false);
//   const [newTitle, setNewTitle] = useState(title); // Initialize with the current title
  


//   const handleToggle = () => {
//     updateTask.mutate({ id, completed: !completed ,title});
//   };

//   const handleDelete = () => {
//     deleteTask.mutate(id);
//   };
  
//   const handleUpdate=()=>{
//     updateTask.mutate({ id,completed,title});
//   };
 
//   const handleEditClick = () => {
//     setIsEditing(true);
//   };
//   return (
//     <div className="flex items-center justify-between p-4 border-b border-gray-300">
//       <div className="flex items-center">
//         <Checkbox 
//           checked={completed} 
//           onChange={handleToggle} 
//           color="primary"
//         />
//         <span className={`${completed ? 'line-through text-gray-400' : ''}`}>
//           {title}
//         </span>
//       </div>
//       <IconButton onClick={handleDelete} color="secondary">
//         <DeleteIcon />
//       </IconButton>
//       <IconButton onClick={handleUpdate} color="secondary">
//         <EditIcon/>
//       </IconButton>
//     </div>
//   );
// };

// export default TaskItem;

import React, { useState } from 'react';
import { Checkbox, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useUpdateTask } from '../hooks/usetask';

interface TaskItemProps {
  id: string;
  title: string;
  completed: boolean;
  handleDelete: (id: string) => void; // Assuming you have this function passed down
  handleToggle: (id: string) => void; // Assuming you have this function passed down
}

const TaskItem: React.FC<TaskItemProps> = ({ id, title, completed, handleDelete, handleToggle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title); // Initialize with current title
  const updateTaskMutation = useUpdateTask();

  // Handle saving the edited task
  const handleSave = () => {
    updateTaskMutation.mutate({
      id,
      completed,
      title: newTitle,
    });
    setIsEditing(false); // Exit editing mode
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
            Save
          </IconButton>
        ) : (
          <>
            <IconButton onClick={() => setIsEditing(true)} color="secondary">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(id)} color="secondary">
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
