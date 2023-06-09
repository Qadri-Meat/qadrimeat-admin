import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import ProductService from "services/ProductService";

const initialState = {};

export const getProducts = createAsyncThunk(
  "products/getAll",
  async (query, { rejectWithValue }) => {
    try {
      const res = await ProductService.getAll(query);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getProduct = createAsyncThunk(
  "products/get",
  async (id, { rejectWithValue }) => {
    try {
      const res = await ProductService.get(id);
      return { details: res.data };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createProducts = createAsyncThunk(
  "products/create",
  async (data, { rejectWithValue }) => {
    try {
      await ProductService.create(data);
      return { success: true };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateProducts = createAsyncThunk(
  "products/updateDeal",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      await ProductService.updateById({ id, data });
      return { success: true };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, { rejectWithValue }) => {
    try {
      await ProductService.delete(id);
      return { success: true };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const resetProduct = createAction("deal/reset");

const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(resetProduct, (state, action) => initialState);
    builder.addMatcher(
      (action) => action.type.startsWith("product"),
      (state, action) => {
        const [actionType] = action.type.split("/").reverse();
        switch (actionType) {
          case "pending":
            state.loading = true;
            break;
          case "fulfilled":
            return action.payload;
          case "rejected":
            state.loading = false;
            state.message = action.payload.message;
            break;
          default:
            break;
        }
      }
    );
  },
});

const { reducer } = productSlice;
export default reducer;
