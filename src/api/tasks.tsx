import { v4 as uuidv4 } from "uuid";

interface Task{
    id: string;
    title: string;
    completed:boolean;
}
let tasks:Task[]=[
    { id: uuidv4(), title: "Learn React", completed: false },
    { id: uuidv4(), title: "Learn TypeScript", completed: false },
];

export const fetchTasks = async (): Promise<Task[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(tasks);
      }, 1);
    });
  };

  export const addTask=async(title:string):Promise<Task>=>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            const newTask={id:uuidv4(),title,completed:false};
            tasks.push(newTask);
            resolve(newTask);
        },1);
    });
  };

  export const updateTask = async (
    id: string,
    completed: boolean,
    title: string
  ): Promise<Task | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        tasks = tasks.map((task) =>
          task.id === id ? { ...task, completed, title } : task
        );
        const updatedTask = tasks.find((task) => task.id === id) || null;
        resolve(updatedTask);
      }, 1);
    });
  };
  
  

  export const deleteTask = async (id: string): Promise<string> => {
    return new Promise((resolve) => {
   setTimeout(()=>{
    tasks=tasks.filter((task)=>task.id!==id);
    resolve(id);
   },1);
    });
};
  
