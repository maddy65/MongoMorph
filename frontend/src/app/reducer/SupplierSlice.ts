import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_POST_SUPPLIER,
  API_GET_SUPPLIER_FROM_ID,
  API_UPDATE_SUPPLIER,
  API_DELETE_SUPPLIER,
} from '../service/CommonService'; // Adjust path if necessary

interface SupplierState {
  supplier: any; // Replace `any` with the appropriate type for a supplier
  loading: boolean;
  error: string | null;
}

const initialState: SupplierState = {
  supplier: null,
  loading: false,
  error: null,
};

// Thunks
export const createSupplier = createAsyncThunk(
  'supplier/createSupplier',
  async (supplierData: any, { rejectWithValue }) => {
    try {
      const response = await API_POST_SUPPLIER(supplierData);
      return response.data; // Return created supplier
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchSupplierById = createAsyncThunk(
  'supplier/fetchSupplierById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await API_GET_SUPPLIER_FROM_ID(id);
      return response.data; // Return fetched supplier
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateSupplier = createAsyncThunk(
  'supplier/updateSupplier',
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await API_UPDATE_SUPPLIER(data, id);
      return response.data; // Return updated supplier
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteSupplier = createAsyncThunk(
  'supplier/deleteSupplier',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await API_DELETE_SUPPLIER(id);
      return { id }; // Return deleted supplier's ID
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice
const supplierSlice = createSlice({
  name: 'supplier',
  initialState,
  reducers: {
    resetSupplierState: (state) => {
      state.supplier = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Supplier
      .addCase(createSupplier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSupplier.fulfilled, (state, action) => {
        state.loading = false;
        state.supplier = action.payload;
      })
      .addCase(createSupplier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Supplier by ID
      .addCase(fetchSupplierById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSupplierById.fulfilled, (state, action) => {
        state.loading = false;
        state.supplier = action.payload;
      })
      .addCase(fetchSupplierById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Supplier
      .addCase(updateSupplier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSupplier.fulfilled, (state, action) => {
        state.loading = false;
        state.supplier = action.payload;
      })
      .addCase(updateSupplier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Supplier
      .addCase(deleteSupplier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSupplier.fulfilled, (state, action) => {
        state.loading = false;
        state.supplier = null; // Clear supplier on successful delete
      })
      .addCase(deleteSupplier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetSupplierState } = supplierSlice.actions;

export default supplierSlice.reducer;