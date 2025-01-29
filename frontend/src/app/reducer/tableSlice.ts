import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchGridData } from "../service/CommonService";

// Define the type for the state of each table
interface TableDataState {
  [tableKey: string]: {
    data: any[];
    loading: boolean;
    error: string | null;
  };
}

const initialState: TableDataState = {};

// Create the async thunk for fetching table data
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

// Create the table slice
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
        state[tableKey].data = data;
      })
      .addCase(fetchTableData.rejected, (state, action: PayloadAction<any>) => {
        // Remove tableKey handling and set a default error state
        const errorMessage = action.payload?.error || "Unknown error";
        // If you need to handle a specific table, you can update this part accordingly
        state.error = errorMessage; // general error handling
    
      });
      
  },
});

export const { resetTableData } = tableSlice.actions;

export default tableSlice.reducer;
