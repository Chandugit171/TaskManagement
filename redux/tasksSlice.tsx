import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const addedTasksData = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTask: (state, action) => {
      return [...state, action.payload]; 
    },
    updateTask: (state, action) => {
      return state.map(task =>
        task.id === action.payload.id
          ? { ...task, ...action.payload }
          : task
      );
    },
    clearTask: () => {
      return [];
    },
  },
});

export const { setTask, updateTask, clearTask } = addedTasksData.actions;
export default addedTasksData.reducer;
