import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import DealService from "services/DealService";

const initialState = {};

export const getDeals = createAsyncThunk(
  "deal/getAll",
  async (query, { rejectWithValue }) => {
    try {
      const res = await DealService.getAll(query);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getDeal = createAsyncThunk(
  "deal/get",
  async (id, { rejectWithValue }) => {
    try {
      const res = await DealService.get(id);
      return { details: res.data };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createDeal = createAsyncThunk(
  "deal/create",
  async (data, { rejectWithValue }) => {
    try {
      await DealService.create(data);
      return { success: true };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateDeal = createAsyncThunk(
  "deal/updateDeal",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      await DealService.updateById({ id, data });
      return { success: true };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteDeal = createAsyncThunk(
  "deal/delete",
  async (id, { rejectWithValue }) => {
    try {
      await DealService.delete(id);
      return { success: true };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const resetDeal = createAction("deal/reset");

const dealSlice = createSlice({
  name: "deal",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(resetDeal, (state, action) => initialState);
    builder.addMatcher(
      (action) => action.type.startsWith("deal"),
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

const { reducer } = dealSlice;
export default reducer;
