// tableSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {fetchGridData} from "../service/CommonService"

interface TableDataState {
  [tableKey: string]: {
    data: any[];
    loading: boolean;
    error: string | null;
  };
}

const initialState: TableDataState = {};

export const fetchTableData = createAsyncThunk(
  "table/fetchTableData",
  async (
    { apiUrl, tableKey }: { apiUrl: string; tableKey: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await fetchGridData(apiUrl);
      return { data, tableKey };
    } catch (error: any) {
      return rejectWithValue({ error: error.message, tableKey });
    }
  }
);

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    resetTableData: (state, action: PayloadAction<string>) => {
      const tableKey = action.payload;
      if (state[tableKey]) {
        state[tableKey] = { data: [], loading: false, error: null };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTableData.pending, (state, action) => {
        const { tableKey } = action.meta.arg;
        state[tableKey] = state[tableKey] || { data: [], loading: false, error: null };
        state[tableKey].loading = true;
        state[tableKey].error = null;
      })
      .addCase(fetchTableData.fulfilled, (state, action) => {
        const { tableKey, data } = action.payload;
        state[tableKey].loading = false;
        state[tableKey].data = action.payload.data;
      })
      .addCase(fetchTableData.rejected, (state, action: PayloadAction<any>) => {
        const { tableKey } = action.meta.arg;
        state[tableKey].loading = false;
        state[tableKey].error = action.payload?.error || "Unknown error";
      });
  },
});

export const { resetTableData } = tableSlice.actions;

export default tableSlice.reducer;
