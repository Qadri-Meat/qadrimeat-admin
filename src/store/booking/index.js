import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import BookingService from "services/BookingService";

const initialState = {};

export const getBookings = createAsyncThunk(
  "booking/getAll",
  async (params, { rejectWithValue }) => {
    try {
      const res = await BookingService.getAll(params);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getBooking = createAsyncThunk(
  "booking/get",
  async (id, { rejectWithValue }) => {
    try {
      const res = await BookingService.get(id);
      const totalPaid1 = res.data.transactions.reduce(function (a, b) {
        return a + b.amount;
      }, 0);
      return {
        loading: false,
        selectedBooking: { ...res.data, totalPaid: totalPaid1 || 0 },
        // details: res.data,
        // totalPaid: totalPaid1 || 0,
      };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getBookingItems = createAsyncThunk(
  "booking/get",
  async ({ day, deal }, { rejectWithValue }) => {
    try {
      const res = await BookingService.getBookingItems(day, deal);
      return { bookingItems: res.data };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const createBooking = createAsyncThunk(
  "booking/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await BookingService.create(data);
      const totalPaid1 = res.data.transactions.reduce(function (a, b) {
        return a + b.amount;
      }, 0);
      return {
        loading: false,
        selectedBooking: { ...res.data, totalPaid: totalPaid1 || 0 },
        success: true,
      };
    } catch (err) {
      console.log("Error is", err.response.data.message);
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateBooking = createAsyncThunk(
  "booking/updateDeal",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      await BookingService.updateById({ id, data });
      return { success: true };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "booking/updateDeal",
  async ({ id1, id2 }, { rejectWithValue }) => {
    try {
      await BookingService.deleteTransaction(id1, id2);
      return { success: true };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const addTransaction = createAsyncThunk(
  "booking/updateDeal",
  async ({ id, data }, { rejectWithValue }) => {
    console.log(id, data);
    try {
      await BookingService.addTransaction({ id, data });
      return { success: true };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteBooking = createAsyncThunk(
  "booking/delete",
  async (id, { rejectWithValue }) => {
    try {
      await BookingService.delete(id);
      return { success: true };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        getBookings.pending,
        getBooking.pending,
        createBooking.pending,
        updateBooking.pending
      ),
      (state, action) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      isAnyOf(
        getBookings.fulfilled,
        getBooking.fulfilled,
        createBooking.fulfilled,
        updateBooking.fulfilled
      ),
      (state, action) => {
        return action.payload;
      }
    );
    builder.addMatcher(
      isAnyOf(
        getBookings.rejected,
        getBooking.rejected,
        createBooking.rejected,
        updateBooking.rejected
      ),
      (state, action) => {
        state.loading = false;
        // state.message = action.payload.message;
      }
    );
  },
});

const { reducer } = bookingSlice;
export default reducer;
