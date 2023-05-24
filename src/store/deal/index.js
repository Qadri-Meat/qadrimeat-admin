import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
  createAction,
} from "@reduxjs/toolkit";
import DealService from "services/DealService";

const initialState = {};

export const getDeals = createAsyncThunk(
  "deal/getAll",
  async (params, { rejectWithValue }) => {
    try {
      const res = await DealService.getAll(params);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getDeal = createAsyncThunk(
  "deals/get",
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
  name: "deals",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(resetDeal, (state, action) => {
      return initialState;
    });
    builder.addMatcher(
      isAnyOf(
        getDeals.pending,
        getDeal.pending,
        createDeal.pending,
        updateDeal.pending,
        deleteDeal.pending
      ),
      (state, action) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      isAnyOf(
        getDeals.fulfilled,
        getDeal.fulfilled,
        createDeal.fulfilled,
        updateDeal.fulfilled,
        deleteDeal.fulfilled
      ),
      (state, action) => {
        return action.payload;
      }
    );
    builder.addMatcher(
      isAnyOf(
        getDeals.rejected,
        getDeal.rejected,
        createDeal.rejected,
        updateDeal.rejected,
        deleteDeal.rejected
      ),
      (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      }
    );
  },
});

const { reducer } = dealSlice;
export default reducer;
