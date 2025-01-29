import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_GET_PROJECTS,
  API_POST_PROJECTS, 
  API_GET_PROJECTS_FROM_ID, 
  API_UPDATE_PROJECTS, 
  API_DELETE_PROJECTS, 
} from '../service/CommonService'; 

interface ProjectState {
  project: any; 
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  project: null,
  loading: false,
  error: null,
};

// Thunks
export const createProject = createAsyncThunk(
  'project/createProject',
  async (projectData: any, { rejectWithValue }) => {
    try {
      const response = await API_POST_PROJECTS(projectData);
      return response.data; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchProjectById = createAsyncThunk(
  'project/fetchProjectById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await API_GET_PROJECTS_FROM_ID(id);
      return response.data; // Return fetched supplier
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateProject = createAsyncThunk(
  'project/updateProject',
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await API_UPDATE_PROJECTS(data, id);
      return response.data; // Return updated supplier
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteProject = createAsyncThunk(
  'project/deleteProject',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await API_DELETE_PROJECTS(id);
      return { id }; // Return deleted supplier's ID
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice
const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    resetSupplierState: (state) => {
      state.project = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Company
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.project = action.payload;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Supplier by ID
      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.project = action.payload;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Supplier
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        state.project = action.payload;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Supplier
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.project = null; // Clear supplier on successful delete
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetSupplierState } = projectSlice.actions;

export default projectSlice.reducer;