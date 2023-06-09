import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import OrderService from "services/OrderService";

const initialState = {};

export const getOrders = createAsyncThunk(
  "Orders/getAll",
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
  "Order/get",
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
  "Order/create",
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
  "Order/updateOrder",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      await OrderService.updateById({ id, data });
      return { success: true };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "Order/delete Order",
  async (id, { rejectWithValue }) => {
    try {
      await OrderService.delete(id);
      return { success: true };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getOrderItems = createAsyncThunk(
  "Order/getOrderItems",
  async ({ day, deal }, { rejectWithValue }) => {
    try {
      const res = await OrderService.getOrderItems(day, deal);
      return { OrderItems: res.data };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "Order/deleteTransaction",
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
  "Order/addTransaction",
  async ({ id, data }, { rejectWithValue }) => {
    console.log(id, data);
    try {
      await OrderService.addTransaction({ id, data });
      return { success: true };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const resetOrder = createAction("Order/reset");

const orderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(resetOrder, (state, action) => initialState);
    builder.addMatcher(
      (action) => action.type.startsWith("Order"),
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
