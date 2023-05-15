import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import ExpenseService from "services/ExpenseServices";
const initialState = {};
export const getExpenses = createAsyncThunk(
  "users/getAll",
  async (params, { rejectWithValue }) => {
    try {
      const res = await ExpenseService.getAll(params);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getExpense = createAsyncThunk(
  "users/get",
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
  "users/create",
  async (data, { rejectWithValue }) => {
    try {
      await ExpenseService.create(data);
      return { success: true };
    } catch (err) {
      console.log("Error is", err.response.data.message);
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateExpense = createAsyncThunk(
  "users/updateUser",
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
  "user/delete",
  async (id, { rejectWithValue }) => {
    try {
      await ExpenseService.delete(id);
      return { success: true };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const expenseSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        getExpenses.pending,
        getExpense.pending,
        createExpense.pending,
        updateExpense.pending
      ),
      (state, action) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      isAnyOf(
        getExpenses.fulfilled,
        getExpense.fulfilled,
        createExpense.fulfilled,
        updateExpense.fulfilled
      ),
      (state, action) => {
        return action.payload;
      }
    );
    builder.addMatcher(
      isAnyOf(
        getExpenses.rejected,
        getExpense.rejected,
        createExpense.rejected,
        updateExpense.rejected
      ),
      (state, action) => {
        state.loading = false;
      }
    );
  },
});

const { reducer } = expenseSlice;
export default reducer;
