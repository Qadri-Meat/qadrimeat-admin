import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import OrderService from "services/OrderService";

const initialState = {};

export const getOrders = createAsyncThunk(
  "order/getAll",
  async (params, { rejectWithValue }) => {
    try {
      const res = await OrderService.getAll(params);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getOrder = createAsyncThunk(
  "order/get",
  async (id, { rejectWithValue }) => {
    try {
      const res = await OrderService.get(id);
      const totalPaid1 = res.data.transactions.reduce(function (a, b) {
        return a + b.amount;
      }, 0);
      return {
        loading: false,
        selectedOrder: { ...res.data, totalPaid: totalPaid1 || 0 },
      };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createOrder = createAsyncThunk(
  "order/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await OrderService.create(data);
      const totalPaid1 = res.data.transactions.reduce(function (a, b) {
        return a + b.amount;
      }, 0);
      return {
        loading: false,
        selectedOrder: { ...res.data, totalPaid: totalPaid1 || 0 },
        success: true,
      };
    } catch (err) {
      console.log("Error is", err.response.data.message);
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "order/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await OrderService.updateById({ id, data });
      return { success: true, selectedOrder: res.data };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "order/delete",
  async (id, { rejectWithValue }) => {
    try {
      await OrderService.delete(id);
      return { success: true };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "order/deleteTransaction",
  async ({ id1, id2 }, { rejectWithValue }) => {
    try {
      await OrderService.deleteTransaction(id1, id2);
      return { success: true };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const addTransaction = createAsyncThunk(
  "order/addTransaction",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      await OrderService.addTransaction({ id, data });
      return { success: true };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const resetOrder = createAction("order/reset");

const orderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(resetOrder, (state, action) => initialState);
    builder.addMatcher(
      (action) => action.type.startsWith("order"),
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

const { reducer } = orderSlice;
export default reducer;
