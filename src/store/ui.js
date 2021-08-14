import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    notification: null,
    notifyTimer: null,
  },
  reducers: {
    setNotification(state, action) {
      if(state.notifyTimer) {
        clearTimeout(state.notifyTimer);
      }
      state.notifyTimer = action.payload.timer;

      state.notification = { 
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },

    clearNotification(state, action) {
      state.notification = null;
      state.notifyTimer = null;
    }

  }
});

export const uiActions = uiSlice.actions;

export default uiSlice;