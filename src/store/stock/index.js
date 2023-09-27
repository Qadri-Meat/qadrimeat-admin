import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import ExpenseService from "services/ExpenseServices";

const initialState = {};

export const getStocks = createAsyncThunk(
  "stocks/getAll",
  async (query, { rejectWithValue }) => {
    try {
      const res = await ExpenseService.getAll(query);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getStock = createAsyncThunk(
  "stocks/get",
  async (id, { rejectWithValue }) => {
    try {
      const res = await ExpenseService.get(id);
      return { details: res.data };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const AddStock = createAsyncThunk(
  "stocks/create",
  async (data, { rejectWithValue }) => {
    try {
      await ExpenseService.create(data);
      return { success: true };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateStock = createAsyncThunk(
  "stocks/updateExpense",
  async ({ id, data }, { rejectWithValue }) => {
    console.log(id, data);
    try {
      await ExpenseService.updateById({ id, data });
      return { success: true };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteStock = createAsyncThunk(
  "stocks/delete",
  async (id, { rejectWithValue }) => {
    try {
      await ExpenseService.delete(id);
      return { success: true };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const resetStock = createAction("expense/reset");

const stocksSlice = createSlice({
  name: "expense",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(resetStock, (state, action) => initialState);
    builder.addMatcher(
      (action) => action.type.startsWith("expense"),
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

const { reducer } = stocksSlice;
export default reducer;
