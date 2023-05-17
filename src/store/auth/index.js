import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import AuthService from "services/AuthService";
import TokenService from "services/TokenService";

const initialState = {
  user: TokenService.getUserData(),
  loading: false,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await AuthService.login(email, password);
      TokenService.setUserData(res.data.user);
      TokenService.setTokens(res.data.tokens);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (data, { rejectWithValue }) => {
    try {
      // const res = await AuthService.logout({
      //   refreshToken: TokenService.getRefreshToken(),
      // });
      TokenService.removeUserData();
      return initialState;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(loginUser.pending, logoutUser.pending),
      (state, action) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      isAnyOf(loginUser.fulfilled, logoutUser.fulfilled),
      (state, action) => {
        return action.payload;
      }
    );
    builder.addMatcher(
      isAnyOf(loginUser.rejected, logoutUser.rejected),
      (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      }
    );
  },
});

const { reducer } = authSlice;
export default reducer;
