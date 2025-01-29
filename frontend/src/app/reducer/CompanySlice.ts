import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_GET_COMPANIES,
  API_POST_COMPANIES, 
  API_GET_COMPANIES_FROM_ID, 
  API_UPDATE_COMPANIES, 
  API_DELETE_COMPANIES, 
  API_GET_COMPANIES_NAME,
  API_GET_COMPANIES_NAME_AND_CIN
} from '../service/CommonService'; 

interface CompaniesState {
  company: any; 
  loading: boolean;
  error: string | null;
}

const initialState: CompaniesState = {
  company: null,
  loading: false,
  error: null,
};

// Thunks
export const createCompany = createAsyncThunk(
  'compnies/createCompany',
  async (companyData: any, { rejectWithValue }) => {
    try {
      const response = await API_POST_COMPANIES(companyData);
      return response.data; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchCompanyById = createAsyncThunk(
  'company/fetchCompanyById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await API_GET_COMPANIES_FROM_ID(id);
      return response.data; // Return fetched supplier
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateCompany = createAsyncThunk(
  'supplier/updateCompany',
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await API_UPDATE_COMPANIES(data, id);
      return response.data; // Return updated supplier
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteCompany = createAsyncThunk(
  'supplier/deleteCompany',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await API_DELETE_COMPANIES(id);
      return { id }; // Return deleted supplier's ID
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchCompanyNames = createAsyncThunk(
  'company/fetchCompanyNames',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API_GET_COMPANIES_NAME(); // Call the API
      return response.data; // Return the list of company names
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchCompanyNamesAndCin = createAsyncThunk(
  'company/fetchCompanyNamesAndCin',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API_GET_COMPANIES_NAME_AND_CIN(); // Call your API
      return response.data; // Return the list of company names and CIN
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice
const compnaySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    resetSupplierState: (state) => {
      state.company = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Company
      .addCase(createCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.company = action.payload;
      })
      .addCase(createCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Supplier by ID
      .addCase(fetchCompanyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyById.fulfilled, (state, action) => {
        state.loading = false;
        state.company = action.payload;
      })
      .addCase(fetchCompanyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Supplier
      .addCase(updateCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.company = action.payload;
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Supplier
      .addCase(deleteCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.company = null; // Clear supplier on successful delete
      })
      .addCase(deleteCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Company Names
      .addCase(fetchCompanyNames.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyNames.fulfilled, (state, action) => {
        state.loading = false;
        state.company = action.payload; // Store fetched company names
      })
      .addCase(fetchCompanyNames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchCompanyNamesAndCin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyNamesAndCin.fulfilled, (state, action) => {
        state.loading = false;
        state.company = action.payload; // Store the fetched company names and CIN
      })
      .addCase(fetchCompanyNamesAndCin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetSupplierState } = compnaySlice.actions;

export default compnaySlice.reducer;