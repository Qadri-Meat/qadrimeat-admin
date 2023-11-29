import {
  createSlice,
  createAsyncThunk,
  createAction,
} from '@reduxjs/toolkit';
import UserService from 'services/UserService';

const initialState = {};

export const getUsers = createAsyncThunk(
  'user/getAll',
  async (params, { rejectWithValue }) => {
    try {
      const res = await UserService.getAll(params);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getDashboard = createAsyncThunk(
  'user/getDashboardData',
  async (query, { rejectWithValue }) => {
    try {
      const res = await UserService.getDashboard(query);

      const stockReport = res.data;
      const report = stockReport.stockReport;
      console.log('report', report);
      function calculateRemainingAndAddToNextDay(data) {
        for (let i = 0; i < data.length - 1; i++) {
          const currentDay = data[i];
          const nextDay = data[i + 1];

          currentDay.data.forEach((item, index) => {
            const remainingWeight =
              item.stockWeight - item.saleWeight;

            if (nextDay) {
              const nextDayItemIndex = nextDay.data.findIndex(
                (nextItem) => nextItem.category === item.category
              );

              if (nextDayItemIndex !== -1) {
                nextDay.data[nextDayItemIndex].stockWeight +=
                  remainingWeight;
              }
            }
          });
        }

        return data;
      }

      const updatedData = calculateRemainingAndAddToNextDay(report);
      console.log(updatedData);
      console.log(JSON.stringify('okolk', updatedData, null, 2));
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getUser = createAsyncThunk(
  'user/get',
  async (id, { rejectWithValue }) => {
    try {
      const res = await UserService.get(id);
      return { details: res.data };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createUser = createAsyncThunk(
  'user/create',
  async (data, { rejectWithValue }) => {
    try {
      await UserService.create(data);
      return { success: true };
    } catch (err) {
      console.log('Error is', err.response.data.message);
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      await UserService.updateById(id, data);
      return { success: true };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/delete',
  async (id, { rejectWithValue }) => {
    try {
      await UserService.delete(id);
      return { success: true };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const resetUser = createAction('user/reset');

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(resetUser, (state, action) => initialState);
    builder.addMatcher(
      (action) => action.type.startsWith('user'),
      (state, action) => {
        const [actionType] = action.type.split('/').reverse();
        switch (actionType) {
          case 'pending':
            state.loading = true;
            break;
          case 'fulfilled':
            return action.payload;
          case 'rejected':
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

const { reducer } = userSlice;
export default reducer;
