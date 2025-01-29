import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_POST_PRODUCT, API_GET_PRODUCT } from '../service/CommonService';

interface ProductState {
  products: { id: string; name: string }[];
  loading: boolean;
  error: string | null;
}

// Initial state of the products
const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

interface ProductPayload {
  name: string;
}

// Fetch products
export const fetchProducts = createAsyncThunk<
  { id: string; name: string }[], 
  undefined,                     
  { rejectValue: string }        
>('product/fetchProducts', async (_, thunkAPI) => {
  try {
    const response = await API_GET_PRODUCT();
    return response.data.data; 
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to fetch products');
  }
});

// Add product
export const addProduct = createAsyncThunk<
  { id: string; name: string }, // Success return type
  ProductPayload,              // Argument type
  { rejectValue: string }      // Reject value type
>('product/addProduct', async (newProduct, thunkAPI) => {
  try {
    const response = await API_POST_PRODUCT(newProduct);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to add product');
  }
});

// Create the product slice
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetch products actions
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;  // Set the fetched products
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;  // Set the error message
      })
      
      // Handle add product actions
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);  // Add the new product to the list
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;  // Set the error message
      });
  },
});

export default productSlice.reducer;
