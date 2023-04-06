import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import UserService from "services/UserService";

const initialState = {};

export const getUsers = createAsyncThunk(
  "users/getAll",
  async (params, { rejectWithValue }) => {
    try {
      const res = await UserService.getAll(params);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getUser = createAsyncThunk(
  "users/get",
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
  "users/create",
  async (data, { rejectWithValue }) => {
    try {
      await UserService.create(data);
      return { success: true };
    } catch (err) {
      console.log("Error is", err.response.data.message);
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, data }, { rejectWithValue }) => {
    console.log(id, data);
    try {
      await UserService.updateById({ id, data });
      return { success: true };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// export const updateUser = createAsyncThunk(
//   "users/updateUser",
//   async (id, data, { rejectWithValue }) => {
//     console.log(id, data);
//     try {
//       await UserService.updateById(id, data);
//       return { success: true };
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

export const deleteUser = createAsyncThunk(
  "user/delete",
  async (id, { rejectWithValue }) => {
    try {
      await UserService.delete(id);
      return { success: true };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        getUsers.pending,
        getUser.pending,
        createUser.pending,
        updateUser.pending
      ),
      (state, action) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      isAnyOf(
        getUsers.fulfilled,
        getUser.fulfilled,
        createUser.fulfilled,
        updateUser.fulfilled
      ),
      (state, action) => {
        return action.payload;
      }
    );
    builder.addMatcher(
      isAnyOf(
        getUsers.rejected,
        getUser.rejected,
        createUser.rejected,
        updateUser.rejected
      ),
      (state, action) => {
        state.loading = false;
        // state.message = action.payload.message;
      }
    );
  },
});

const { reducer } = userSlice;
export default reducer;
