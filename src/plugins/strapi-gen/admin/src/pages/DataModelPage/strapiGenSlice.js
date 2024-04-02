// strapiGenSlice.js
import { createSlice } from '@reduxjs/toolkit';

const strapiGenSlice = createSlice({
  name: 'strapiGen',
  initialState: {
    dataModels: [],
  },
  reducers: {
    createDataModel: (state, action) => {
      state.dataModels.push(action.payload);
    },
    updateDataModel: (state, action) => {
      const { id, updates } = action.payload;
      const dataModel = state.dataModels.find((model) => model.id === id);
      if (dataModel) {
        Object.assign(dataModel, updates);
      }
    },
  },
});

export const { createDataModel, updateDataModel } = strapiGenSlice.actions;

export default strapiGenSlice.reducer;