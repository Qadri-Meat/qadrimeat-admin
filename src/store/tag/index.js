import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import TagService from "services/TagService";

const initialState = {};

export const getTags = createAsyncThunk(
  "tags/getAll",
  async (batchId, { rejectWithValue }) => {
    try {
      const res = await TagService.getAll(batchId);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const tagSlice = createSlice({
  name: "tags",
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(getTags.pending), (state, action) => {
      state.loading = true;
    });
    builder.addMatcher(isAnyOf(getTags.fulfilled), (state, action) => {
      return action.payload;
    });
    builder.addMatcher(isAnyOf(getTags.rejected), (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    });
  },
});

const { reducer } = tagSlice;
export default reducer;
