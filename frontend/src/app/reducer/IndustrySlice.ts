import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_POST_INDUSTRY, API_GET_INDUSTRY } from  '../service/CommonService';

interface IndustryState {
  industries: { id: string; name: string }[];
  loading: boolean;
  error: string | null;
}

const initialState: IndustryState = {
  industries: [],
  loading: false,
  error: null,
};

// Fetch industries
export const fetchIndustries = createAsyncThunk(
  'industry/fetchIndustries',
  async (_, thunkAPI) => {
    try {
      const response = await API_GET_INDUSTRY();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch industries');
    }
  }
);

// Add industry
export const addIndustry = createAsyncThunk(
  'industry/addIndustry',
  async (newIndustry: string, thunkAPI) => {
    try {
      const response = await API_POST_INDUSTRY({ name: newIndustry });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to add industry');
    }
  }
);

const industrySlice = createSlice({
  name: 'industry',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIndustries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIndustries.fulfilled, (state, action) => {
        state.loading = false;
        state.industries = action.payload;
      })
      .addCase(fetchIndustries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addIndustry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addIndustry.fulfilled, (state, action) => {
        state.loading = false;
        state.industries.push(action.payload);
      })
      .addCase(addIndustry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default industrySlice.reducer;
