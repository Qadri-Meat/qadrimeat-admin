import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import ExpenseService from "services/ExpenseServices";

const initialState = {};

export const getExpenses = createAsyncThunk(
  "expense/getAll",
  async (query, { rejectWithValue }) => {
    try {
      const res = await ExpenseService.getAll(query);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getExpense = createAsyncThunk(
  "expense/get",
  async (id, { rejectWithValue }) => {
    try {
      const res = await ExpenseService.get(id);
      return { details: res.data };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createExpense = createAsyncThunk(
  "expense/create",
  async (data, { rejectWithValue }) => {
    try {
      await ExpenseService.create(data);
      return { success: true };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateExpense = createAsyncThunk(
  "expense/updateExpense",
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

export const deleteExpense = createAsyncThunk(
  "expense/delete",
  async (id, { rejectWithValue }) => {
    try {
      await ExpenseService.delete(id);
      return { success: true };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const resetExpense = createAction("expense/reset");

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(resetExpense, (state, action) => initialState);
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

const { reducer } = expenseSlice;
export default reducer;
