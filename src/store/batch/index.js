import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import BatchService from "services/BatchService";

const initialState = {};

export const getBatches = createAsyncThunk(
  "batches/getAll",
  async (data, { rejectWithValue }) => {
    try {
      const res = await BatchService.getAll();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getBatch = createAsyncThunk(
  "batches/get",
  async (id, { rejectWithValue }) => {
    try {
      const res = await BatchService.get(id);
      return { details: res.data };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createBatch = createAsyncThunk(
  "batches/create",
  async (data, { rejectWithValue }) => {
    try {
      await BatchService.create(data);
      return { success: true };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateBatch = createAsyncThunk(
  "batches/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      await BatchService.update(id, data);
      return { success: true };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const batchSlice = createSlice({
  name: "batches",
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        getBatches.pending,
        getBatch.pending,
        createBatch.pending,
        updateBatch.pending
      ),
      (state, action) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      isAnyOf(
        getBatches.fulfilled,
        getBatch.fulfilled,
        createBatch.fulfilled,
        updateBatch.fulfilled
      ),
      (state, action) => {
        return action.payload;
      }
    );
    builder.addMatcher(
      isAnyOf(
        getBatches.rejected,
        getBatch.rejected,
        createBatch.rejected,
        updateBatch.rejected
      ),
      (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      }
    );
  },
});

const { reducer } = batchSlice;
export default reducer;
