import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_GET_PERSON,
  API_POST_PERSON, 
  API_GET_PERSON_FROM_ID, 
  API_UPDATE_PERSON, 
  API_DELETE_PERSON, 
} from '../service/CommonService'; 

interface PersonState {
  person: any; 
  loading: boolean;
  error: string | null;
}

const initialState: PersonState = {
  person: null,
  loading: false,
  error: null,
};

// Thunks
export const createPerson = createAsyncThunk(
  'person/createPerson',
  async (personData: any, { rejectWithValue }) => {
    try {
      const response = await API_POST_PERSON(personData);
      return response.data; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchPersonById = createAsyncThunk(
  'person/fetchPersonById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await API_GET_PERSON_FROM_ID(id);
      return response.data; // Return fetched supplier
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updatePerson = createAsyncThunk(
  'person/updatePerson',
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await API_UPDATE_PERSON(data, id);
      return response.data; // Return updated supplier
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deletePerson = createAsyncThunk(
  'person/deletePerson',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await API_DELETE_PERSON(id);
      return { id }; // Return deleted supplier's ID
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice
const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    resetSupplierState: (state) => {
      state.person = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Company
      .addCase(createPerson.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPerson.fulfilled, (state, action) => {
        state.loading = false;
        state.person = action.payload;
      })
      .addCase(createPerson.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Supplier by ID
      .addCase(fetchPersonById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPersonById.fulfilled, (state, action) => {
        state.loading = false;
        state.person = action.payload;
      })
      .addCase(fetchPersonById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Supplier
      .addCase(updatePerson.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePerson.fulfilled, (state, action) => {
        state.loading = false;
        state.person = action.payload;
      })
      .addCase(updatePerson.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Supplier
      .addCase(deletePerson.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePerson.fulfilled, (state, action) => {
        state.loading = false;
        state.person = null; // Clear supplier on successful delete
      })
      .addCase(deletePerson.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetSupplierState } = personSlice.actions;

export default personSlice.reducer;